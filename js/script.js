//Generar PDF. Libreria html2pdf
function print() {
  const invoiceTemplate = document.querySelector('#invoicePdf');
  const options = {
    filename: 'factura.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },
    height: invoiceTemplate.clientHeight,
    width: invoiceTemplate.clientWidth,
    useCORS: true,
  };
  html2pdf().set(options).from(invoiceTemplate).save();
}

//Contador precio
let subtotal = 0;

function addService() {
  //Obtenemos los valores del formulario
  const concept = document.getElementById('concept').value;
  const price = parseFloat(document.getElementById('price').value);
  const description = document.getElementById('description').value;

  //Validamos que los campos no están vacíos
  if (concept === '' || price === '' || description === '') {
    return;
  }

  //Sumamos el precio al subtotal
  subtotal += price;

  //Calculamos el IVA correspondiente al subtotal
  const subtotalIVA = subtotal * 0.21;

  //Calculamos el IRPF
  const subtotalIRPF = subtotal * 0.2;

  //Calculamos el total
  const total = subtotal * 1.21;

  //Clonamos el template HTML
  const invoiceTemplate = document.getElementById('invoiceItemTemplate');
  const newService = invoiceTemplate.content.cloneNode(true);

  //Establecemos los valores de los elementos dentro de la plantilla clonada
  const newConcept = newService.querySelector('#service');
  const newPrice = newService.querySelector('#servicePrice');
  const newDescription = newService.querySelector('#serviceDescription');

  newConcept.textContent = concept;
  newPrice.textContent = `${price
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} €`;
  newDescription.textContent = description;

  //Agregamos la plantilla clonada al html
  const servicesList = document.getElementById('servicesList');
  servicesList.appendChild(newService);

  //Actualizamos el subtotal de la factura
  const subtotalField = document.getElementById('subtotal');
  subtotalField.textContent = `${subtotal
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} €`;

  //Mostramos el valor del IVA de la factura
  const subtotalIvaField = document.getElementById('subtotalIVA');
  subtotalIvaField.textContent = `+ ${subtotalIVA
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} €`;

  //Mostramos el valor del IRPF de la factura
  const subtotalIrpfField = document.getElementById('subtotalIRPF');
  subtotalIrpfField.textContent = `Autorretención: ${subtotalIRPF
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} €`;

  //Mostramos el valor del total de la factura
  const totalField = document.getElementById('totalPrice');
  totalField.textContent = `${total
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} €`;

  //Limpiamos los campos del formulario
  const serviceForm = document.getElementById('form');
  for (const element of serviceForm.elements) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = '';
    }
  }
}
