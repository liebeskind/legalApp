import React, {Component} from 'react'

export function generatePDF(loaded) {
  var data = formatPDF(loaded);
  exportPDF(data);
}

function formatPDF(loaded) {
  var initial = loaded.sigs; // sigx: {}
  var formatted = [];
  var loggedComps = {};
  var name;

  // generate sig objects
  for (let comp in loaded.officers) { // compX {sigX: role}
    loggedComps[comp] = true;
    // link titles to sigs
    for (let sig in loaded.officers[comp]) {
      initial[sig] = initial[sig] || {}
      initial[sig].companies = initial[sig].companies || [];
      name = loaded.companies[comp] ? loaded.companies[comp].name : undefined;
      initial[sig].companies.push({name: name, title: loaded.officers[comp][sig], key: comp});
    }
  }

  // push sig objects
  for (let sig in initial) {
    name = initial[sig].name;
    initial[sig].companies = initial[sig].companies || [];
    if(initial[sig].companies.length){
      initial[sig].companies.forEach((c) => formatted.push({name: name, company: c.name, title: c.title }));
    } else {
      formatted.push({name: name});
    }
  }

  // push companies without sigs
  for (let comp in loaded.companies) {
    if(!loggedComps[comp]) formatted.push({company: loaded.companies[comp].name});
  }

  return formatted;
}

function exportPDF(input = { agreement: '[AGREEMENT]', sigs: [ {} ] }) {
  // validation
  if(Array.isArray(input)) input = {sigs: input};

  var defaults = {
    company: '[COMPANY]',
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
      var boilerplate = doc.splitTextToSize(`\tIN WITNESS WHEREOF, each of the parties hereto has caused a counterpart ${input.agreement ? `of this ${input.agreement} ` : ``}to be duly executed and delivered as of the date first above written.`, inch(7));
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
`${item.company}${item.holdings ? `,
as ${item.holdings}
` : `
`}
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
