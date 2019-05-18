// function genProduct(id) {
//     let done = false;
//     let product;
//     let items = [];
//     // Get product
//     $.ajax({
//         method:'GET',
//         url:`http://10.3.50.56:3009/api/getProduct/${id}`
//     }).done((res) => {
//         product = res[0];

//          // Get all free items off that specific product
//         $.ajax({
//             method:'GET',
//             url:`http://10.3.50.56:3009/api/getFreeItems/${id}`
//         }).done((res) => {
//             items = res;
//             console.log(product.productnaam);
//             console.log(items);
//             done = true;
//         }).fail((err) => {
//             console.log(err);
//         });

//     }).fail((err) => {
//         console.log(err);
//     });
//     if (done) {
//         return `
//         <div class="gridP">
//             <img src="" class="productIMG">
//             <div class="productOmschrijving">
//                 <h2>${product.productnaam}</h2>
//                 <p>${product.beschrijving}</p>
//                 <form>
//                     <select class="select">
//                         <option value="1">Item 1</option>
//                         <option value="2">Item 2</option>
//                         <option value="1">Item 3</option>
//                         <option value="1">Item 4</option>
//                     </select>
//                     <button type="submit">add</button>
//                 </form>
//             </div>
//         </div>
//         `;
//     }
    
// }
function productImgCheck(id) {
        let urlimg = `../images/${id}.png`;
        let pathIMG
        $.ajax({
                url:urlimg,
                method: 'GET',
                async: false

        }).done(function (e) {
                //console.log("er is een img");
                pathIMG = id;

        }).fail(function (error) {
                //console.log("geen img");
                pathIMG=-1;
        });

        return pathIMG;
}

function genProduct(id, naam, beschrijving) {
        return `
        <div class="gridP">
            <img src="../images/${productImgCheck(id)}.png" class="productIMG">
            <div class="productOmschrijving">
                <h2>${naam}</h2>
                <p>${beschrijving}</p>
                <p><span id="count"></span> beschikbaar</p>
                <form>
                    <select id="selectItem" class="select">
                        <option value="0">None</option>
                    </select>
                    <button type="submit" class="addCart">add</button>
                </form>
            </div>
        </div>
        `;
}
    