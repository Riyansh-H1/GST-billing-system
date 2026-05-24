
// Contact Form Validation

$(document).ready(function () {

    // Form Submit Event
    $("#contactForm").submit(function (event) {

        // Prevent Page Refresh
        event.preventDefault();

        // Input Values
        let fullName = $("#fullName").val().trim();
        let email = $("#email").val().trim();
        let phone = $("#phone").val().trim();
        let subject = $("#subject").val().trim();
        let message = $("#message").val().trim();

        // Email Validation Pattern
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        // Phone Validation Pattern
        let phonePattern = /^[0-9]{10}$/;

        // Required Field Validation
        if (fullName === "") {
            alert("Please enter your full name.");
            return;
        }

        if (email === "") {
            alert("Please enter your email address.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Phone Number Optional Validation
        if (phone !== "" && !phonePattern.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (subject === "") {
            alert("Please enter the subject.");
            return;
        }

        if (message === "") {
            alert("Please enter your message.");
            return;
        }

        // Show Bootstrap Modal
        let successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();

        // Reset Form
        $("#contactForm")[0].reset();

    });

});