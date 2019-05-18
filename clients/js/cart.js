$(document).ready(() => {
  let bestelregels = [];
  bestelregels = JSON.parse(sessionStorage.getItem('cart'));
  console.log('begin');
  console.log(JSON.parse(sessionStorage.getItem('cart')));
  
  let totaalPrijs = 0;
  let totaalWaarborg = 0;
  console.log(bestelregels);
  if (bestelregels != null) {
    for (const regel of bestelregels) {
      totaalPrijs += Number(regel.prijs);
      totaalWaarborg += Number(regel.waarborg);
      $('#bestelregelsBody').append(`
      <tr>
      <td>${regel.productnaam}</td>
      <td>${regel.prijs}</td>
      <td>${regel.waarborg}</td>
      <td><i id="${regel.item_id}" class="fas fa-times cross-cart"></i><td/>
      </tr>
      `)
    }
    // som van alles tonen
    $('#totaalPrijs').html(totaalPrijs);
    $('#totaalWaarborg').html(totaalWaarborg);
  }

  // Als er op kruisjes word gedrukt
  $(document).on('click', '.cross-cart', (e) => {
    let removeId = e.target.id;
    bestelregels.forEach((item, i) => {
      if (item.item_id == removeId) {
        console.log(i);
        bestelregels.splice(i, 1);
      }
    });

    // Update sessionStorage
    console.log('session opnieuw geset');
    sessionStorage.setItem('cart',JSON.stringify(bestelregels));
      
    // Eerste regels leeg maken
    bestelregels = JSON.parse(sessionStorage.getItem('cart'));
    console.log(bestelregels);
    
    $('#bestelregelsBody').html('');
    totaalPrijs=0;
    totaalWaarborg=0;
    for (const regel of bestelregels) {
      totaalPrijs += Number(regel.prijs);
      totaalWaarborg += Number(regel.waarborg);
      $('#bestelregelsBody').append(`
      <tr>
      <td>${regel.productnaam}</td>
      <td>${regel.prijs}</td>
      <td>${regel.waarborg}</td>
      <td><i id="${regel.item_id}" class="fas fa-times cross-cart"></i><td/>
      </tr>
      `)
    }
    // som van alles tonen
    $('#totaalPrijs').html(totaalPrijs);
    $('#totaalWaarborg').html(totaalWaarborg);
  })
});