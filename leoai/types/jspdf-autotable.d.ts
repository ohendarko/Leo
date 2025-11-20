// types/jspdf-autotable.d.ts
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: {
      startY?: number;
      head?: any[][];
      body?: any[][];
      theme?: 'striped' | 'grid' | 'plain';
      headStyles?: Record<string, any>;
      bodyStyles?: Record<string, any>;
      alternateRowStyles?: Record<string, any>;
      margin?: { 
        left?: number; 
        right?: number; 
        top?: number; 
        bottom?: number; 
      };
    }) => jsPDF;
    
    lastAutoTable: {
      finalY: number;
    };
  }
}