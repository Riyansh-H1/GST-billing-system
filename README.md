# GST-billing-system
SmartGST – Web based GST billing system for small businesses


Core Features


1️⃣ Login Page

Concepts used:

HTML forms, CSS styling, JS validation

Fields:

Username, Password

Validation:

empty fields, password length


2️⃣ Dashboard Page

After login user sees:

total sales, invoices created, revenue today

Concepts used:

JavaScript DOM, Bootstrap cards

3️⃣ Create Invoice Page

User can:

enter customer name, add products, quantity,price, GST %

System calculates automatically:

Subtotal, GST, Total

Concepts used:

JavaScript calculations, DOM manipulation,tables, dynamic rows

4️⃣ Product Management

User can:

add new product, edit product, delete product

Concepts used:

jQuery, dynamic table updates

5️⃣ Invoice History

Table showing:

Invoice ID, Date, Customer, Amount

Concepts used:

Bootstrap tables, JS arrays, sorting

6️⃣ Email Invoice

Just simulate: Invoice Sent Successfully!

Concept used: JS alerts / modal

7️⃣ Video Background:

Login page background video.

8️⃣ Client Side Storage

Store data using: localStorage

Example: localStorage.setItem("invoice", data)


Project folder Structure

gst-billing-project
│
├── index.html
├── dashboard.html
├── invoice.html
├── products.html
├── history.html
├── about.html
│
├── css
│   └── style.css
│
├── js
│   └── script.js
│
├── videos
│   └── background.mp4
│
├── images
│
└── README.md