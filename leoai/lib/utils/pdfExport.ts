// lib/utils/pdfExport.ts
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { VerdictResponse } from '@/types/audit';

export function generateVerdictPDF(verdict: VerdictResponse, startupName: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper to add new page if needed
  const checkNewPage = (spaceNeeded: number = 20) => {
    if (yPosition + spaceNeeded > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  // Header
  doc.setFillColor(26, 26, 26);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(218, 165, 32); // Gold
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('🦁 Leo Validation Report', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 200);
  doc.text(startupName, pageWidth / 2, 30, { align: 'center' });

  yPosition = 50;

  // Survival Score Box
  doc.setFillColor(40, 40, 40);
  doc.roundedRect(15, yPosition, pageWidth - 30, 40, 3, 3, 'F');
  
  const scoreColor: [number, number, number] = verdict.survivalScore >= 75 ? [34, 197, 94] : 
                     verdict.survivalScore >= 50 ? [234, 179, 8] : [239, 68, 68];
  
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text(`${verdict.survivalScore}%`, pageWidth / 2, yPosition + 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 200);
  doc.text('Survival Probability', pageWidth / 2, yPosition + 32, { align: 'center' });

  yPosition += 50;

  // Confidence Badge
  doc.setFontSize(10);
  const confidenceColor: [number, number, number] = verdict.confidence === 'high' ? [34, 197, 94] :
                          verdict.confidence === 'medium' ? [234, 179, 8] : [239, 68, 68];
  doc.setTextColor(confidenceColor[0], confidenceColor[1], confidenceColor[2]);
  doc.text(`${verdict.confidence.toUpperCase()} CONFIDENCE`, pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;

  // Framework Breakdown Table
  checkNewPage(60);
  doc.setTextColor(218, 165, 32);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Framework Breakdown', 15, yPosition);
  yPosition += 5;

  doc.autoTable({
    startY: yPosition,
    head: [['Framework', 'Score']],
    body: [
      ['NASSS Risk Assessment', `${verdict.breakdown.nasss_risk}/100`],
      ['Strategic Viability', `${verdict.breakdown.strategic_viability}/100`],
      ['Business Model', `${verdict.breakdown.business_model}/100`],
      ['Regulatory Readiness', `${verdict.breakdown.regulatory_readiness}/100`],
    ],
    theme: 'grid',
    headStyles: { fillColor: [218, 165, 32], textColor: [0, 0, 0], fontStyle: 'bold' },
    bodyStyles: { fillColor: [40, 40, 40], textColor: [200, 200, 200] },
    alternateRowStyles: { fillColor: [50, 50, 50] },
    margin: { left: 15, right: 15 },
  });

  yPosition = doc.lastAutoTable.finalY + 15;

  // Critical Risks
  checkNewPage();
  doc.setTextColor(239, 68, 68);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('🔴 Critical Risks', 15, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  
  verdict.criticalRisks.forEach((risk, idx) => {
    checkNewPage(15);
    const lines = doc.splitTextToSize(`${idx + 1}. ${risk}`, pageWidth - 35);
    doc.text(lines, 20, yPosition);
    yPosition += lines.length * 5 + 5;
  });

  yPosition += 5;

  // Key Strengths
  checkNewPage();
  doc.setTextColor(34, 197, 94);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('🟢 Key Strengths', 15, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  
  verdict.keyStrengths.forEach((strength, idx) => {
    checkNewPage(15);
    const lines = doc.splitTextToSize(`${idx + 1}. ${strength}`, pageWidth - 35);
    doc.text(lines, 20, yPosition);
    yPosition += lines.length * 5 + 5;
  });

  yPosition += 5;

  // Actionable Recommendations
  checkNewPage();
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('💡 Actionable Recommendations', 15, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  
  verdict.actionableRecommendations.forEach((rec, idx) => {
    checkNewPage(15);
    const lines = doc.splitTextToSize(`${idx + 1}. ${rec}`, pageWidth - 35);
    doc.text(lines, 20, yPosition);
    yPosition += lines.length * 5 + 5;
  });

  // Full Report (simplified markdown rendering)
  doc.addPage();
  yPosition = 20;
  
  doc.setTextColor(218, 165, 32);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Full Assessment Report', 15, yPosition);
  yPosition += 10;

  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');

  // Simple markdown to text conversion
  const reportText = verdict.reportMarkdown
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*/g, '')      // Remove bold
    .replace(/\*/g, '')        // Remove italic
    .replace(/\n{3,}/g, '\n\n'); // Normalize line breaks

  const reportLines = doc.splitTextToSize(reportText, pageWidth - 30);
  
  reportLines.forEach((line: string) => {
    if (checkNewPage(6)) {
      // Page was added
    }
    doc.text(line, 15, yPosition);
    yPosition += 5;
  });

  // Footer on last page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generated by Leo HealthTech Validator | Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save
  doc.save(`leo-validation-${startupName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}