import React, {Component} from 'react'
import jsPDF from 'jspdf'

export function generatePDF(loaded, specificSignatory) {
  var data = formatPDF(loaded);
  exportPDF(data, loaded, specificSignatory);
}

function formatPDFBySignatory(signatory, loaded) {

  var initial = loaded.sigs; // sigx: {}
  var formatted = [];
  var loggedComps = {};
  var name;

  var signatoryBundle = {};

  for (let doc in loaded.companiesPerDocument) {

    let documentData = loaded.companiesPerDocument[doc]
    for (let company in documentData) {
      let companyData = documentData[company]
      signatoryBundle[companyData.signatory] = signatoryBundle[companyData.signatory] || {};
      signatoryBundle[companyData.signatory][doc] = signatoryBundle[companyData.signatory][doc] || [];
      signatoryBundle[companyData.signatory][doc].push(company)
    }
  }
}

function formatPDF(loaded) {

  var output = {};

  for (let doc in loaded.documents){
    output[doc] = {};
    output[doc].footerTitle = loaded.documents[doc].footerTitle;
    output[doc].typeOfAgreement = loaded.documents[doc].agreementType;
    output[doc].groupedBySignatory = {};
    for (let company in loaded.companiesPerDocument[doc]) {
      let signatory = loaded.companiesPerDocument[doc][company].signatory

      var companyInfo = {};
      companyInfo.companyName = loaded.companies[company].name;
      companyInfo.asField = loaded.companiesPerDocument[doc][company].asField;

      if (!signatory) {
        output[doc].groupedBySignatory['unassigned'] = output[doc].groupedBySignatory['unassigned'] || {};
        output[doc].groupedBySignatory['unassigned'].companies = output[doc].groupedBySignatory['unassigned'].companies || {};
        output[doc].groupedBySignatory['unassigned'].companies[company] = companyInfo;
      } else {
        output[doc].groupedBySignatory[signatory] = output[doc].groupedBySignatory[signatory] || {};
        output[doc].groupedBySignatory[signatory].companies = output[doc].groupedBySignatory[signatory].companies || {};
        output[doc].groupedBySignatory[signatory].companies[company] = companyInfo;
        output[doc].groupedBySignatory[signatory].companies[company].signatoryTitle = loaded.officersOfCompany[company][signatory].title
        output[doc].groupedBySignatory[signatory].companies[company].signatoryName = loaded.sigs[signatory].name;
      }
    }
  }

  return output;
}

function exportPDF(input, loaded, specificSignatory) {
  // validation
  // if(Array.isArray(input)) input = {sigs: input};

  var defaults = {
    company: '[COMPANY]',
    name: '[NAME]',
    title: '[TITLE]'
  };

  var verticalOffset;
  var sigWidth = inch(3);
  var spacing = 50;
  var fontSize = 11;

  var doc = new jsPDF({
    unit: 'pt', // allows for relative spacing based on text inputs
    format: [inch(8.5), inch(11)]
  }).setFont('times').setFontSize(fontSize.toString());

  // var groupedSigs = groupSigs(input.sigs);

  Object.keys(input).forEach((key, docIndex, docArray) => {
    var docOutput = input[key];
  // })

    Object.keys(docOutput.groupedBySignatory).forEach((key, i, arr) => {
      if (specificSignatory && key != specificSignatory) return;
      var companies = docOutput.groupedBySignatory[key].companies;
      verticalOffset = inch(1.5);

      // add boilerplate to first page
      if(i === 0){
        var boilerplate = doc.splitTextToSize(`\tIN WITNESS WHEREOF, each of the parties hereto has caused a counterpart ${docOutput.agreementType ? `of this ${docOutput.agreementType} ` : ``}to be duly executed and delivered as of the date first above written.`, inch(7));
        doc.text(inch(0.5), inch(1), boilerplate);
      }

      // add document title to bottom of each page
      var documentTitle = doc.splitTextToSize(`[Signature page to ${docOutput.footerTitle ? docOutput.footerTitle : "NAME OF DOCUMENT"}]`, inch(7));
      var xOffset = ((doc.internal.pageSize.width - doc.getStringUnitWidth(documentTitle.toString()) * doc.internal.getFontSize()) / 2);
      doc.text(documentTitle, xOffset, doc.internal.pageSize.height - inch(1));

      // standardize grouped data
      var copy;
      var data = Object.keys(companies).map((value) => {
        var item = companies[value]
        copy = Object.assign({}, defaults);
        return Object.assign(copy, item);
      });

      // add grouped data to page
      var currentSig;
      data.map((item, i) => {
        // weird but necessary formatting
        currentSig = doc.splitTextToSize(
  `
  ${item.companyName}${item.asField ? `,
  as ${item.asField}
  ` : `
  `}

  By:_______________________________
  Name:  ${item.signatoryName ? item.signatoryName : "[NAME]"}
  Title:    ${item.signatoryTitle ? item.signatoryTitle : "[TITLE]"}`, sigWidth);

        doc.text(inch(5), verticalOffset, currentSig);
        verticalOffset += ((currentSig.length*fontSize) + spacing);
      });

      // Only adds a new page when there are more pages necessary
      // if(i*docIndex != arr.length)
        doc.addPage();
    });
  });

  var startingTitleOfPdf = 'SignaturePagesBundle.pdf';
  if (specificSignatory) startingTitleOfPdf = loaded.sigs[specificSignatory].name.replace(/\s/g,'')  + 'SignatureBundle.pdf'

  doc.save(startingTitleOfPdf);
}

//Rich's version
// function formatPDF(loaded) {
//   var initial = loaded.sigs; // sigx: {}
//   var formatted = [];
//   var loggedComps = {};
//   var name;

//   console.log(loaded.officersOfCompany)
//   // generate sig objects
//   for (let comp in loaded.officersOfCompany) { // compX {sigX: role}
//     loggedComps[comp] = true;

//     // link titles to sigs
//     for (let sig in loaded.officersOfCompany[comp]) {
//       initial[sig] = initial[sig] || {}
//       initial[sig].companies = initial[sig].companies || [];
//       name = loaded.companies[comp] ? loaded.companies[comp].name : undefined;
//       initial[sig].companies.push({name: name, title: loaded.officersOfCompany[comp][sig], key: comp});
//     }
//   }

//   // push sig objects
//   for (let sig in initial) {
//     name = initial[sig].name;
//     initial[sig].companies = initial[sig].companies || [];
//     if(initial[sig].companies.length){
//       initial[sig].companies.forEach((c) => formatted.push({name: name, company: c.name, title: c.title }));
//     } else {
//       formatted.push({name: name});
//     }
//   }

//   // push companies without sigs
//   for (let comp in loaded.companies) {
//     if(!loggedComps[comp]) formatted.push({company: loaded.companies[comp].name});
//   }

//   return formatted;
// }

//Rich's version
// function exportPDF(input = { agreement: '[AGREEMENT]', footerTitle: '[NAME OF DOCUMENT]', sigs: [ {} ] }) {
//   // validation
//   // if(Array.isArray(input)) input = {sigs: input};

//   var defaults = {
//     company: '[COMPANY]',
//     name: '[NAME]',
//     title: '[TITLE]'
//   };

//   var verticalOffset;
//   var sigWidth = inch(3);
//   var spacing = 50;
//   var fontSize = 11;
//   var sigs;

//   var doc = new jsPDF({
//     unit: 'pt', // allows for relative spacing based on text inputs
//     format: [inch(8.5), inch(11)]
//   }).setFont('times').setFontSize(fontSize.toString());

//   var groupedSigs = groupSigs(input.sigs);

//   Object.keys(groupedSigs).forEach((key, i, arr) => {
//     sigs = groupedSigs[key];
//     verticalOffset = inch(1.5);

//     // add boilerplate to first page
//     if(i === 0){
//       var boilerplate = doc.splitTextToSize(`\tIN WITNESS WHEREOF, each of the parties hereto has caused a counterpart ${input.agreement ? `of this ${input.agreement} ` : ``}to be duly executed and delivered as of the date first above written.`, inch(7));
//       doc.text(inch(0.5), inch(0.5), boilerplate);
//     }

//     // add document title to bottom of each page
//     var documentTitle = doc.splitTextToSize(`[Signature page to ${input.footerTitle}]`, inch(7));
//     var xOffset = ((doc.internal.pageSize.width - doc.getStringUnitWidth(documentTitle.toString()) * doc.internal.getFontSize()) / 2);
//     doc.text(documentTitle, xOffset, doc.internal.pageSize.height - 75);

//     // standardize grouped data
//     var copy;
//     var data = sigs.map((item) => {
//       copy = Object.assign({}, defaults);
//       return Object.assign(copy, item);
//     });

//     // add grouped data to page
//     var currentSig;
//     data.map((item, i) => {
//       // weird but necessary formatting
//       currentSig = doc.splitTextToSize(
// `${item.company}${item.holdings ? `,
// as ${item.holdings}
// ` : `
// `}
// By:
// Name:  ${item.name}
// Title:    ${item.title}`, sigWidth);

//       doc.text(inch(5), verticalOffset, currentSig);
//       verticalOffset += ((currentSig.length*fontSize) + spacing);
//     });

//     // add page if more signatories
//     if(i < arr.length - 1) doc.addPage();
//   });

//   doc.save('exampleSignaturePagesBundle.pdf');
// }

// function groupSigs(sigs = []) {
//   return sigs.reduce((acc, sig) => {
//     if(!sig.name){ sig.name = '[NAME]' }
//     acc[sig.name] = acc[sig.name] ||  []
//     acc[sig.name].push(sig);
//     return acc;
//   }, {});
// }

function inch(x) {
  return x*72;
}
