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

  var defaults = {
    company: '[COMPANY]',
    name: '[NAME]',
    title: '[TITLE]'
  };

  var verticalOffset;
  var sigWidth = inch(3);
  var spacing = 50;
  var fontSize = 11;
  var marginLeft = inch(1.0);
  var marginRight = inch(1.5);
  var marginTop = inch(1.0);
  var marginBottom = inch(1.0);
  var documentWidth = inch(8.5);
  var documentHeight = inch(11);

  var doc = new jsPDF({
    unit: 'pt', // allows for relative spacing based on text inputs
    format: [documentWidth, documentHeight]
  }).setFont('times').setFontSize(fontSize.toString());

  // var groupedSigs = groupSigs(input.sigs);

  Object.keys(input).forEach((key, docIndex, docArray) => {
    var docOutput = input[key];
  // })

    Object.keys(docOutput.groupedBySignatory).forEach((key, i, arr) => {
      if (specificSignatory && key != specificSignatory) return;
      var companies = docOutput.groupedBySignatory[key].companies;
      verticalOffset = marginTop;

      // add boilerplate to first page
      if(i === 0){
        var boilerplate = doc.splitTextToSize(`\t\tIN WITNESS WHEREOF, each of the parties hereto has caused a counterpart ${docOutput.agreementType ? `of this ${docOutput.agreementType} ` : ``}to be duly executed and delivered as of the date first above written.`, documentWidth-marginLeft-marginRight);
        doc.text(marginLeft, verticalOffset, boilerplate);
        verticalOffset = marginTop + inch(1.0); //Spacing between first paragraph and signature blocks
      }

      // add document title to bottom of each page
      var documentTitle = doc.splitTextToSize(`[Signature page to ${docOutput.footerTitle ? docOutput.footerTitle : "NAME OF DOCUMENT"}]`, inch(7));
      var xOffset = ((doc.internal.pageSize.width - doc.getStringUnitWidth(documentTitle.toString()) * doc.internal.getFontSize()) / 2);
      doc.text(documentTitle, xOffset, doc.internal.pageSize.height - marginBottom);

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

        doc.text(inch(4.5), verticalOffset, currentSig);
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

function inch(x) {
  return x*72;
}
