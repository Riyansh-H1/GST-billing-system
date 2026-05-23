let historyTableBody = document.getElementById("historyTableBody");

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

if (invoices.length === 0) {

    historyTableBody.innerHTML = `
    <tr>
        <td colspan="5" class="text-center text-danger fw-bold">
            No Invoices Found
        </td>
    </tr>
    `;

} else {

    invoices.forEach(function (invoice) {

        let row = document.createElement("tr");

        row.innerHTML = `
        <td>${invoice.invoiceId}</td>
        <td>${invoice.customerName}</td>
        <td>${invoice.date}</td>
        <td>${invoice.grandTotal}</td>

        <td>
            <button class="btn btn-info btn-sm view-btn">
                View Details
            </button>
        </td>
        `;

        historyTableBody.appendChild(row);

        let viewBtn = row.querySelector(".view-btn");

        viewBtn.addEventListener("click", function () {

            let details = "";

            invoice.products.forEach(function (product) {

                details += `
Product Name: ${product.productName}
Price: ₹${product.price}
Quantity: ${product.quantity}
GST: ${product.gst}%

`;

            });

            alert(details);

        });

    });

}