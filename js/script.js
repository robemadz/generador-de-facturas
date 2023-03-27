//Contador precio
let subtotal = 0;

function addService() {
  //Obtenemos los valores del formulario
  const concept = document.getElementById('concept').value;
  const price = parseFloat(document.getElementById('price').value);
  const description = document.getElementById('description').value;

  //Validar que los campos no están vacíos PENDIENTEE

  //Sumamos el precio al subtotal
  subtotal += price;

  //Calculamos el IVA correspondiente al subtotal
  const subtotalIVA = subtotal * 0.21;

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
  newPrice.textContent = `${price}€`;
  newDescription.textContent = description;

  //Agregamos la plantilla clonada al html
  const servicesList = document.getElementById('servicesList');
  servicesList.appendChild(newService);

  //Actualizamos el subtotal de la factura
  const subtotalField = document.getElementById('subtotal');
  subtotalField.textContent = `${subtotal}€`;

  //Mostramos el valor del IVA de la factura
  const subtotalIvaField = document.getElementById('subtotalIVA');
  subtotalIvaField.textContent = `+${subtotalIVA.toFixed(2)}€`;

  //Mostramos el valor del total de la factura
  const totalField = document.getElementById('totalPrice');
  totalField.textContent = `${total.toFixed(2)}€`;

  //Limpiamos los campos del formulario
  const serviceForm = document.getElementById('form');
  for (const element of serviceForm.elements) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = '';
    }
  }
}
