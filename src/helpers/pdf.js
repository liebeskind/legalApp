import React, {Component} from 'react'

export function generatePDF(data = {agreement: '[Agreement]'}) {
  var doc = new jsPDF({
    unit: 'in',
    format: [8.5, 11]
  }).setFont('times').setFontSize('11');

  var boilerplate = doc.splitTextToSize(`\tIN WITNESS WHEREOF, each of the parties hereto has caused a counterpart of this ${data.agreement} to be duly executed and delivered as of the date first above written.`, 7);

  doc.text(0.5, 0.5, boilerplate);
  doc.save('a4.pdf');
}
