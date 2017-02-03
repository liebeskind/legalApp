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

  var verticalOffset;
  var sigWidth = inch(3);
  var spacing = 50;
  var fontSize = 11;
  var sigs;

  var doc = new jsPDF({
    unit: 'pt', // allows for relative spacing based on text inputs
    format: [inch(8.5), inch(11)]
  }).setFont('times').setFontSize(fontSize.toString());

  var groupedSigs = groupSigs(input.sigs);

  Object.keys(groupedSigs).forEach((key, i, arr) => {
    sigs = groupedSigs[key];
    verticalOffset = inch(1.5);

    // add boilerplate to first page
    if(i === 0){
      var boilerplate = doc.splitTextToSize(`\tIN WITNESS WHEREOF, each of the parties hereto has caused a counterpart of this ${input.agreement} to be duly executed and delivered as of the date first above written.`, 504);
      doc.text(inch(0.5), inch(0.5), boilerplate);
    }

    // standardize grouped data
    var copy;
    var data = sigs.map((item) => {
      copy = Object.assign({}, defaults);
      return Object.assign(copy, item);
    });

    // add grouped data to page
    var currentSig;
    data.map((item, i) => {
      // weird but necessary formatting
      currentSig = doc.splitTextToSize(
`${item.company},
as ${item.holdings}

By:
Name:  ${item.name}
Title:    ${item.title}`, sigWidth);

      doc.text(inch(5), verticalOffset, currentSig);
      verticalOffset += ((currentSig.length*fontSize) + spacing);
    });

    // add page if more signatories
    if(i < arr.length - 1) doc.addPage();
  });

  doc.save('a4.pdf');
}

function groupSigs(sigs = []) {
  return sigs.reduce((acc, sig) => {
    if(!sig.name){ sig.name = '[NAME]' }
    acc[sig.name] = acc[sig.name] ||  []
    acc[sig.name].push(sig);
    return acc;
  }, {});
}

function inch(x) {
  return x*72;
}
