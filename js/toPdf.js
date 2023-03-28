window.jsPDF = window.jspdf.jsPDF;

const docPDF = new jsPDF();

function print() {
  const invoiceTemplate = document.querySelector('#invoicePdf');

  docPDF.html(invoiceTemplate, {
    callback: function (docPDF) {
      docPDF.save('factura.pdf');
    },
    x: 15,
    y: 15,
    width: 170,
    windowWidth: 650,
  });
}

export default {
  docPDF,
  print,
};
