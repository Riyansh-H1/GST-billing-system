// Get form and table body
const productForm = document.getElementById("productForm");

const productTableBody =
    document.getElementById("productTableBody");


// Load products when page opens
document.addEventListener(
    "DOMContentLoaded",
    loadProducts
);


function showModal(message) {

    document.getElementById("modalMessage")
        .innerText = message;

    let modal = new bootstrap.Modal(
        document.getElementById("customModal")
    );

    modal.show();
}

// Add Product
productForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        // Get input values
        const name =
            document.getElementById("productName").value;

        const price =
            document.getElementById("productPrice").value;

        const gst =
            document.getElementById("productGST").value;


        // Calculate final price
        const finalPrice =
            Number(price) +
            (Number(price) * Number(gst) / 100);


        // Create product object
        const product = {
            name,
            price,
            gst,
            finalPrice: finalPrice.toFixed(2)
        };


        // Get existing products
        let products =
            JSON.parse(localStorage.getItem("products"))
            || [];


        // Add new product
        products.push(product);


        // Save back to localStorage
        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        // Reload products table
        loadProducts();


        // Clear form
        productForm.reset();
    }
);


// Load Products Function
function loadProducts() {

    // Clear table first
    productTableBody.innerHTML = "";


    // Get products from localStorage
    let products =
        JSON.parse(localStorage.getItem("products"))
        || [];


    // Loop through products
    products.forEach((product, index) => {

        let row = `
            <tr>

                <td>${index + 1}</td>

                <td>${product.name}</td>

                <td>₹${product.price}</td>

                <td>${product.gst}%</td>

                <td>₹${product.finalPrice}</td>

                <td>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteProduct(${index})"
                    >
                        Delete
                    </button>

                </td>

            </tr>
        `;

        productTableBody.innerHTML += row;
    });
}


// Delete Product
function deleteProduct(index) {

    let products =
        JSON.parse(localStorage.getItem("products"))
        || [];


    // Remove selected product
    products.splice(index, 1);


    // Save updated array
    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    // Reload table
    loadProducts();
}
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");

    $("#logoutBtn").fadeOut(200, function () {
        window.location.href = "index.html";
    });
});