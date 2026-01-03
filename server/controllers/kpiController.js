import pool from '../config/database.js';

export const getKPIsByContractor = async (req, res) => {
  try {
    const { contractorId } = req.params;

    const result = await pool.query(`
      SELECT k.*, o.clause, o.category
      FROM kpis k
      JOIN obligations o ON k.obligation_id = o.id
      WHERE o.contractor_id = $1
      ORDER BY k.created_at DESC
    `, [contractorId]);

    res.json({ kpis: result.rows });
  } catch (error) {
    console.error('Get KPIs error:', error);
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
};

export const createKPI = async (req, res) => {
  try {
    const {
      obligationId,
      name,
      target,
      actual,
      evidence,
      measurementPeriodStart,
      measurementPeriodEnd
    } = req.body;

    // Calculate percentage and status
    const percentage = (actual / target) * 100;
    let status;
    if (percentage >= 100) status = 'exceeds';
    else if (percentage >= 80) status = 'meeting';
    else if (percentage >= 60) status = 'needs-improvement';
    else status = 'non-compliant';

    const result = await pool.query(`
      INSERT INTO kpis (
        obligation_id, name, target, actual, percentage, status,
        evidence, trend, measurement_period_start, measurement_period_end
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
      obligationId, name, target, actual, percentage, status,
      evidence, 'stable', measurementPeriodStart, measurementPeriodEnd
    ]);

    res.status(201).json({
      message: 'KPI created successfully',
      kpi: result.rows[0]
    });
  } catch (error) {
    console.error('Create KPI error:', error);
    res.status(500).json({ error: 'Failed to create KPI' });
  }
};

export const updateKPI = async (req, res) => {
  try {
    const { id } = req.params;
    const { actual, evidence, trend } = req.body;

    // Get current KPI to calculate percentage
    const current = await pool.query('SELECT target FROM kpis WHERE id = $1', [id]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'KPI not found' });
    }

    const target = current.rows[0].target;
    const percentage = (actual / target) * 100;
    let status;
    if (percentage >= 100) status = 'exceeds';
    else if (percentage >= 80) status = 'meeting';
    else if (percentage >= 60) status = 'needs-improvement';
    else status = 'non-compliant';

    const result = await pool.query(`
      UPDATE kpis
      SET actual = $1,
          percentage = $2,
          status = $3,
          evidence = COALESCE($4, evidence),
          trend = COALESCE($5, trend)
      WHERE id = $6
      RETURNING *
    `, [actual, percentage, status, evidence, trend, id]);

    res.json({
      message: 'KPI updated successfully',
      kpi: result.rows[0]
    });
  } catch (error) {
    console.error('Update KPI error:', error);
    res.status(500).json({ error: 'Failed to update KPI' });
  }
};

export const deleteKPI = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM kpis WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'KPI not found' });
    }

    res.json({ message: 'KPI deleted successfully' });
  } catch (error) {
    console.error('Delete KPI error:', error);
    res.status(500).json({ error: 'Failed to delete KPI' });
  }
};
