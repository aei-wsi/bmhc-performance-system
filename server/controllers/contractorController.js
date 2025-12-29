import pool from '../config/database.js';

export const getAllContractors = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, u.email, u.first_name, u.last_name
      FROM contractors c
      JOIN users u ON c.user_id = u.id
      WHERE c.status != 'terminated'
      ORDER BY c.created_at DESC
    `);

    res.json({ contractors: result.rows });
  } catch (error) {
    console.error('Get contractors error:', error);
    res.status(500).json({ error: 'Failed to fetch contractors' });
  }
};

export const getContractorById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT c.*, u.email, u.first_name, u.last_name
      FROM contractors c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contractor not found' });
    }

    // Get contractor obligations
    const obligations = await pool.query(
      'SELECT * FROM obligations WHERE contractor_id = $1',
      [id]
    );

    res.json({
      contractor: result.rows[0],
      obligations: obligations.rows
    });
  } catch (error) {
    console.error('Get contractor error:', error);
    res.status(500).json({ error: 'Failed to fetch contractor' });
  }
};

export const createContractor = async (req, res) => {
  try {
    const { userId, role, startDate, contractType } = req.body;

    const result = await pool.query(`
      INSERT INTO contractors (user_id, role, start_date, contract_type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [userId, role, startDate, contractType]);

    res.status(201).json({
      message: 'Contractor created successfully',
      contractor: result.rows[0]
    });
  } catch (error) {
    console.error('Create contractor error:', error);
    res.status(500).json({ error: 'Failed to create contractor' });
  }
};

export const updateContractor = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, startDate, endDate, contractType, status } = req.body;

    const result = await pool.query(`
      UPDATE contractors
      SET role = COALESCE($1, role),
          start_date = COALESCE($2, start_date),
          end_date = $3,
          contract_type = COALESCE($4, contract_type),
          status = COALESCE($5, status)
      WHERE id = $6
      RETURNING *
    `, [role, startDate, endDate, contractType, status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contractor not found' });
    }

    res.json({
      message: 'Contractor updated successfully',
      contractor: result.rows[0]
    });
  } catch (error) {
    console.error('Update contractor error:', error);
    res.status(500).json({ error: 'Failed to update contractor' });
  }
};

export const deleteContractor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM contractors WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contractor not found' });
    }

    res.json({ message: 'Contractor deleted successfully' });
  } catch (error) {
    console.error('Delete contractor error:', error);
    res.status(500).json({ error: 'Failed to delete contractor' });
  }
};
