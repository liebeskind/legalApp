import React, {Component} from 'react'

export function generatePDF(input = { agreement: '[AGREEMENT]', sigs: [ {} ] }) {
  // validation
  if(Array.isArray(input)) input = {sigs: input};
  input.agreement = input.agreement || '[AGREEMENT]';

  var defaults = {
    company: '[COMPANY]',
    holdings: '[HOLDINGS]',
    name: '[NAME]',
    title: '[TITLE]'
  };

  var verticalOffset = inch(1.5);
  var sigWidth = inch(2);
  var spacing = 50;
  var fontSize = 11;

  var copy;
  var data = input.sigs.map((item) => {
    copy = Object.assign({}, defaults);
    return Object.assign(copy, item); });

  var doc = new jsPDF({
    unit: 'pt', // allows for relative spacing based on text inputs
    format: [inch(8.5), inch(11)]
  }).setFont('times').setFontSize(fontSize.toString());

  var boilerplate = doc.splitTextToSize(`\tIN WITNESS WHEREOF, each of the parties hereto has caused a counterpart of this ${input.agreement} to be duly executed and delivered as of the date first above written.`, 504);

  doc.text(inch(0.5), inch(0.5), boilerplate);

  var currentSig;
  data.map((item, i) => {
    currentSig = doc.splitTextToSize(
`${item.company},
as ${item.holdings}

By:
Name:  ${item.name}
Title:    ${item.title}`, sigWidth);

    doc.text(inch(5), verticalOffset, currentSig);
    verticalOffset += ((currentSig.length*fontSize) + spacing);
  });


  // doc.addPage();

  /*
  [COMPANY A],
  as [Holdings]
  By:
  Name:  [NAME]
  Title:    [TITLE]
  */



  doc.save('a4.pdf');
}

function inch(x) {
  return x*72;
}
