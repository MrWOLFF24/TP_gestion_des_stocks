/** @namespace */
const app = (function () {
    "use strict";

    /**
     * variable global stocks with empty array for products
     * @alias app.stock
     * @type {Array}
     */
    let stock = [];
    /**
     * variable global for products
     * @alias app.productName
     * @alias app.productPrice
     * @alias app.productColor
     * @alias app.productDiscription
     * @alias app.addProd
     * @alias app.send
     * @alias app.tblList
     * @type {element}
     */
    let productName, productPrice, productColor, productDiscription, addProd, send, tblList;

    /**
     * Constructor for products
     * @alias app.Products
     * @param prod
     * @constructor
     */
    const Product = function (prod) {
       this.reference = prod.reference;
        this.name =  prod.name;
       this.price = prod.price;
       this.discription = prod.discription;
       this.color = prod.color;
    };

    /**
     * function for count items in array stock
     * @alias app.count
     * @param {number} c
     */
    const count = function (c) {
        let cnt = document.getElementById("count");
        let name = "produit";
        if (c) {
            if (c > 1) {
                name = "produits";
            }
            cnt.innerHTML = "Vous avez " + c + ' ' + name + " en stock";
        }else {
            cnt.innerHTML = "Vous n'avez pas de " + name + " en stock";
        }
    };

    /**
     * function to get data from array stock
     * @alias app.getData
     * @return {string}
     */
    const getData = function () {
        let i, data = "";
        for (i = 0; i < stock.length; i++){
                data += `<tr>
                    <td>BZ - 00${stock[i].reference}</td>
                    <td>${stock[i].name}</td>
                    <td>${stock[i].price} €</td>
                    <td>${stock[i].color}</td>
                    <td>${stock[i].discription}</td>
                    <td><button class="modf" onclick="app.edtProduct(${i})">Modifier</button></td>
                    <td><button class="dlet" onclick="app.dltProduct(${i})">Supprimer</button></td>
                </tr>`;
        }
        // count stock length
        count(stock.length);
        return tblList.innerHTML = data;
    };

    /**
     * function for generate & add a new product in stock
     * @alias app.addProduct
     */
    const addProduct = function () {
        let c = 0, submit = document.getElementById("add_product");
        submit.addEventListener("submit", function () {
           let p = new Product({
               reference : c += 1,
               name : productName.value,
               price : productPrice.value,
               color : productColor.value,
               discription : productDiscription.value
           });
        // push data in array stock
            stock.push(p);
        // empty all inputs
        productName.value = "";
        productColor.value = "";
        productPrice.value = "";
        productDiscription.value = "";
        // add focus on input name
        productName.focus();
        // display data in html page
        getData();
        });
    };

    /**
     * function for delete an object in stock and display data
     * @alias app.deleteProduct
     * @param {array} item
     */
    const deleteProduct = function (item) {
        stock.splice(item, 1);
        getData();
    };

    /**
     * function for edit an object in stock and display data
     * @alias app.editProduct
     * @param {array} item
     */
    const editProduct = function (item) {
        // get inputs
        let nameEdit = document.getElementById("edit_name");
        let priceEdit = document.getElementById("edit_price");
        let colorEdit = document.getElementById("edit_color");
        let discriptionEdit = document.getElementById("edit_discription");
        // put stock items value in input
        nameEdit.value = stock[item].name;
        priceEdit.value = stock[item].price;
        colorEdit.value = stock[item].color;
        discriptionEdit.value = stock[item].discription;
        // display editModal
        document.querySelector(".edit_products").style.display = "block";
        let edit = document.getElementById("edit_product");
        edit.addEventListener("submit", function () {
            let pEdit = {
                name : nameEdit.value,
                price : priceEdit.value,
                color : colorEdit.value,
                discription:discriptionEdit.value
            };
            console.log(pEdit);
            // add new values
            stock.splice(item, 1, pEdit);
            // display table
            getData();
            closeModal();
        });
    };

    /**
     * function for close modal when form was submit
     * @alias app.closeModal
     */
    const closeModal = function () {
       document.querySelector(".edit_products").style.display = "none";
    };
    /**
     * function for display form when a element was clicked
     * @alias app.display
     */
    const display = function () {
        let elem = document.getElementById("show_prod");
        let modal = document.querySelector(".modal-content");
        let cross = document.querySelector(".cross");
        let editCross = document.querySelector(".edit-cross");
        let editModal = document.querySelector(".edit_products");
        elem.addEventListener("click", function () {
            modal.style.display = "block";
        });
        cross.addEventListener("click", function () {
            modal.style.display = "none";
        });
        editCross.addEventListener("click", function () {
            editModal.style.display = "none";
        });
    };

    window.onload = function init() {
        // DOM elements selection
        productName = document.getElementById("product_name");
        productPrice = document.getElementById("product_price");
        productColor = document.getElementById("product_color");
        productDiscription = document.getElementById("product_discription");
        addProd = document.getElementById("add_product");
        send = document.getElementById("send");
        tblList = document.getElementById("Product_list");
        // end DOM elements selection
        getData();
        addProduct();
        //editProduct();
        display();
    };

    return {
        dltProduct : deleteProduct,
        edtProduct : editProduct
    }

}());