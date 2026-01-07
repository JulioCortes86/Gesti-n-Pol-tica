import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToExcel = (voters, leader) => {
  const wsData = [
    ["Nombre del Líder", leader.name || "N/A"],
    ["Cédula del Líder", leader.id || "N/A"],
    ["Cargo del Líder", leader.role || "N/A"],
    [],
    ["#", "Nombre Completo", "Cédula", "Punto de Votación", "Mesa de Votación", "Fecha de Nacimiento", "Dirección", "Municipio", "Email", "Celular"]
  ];

  voters.forEach((v, index) => {
    wsData.push([
      index + 1,
      v.name,
      v.id,
      v.votingPoint,
      v.votingTable,
      v.birthDate,
      v.address,
      v.city,
      v.email,
      v.phone
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Set column widths
  const wscols = [
    { wch: 5 },  // #
    { wch: 25 }, // Nombre
    { wch: 15 }, // Cedula
    { wch: 20 }, // Punto
    { wch: 10 }, // Mesa
    { wch: 15 }, // Fecha
    { wch: 25 }, // Direccion
    { wch: 15 }, // Municipio
    { wch: 25 }, // Email
    { wch: 15 }  // Phone
  ];
  ws['!cols'] = wscols;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Votantes");
  XLSX.writeFile(wb, `Reporte_Votantes_${leader.name || 'Politico'}.xlsx`);
};

export const exportToPDF = (voters, leader) => {
  const doc = new jsPDF();

  // Header
  // Add Image if exists
  if (leader.photo) {
    try {
      doc.addImage(leader.photo, 'JPEG', 14, 15, 20, 20); // x, y, w, h
    } catch (e) {
      console.error("Error adding image to PDF:", e);
    }
  }

  // Adjust text position based on image presence
  const textX = leader.photo ? 40 : 14;

  doc.setFontSize(18);
  doc.setTextColor(26, 79, 189); // #1a4fbd (Royal Blue)
  doc.text("Gestión Política - Reporte de Votantes", textX, 25);

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Líder: ${leader.name || 'N/A'}`, textX, 35);
  doc.text(`Cédula: ${leader.id || 'N/A'}`, textX, 42);
  doc.text(`Cargo: ${leader.role || 'N/A'}`, textX, 49);

  // Table
  const tableColumn = ["#", "Nombre", "Cédula", "Punto", "Mesa", "Celular"];
  const tableRows = voters.map((v, index) => [
    index + 1,
    v.name,
    v.id,
    v.votingPoint,
    v.votingTable,
    v.phone
  ]);

  autoTable(doc, {
    startY: 55,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [26, 79, 189] }
  });

  doc.save(`Reporte_Votantes_${leader.name || 'Politico'}.pdf`);
};
