import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { join } from 'path';

export async function generatePerformanceReviewPDF(reviewData, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = createWriteStream(outputPath);

      doc.pipe(stream);

      // Header
      doc.fontSize(24).font('Helvetica-Bold')
        .text('BLACK MEN\'S HEALTH CLINIC', { align: 'center' });

      doc.fontSize(12).font('Helvetica')
        .fillColor('#D4AF37')
        .text('Performance Review Report', { align: 'center' });

      doc.moveDown(2);

      // Review metadata
      doc.fontSize(10).fillColor('black').font('Helvetica-Bold');
      doc.text(`Employee: ${reviewData.contractorName}`);
      doc.text(`Role: ${reviewData.role}`);
      doc.text(`Review Period: ${reviewData.periodStart} - ${reviewData.periodEnd}`);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`);

      doc.moveDown();
      doc.strokeColor('#D4AF37').lineWidth(2)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();
      doc.moveDown();

      // KPI Sections
      if (reviewData.kpis && reviewData.kpis.length > 0) {
        reviewData.kpis.forEach((kpi, index) => {
          if (index > 0) doc.moveDown();

          // KPI Name
          doc.fontSize(14).font('Helvetica-Bold')
            .fillColor('black')
            .text(kpi.name);

          // Status
          const statusColor = getStatusColor(kpi.status);
          doc.fontSize(11).font('Helvetica')
            .fillColor(statusColor)
            .text(`Status: ${getStatusLabel(kpi.status)}`);

          // Metrics
          doc.fontSize(10).fillColor('black');
          doc.text(`Target: ${kpi.target}`);
          doc.text(`Actual: ${kpi.actual} (${kpi.percentage}%)`);

          // Evidence
          if (kpi.evidence) {
            doc.moveDown(0.5);
            doc.font('Helvetica-Bold').text('Evidence:');
            doc.font('Helvetica').text(kpi.evidence, { width: 500 });
          }

          // Assessment
          if (kpi.assessment) {
            doc.moveDown(0.5);
            doc.font('Helvetica-Bold').text('Assessment:');
            doc.font('Helvetica').text(kpi.assessment, { width: 500 });
          }

          doc.moveDown();
          doc.strokeColor('#e0e0e0').lineWidth(1)
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .stroke();
          doc.moveDown(0.5);
        });
      }

      // Supervisor Notes
      if (reviewData.supervisorNotes) {
        doc.moveDown(2);
        doc.fontSize(14).font('Helvetica-Bold')
          .fillColor('black')
          .text('Supervisor Notes');

        doc.fontSize(10).font('Helvetica-Oblique')
          .fillColor('#333')
          .text(reviewData.supervisorNotes, {
            width: 500,
            align: 'justify'
          });
      }

      // Footer
      doc.moveDown(3);
      doc.fontSize(8).font('Helvetica')
        .fillColor('#666')
        .text('BMHC - Care You Can Trust', { align: 'center' });

      doc.end();

      stream.on('finish', () => {
        resolve(outputPath);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

function getStatusColor(status) {
  switch (status) {
    case 'exceeds': return '#D4AF37';
    case 'meeting': return '#000000';
    case 'needs-improvement': return '#f39c12';
    case 'non-compliant': return '#d63031';
    default: return '#666666';
  }
}

function getStatusLabel(status) {
  switch (status) {
    case 'exceeds': return 'Exceeds Expectations';
    case 'meeting': return 'Meeting Expectations';
    case 'needs-improvement': return 'Needs Improvement';
    case 'non-compliant': return 'Non-Compliant';
    default: return 'Unknown';
  }
}
