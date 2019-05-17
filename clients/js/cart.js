$(document).ready(() => {
  let bestelregels = JSON.parse(sessionStorage.getItem('cart'));
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
    console.log(e.target.id);
  })
});