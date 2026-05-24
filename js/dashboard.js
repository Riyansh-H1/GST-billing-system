document.addEventListener("DOMContentLoaded", function () {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser === null) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("welcomeText").innerText =
        "Welcome back, " + currentUser.username;

    document.getElementById("userEmail").innerText = currentUser.email;

    showDashboardData();
    showRecentActivity();
});

function getStoredArray(keyName) {
    return JSON.parse(localStorage.getItem(keyName)) || [];
}

function getInvoiceAmount(invoice) {
    // Different pages may save invoice total using slightly different names.
    // This keeps the dashboard simple and flexible.
    
    let rawTotal =
        invoice.grandTotal 

    let cleanedTotal = String(rawTotal)
        .replace("Grand Total:", "")
        .replace("₹", "")
        .trim();

    let invoiceTotal = Number(cleanedTotal);
    return invoiceTotal
}

function showDashboardData() {
    let products = getStoredArray("products");
    let invoices = getStoredArray("invoices");
    let totalSales = 0;

    for (let i = 0; i < invoices.length; i++) {
        totalSales = totalSales + getInvoiceAmount(invoices[i]);
    }

    document.getElementById("totalProducts").innerText = products.length;
    document.getElementById("totalInvoices").innerText = invoices.length;
    document.getElementById("totalSales").innerText = "Rs. " + totalSales.toFixed(2);
}

function showRecentActivity() {
    let invoices = getStoredArray("invoices");
    let tableBody = document.getElementById("activityTableBody");
    let activityBadge = document.getElementById("activityBadge");

    if (invoices.length === 0) {
        activityBadge.innerText = "No invoices yet";
        return;
    }

    tableBody.innerHTML = "";
    activityBadge.innerText = invoices.length + " saved invoices";

    // Show only latest 3 invoices so the dashboard remains simple.
    for (let i = invoices.length - 1; i >= 0 && i >= invoices.length - 3; i--) {
        let invoice = invoices[i];
        let customerName = invoice.customerName || invoice.customer || "Customer";
        let amount = getInvoiceAmount(invoice);

        let row = document.createElement("tr");
        let detailCell = document.createElement("td");
        let statusCell = document.createElement("td");
        let amountCell = document.createElement("td");

        detailCell.innerText = customerName;
        statusCell.innerText = "Saved";
        amountCell.innerText = "Rs. " + amount.toFixed(2);

        row.appendChild(detailCell);
        row.appendChild(statusCell);
        row.appendChild(amountCell);
        tableBody.appendChild(row);
    }
}

document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");

    $("#logoutBtn").fadeOut(200, function () {
        window.location.href = "index.html";
    });
});
