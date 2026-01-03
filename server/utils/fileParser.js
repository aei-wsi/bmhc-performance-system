import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { readFileSync } from 'fs';

export async function parsePDF(filePath) {
  try {
    const dataBuffer = readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return {
      text: data.text,
      pages: data.numpages,
      info: data.info
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file');
  }
}

export async function parseDOCX(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return {
      text: result.value,
      messages: result.messages
    };
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Failed to parse DOCX file');
  }
}

export async function parseContractDocument(filePath, fileType) {
  if (fileType === 'application/pdf' || filePath.endsWith('.pdf')) {
    return await parsePDF(filePath);
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || filePath.endsWith('.docx')) {
    return await parseDOCX(filePath);
  } else if (filePath.endsWith('.txt')) {
    const text = readFileSync(filePath, 'utf8');
    return { text };
  } else {
    throw new Error('Unsupported file type');
  }
}

// Extract obligations from contract text using simple pattern matching
export function extractObligations(text) {
  const obligations = [];
  const lines = text.split('\n');

  // Look for patterns like:
  // - "shall", "must", "will", "responsible for"
  // - Bullet points or numbered lists
  const obligationKeywords = ['shall', 'must', 'will', 'responsible for', 'required to'];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.length < 20 || line.length > 300) continue;

    const lowerLine = line.toLowerCase();
    const hasKeyword = obligationKeywords.some(keyword => lowerLine.includes(keyword));

    if (hasKeyword) {
      obligations.push({
        clause: line,
        frequency: determineFrequency(lowerLine),
        category: determineCategory(lowerLine)
      });
    }
  }

  return obligations;
}

function determineFrequency(text) {
  if (text.includes('weekly') || text.includes('week')) return 'Weekly';
  if (text.includes('monthly') || text.includes('month')) return 'Monthly';
  if (text.includes('quarterly') || text.includes('quarter')) return 'Quarterly';
  if (text.includes('annually') || text.includes('annual') || text.includes('year')) return 'Annually';
  if (text.includes('daily') || text.includes('day')) return 'Daily';
  return 'Ongoing';
}

function determineCategory(text) {
  if (text.includes('report') || text.includes('documentation') || text.includes('document')) return 'Documentation';
  if (text.includes('client') || text.includes('customer') || text.includes('engagement')) return 'Client Engagement';
  if (text.includes('quality') || text.includes('standard') || text.includes('performance')) return 'Quality';
  if (text.includes('safety') || text.includes('compliance') || text.includes('regulation')) return 'Compliance';
  if (text.includes('training') || text.includes('development') || text.includes('education')) return 'Training';
  return 'General';
}
