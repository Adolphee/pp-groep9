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

function genProduct(id, naam, beschrijving, prijs, waarborg) {
        return `
        <br>
        <button id="back" class="btn second">Back</button>
        <div class="gridP">
            <img src="../images/${productImgCheck(id)}.png" class="productIMG">
            <div class="productOmschrijving">
                <h2>${naam}</h2>
                <p>${beschrijving}</p>
                <p>Prijs: ${prijs}</p>
                <p>Waarborg: ${waarborg}</p>
                <p><span id="count"></span> beschikbaar</p>
                <form>
                    <select id="selectItem" class="select">
                        <option value="0">None</option>
                    </select>
                    <button id="cartBtn" type="submit" class="addCart btn primary">Voeg toe aan winkelmandje</button>
                </form>
            </div>
        </div>
        `;
}
    