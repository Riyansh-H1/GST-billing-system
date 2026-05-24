let button = document.getElementById("addProductBtn")
let tableBody = document.getElementById("productTableBody")
let subtotalElement = document.getElementById("subtotal");
let cgstElement = document.getElementById("cgst");
let sgstElement = document.getElementById("sgst");
let grandTotalElement = document.getElementById("grandtotal");
let saveInvoiceBtn = document.getElementById("saveInvoiceBtn");

button.addEventListener("click", function () {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td><input class="productname form-control" type="text" placeholder="Enter Product Name" required></td>
    <td><input class="price form-control" type="number" placeholder="Enter Price" min="0"></td>
    <td><input class="quantity form-control" type="number" placeholder="Qty" min="1"></td>
    <td><input class="gst form-control" type="number" placeholder="GST %" min="0" max="100"></td>
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
        window.finalSubtotal = subtotal;
        window.finalCGST = cgst;
        window.finalSGST = sgst;
        window.finalGrandTotal = grandTotal;

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

    removeBtn.addEventListener("click", function () {

        row.remove()
        calculateSummary()
    })

    console.log("Button clicked");

})

saveInvoiceBtn.addEventListener("click", function () {

    let customerNameInput = document.getElementById("customerName")
    let phoneNumberInput = document.getElementById("phoneNumber")
    let addressInput = document.getElementById("address")

    let customerName = customerNameInput.value
    let phoneNumber = phoneNumberInput.value
    let address = addressInput.value

    let rows = tableBody.querySelectorAll("tr")

    let products = [];

    rows.forEach(function (row) {

        let productname = row.querySelector(".productname").value;
        let price = row.querySelector(".price").value;
        let quantity = row.querySelector(".quantity").value;
        let gst = row.querySelector(".gst").value;

        products.push({
            productName: productname,
            price: price,
            quantity: quantity,
            gst: gst
        });

    });

    if (customerName === "" || rows.length === 0) {
        alert("Please add invoice details");
        return;
    }

    let invoice = {
        invoiceId: "INV-" + Date.now(),
        customerName: customerName,
        phoneNumber: phoneNumber,
        address: address,
        products: products,
        subtotal: finalSubtotal,
        cgst: finalCGST,
        sgst: finalSGST,
        grandTotal: finalGrandTotal,
        date: new Date().toLocaleString()
    }



    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    invoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(invoices));

    alert("Invoice Saved Successfully");
    window.location.href = "history.html";

})
 button.click();