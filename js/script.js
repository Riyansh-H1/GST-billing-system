let button = document.getElementById("addProductBtn")
let tableBody = document.getElementById("productTableBody")
let subtotalElement = document.getElementById("subtotal");
let cgstElement = document.getElementById("cgst");
let sgstElement = document.getElementById("sgst");
let grandTotalElement = document.getElementById("grandtotal");

button.addEventListener("click", function () {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td><input class="productname form-control" type="text"></td>
    <td><input class="price form-control" type="number"></td>
    <td><input class="quantity form-control" type="number"></td>
    <td><input class="gst form-control" type="number"></td>
    <td class="total">₹0</td>
    <td><button class="remove-btn btn btn-danger">Remove</button></td>
    `
    
    let productInput = row.querySelector(".productname")
    let priceInput = row.querySelector(".price")
    let quantityInput = row.querySelector(".quantity")
    let gstInput = row.querySelector(".gst")
    let totalCell = row.querySelector(".total")

    tableBody.appendChild(row)
    calculateSummary();


    function calculateTotal() {

        let price = parseFloat(priceInput.value) || 0;
        let quantity = parseFloat(quantityInput.value) || 0;
        let gst = parseFloat(gstInput.value) || 0;

        let baseAmount = (price * quantity);
        let gstAmount = ((price * quantity) * gst / 100);
        let finalTotal = baseAmount + gstAmount;
        totalCell.innerText = "₹" + finalTotal;
    }

    function calculateSummary() {

        let rows = tableBody.querySelectorAll("tr");
        let subtotal = 0;
        let totalGST = 0;
        let grandTotal = 0;

        rows.forEach(function (row) {

            let priceInput = row.querySelector(".price");
            let quantityInput = row.querySelector(".quantity")
            let gstInput = row.querySelector(".gst")

            let price = parseFloat(priceInput.value) || 0;
            let quantity = parseFloat(quantityInput.value) || 0;
            let gst = parseFloat(gstInput.value) || 0;

            let baseAmount = (price * quantity);
            let gstAmount = ((price * quantity) * gst / 100);
            let finalTotal = baseAmount + gstAmount;

            subtotal += baseAmount;
            totalGST += gstAmount;
            grandTotal += finalTotal;

            console.log(finalTotal);

            console.log(row);
        })

        let cgst = totalGST / 2;
        let sgst = totalGST / 2;

        subtotalElement.innerText = "Subtotal: ₹" + subtotal;
        cgstElement.innerText = "CGST: ₹" + cgst;
        sgstElement.innerText = "SGST: ₹" + sgst;
        grandTotalElement.innerText = "Grand Total: ₹" + grandTotal;
    }

    priceInput.addEventListener("input", function () {
        calculateTotal()
        calculateSummary()
    })

    quantityInput.addEventListener("input", function () {
        calculateTotal()
        calculateSummary()
    })

    gstInput.addEventListener("input", function () {
        calculateTotal()
        calculateSummary()
    })

    let removeBtn = row.querySelector(".remove-btn")

    removeBtn.addEventListener("click", function() {

        row.remove()
        calculateSummary()
    })

    console.log("Button clicked");

})


