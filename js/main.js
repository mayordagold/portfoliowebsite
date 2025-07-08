document.querySelector(".contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Ensure all variables are properly declared
    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector('input[placeholder="Your Email"]').value; // ✅ Define email correctly
    const message = document.querySelector('textarea[placeholder="Your Message"]').value;
    console.log("Email:", email); // Debugging log to ensure email is defined


    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Send inquiry using EmailJS
    emailjs.send("service_s2iqwk9", "template_0k9m22k", {
        from_name: name,
        from_email: email, // ✅ Make sure 'email' is properly defined
        message: message
    }).then(() => {
        alert("Inquiry sent to your email successfully!");
    }).catch(error => {
        console.error("Error sending email:", error);
        alert("Failed to send email. Please check EmailJS settings.");
    });
});

document.querySelector("#contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent traditional form submission

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();
    const responseMessage = document.querySelector("#response-message");

    // Simple validation
    if (!name || !email || !message) {
        responseMessage.innerText = "All fields are required!";
        responseMessage.style.color = "red";
        return;
    }

    // AJAX request to send data asynchronously
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_name: name, from_email: email, message: message })
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to send email.");
        return response.json();
    })
    .then(data => {
        responseMessage.innerText = "Message sent successfully!";
        responseMessage.style.color = "green";
        document.querySelector("#contact-form").reset();
    })
    .catch(error => {
        responseMessage.innerText = "Oops! Something went wrong.";
        responseMessage.style.color = "red";
    });
});

document.querySelector("#contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent traditional form submission

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();
    const responseMessage = document.querySelector("#response-message");

    // Basic validation checks
    if (!name || !email || !message) {
        responseMessage.innerText = "All fields are required!";
        responseMessage.style.color = "red";
        return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        responseMessage.innerText = "Please enter a valid email address!";
        responseMessage.style.color = "red";
        return;
    }

    // Show loading effect while sending the request
    responseMessage.innerText = "Sending...";
    responseMessage.style.color = "#007BFF";

    // AJAX request to send form data asynchronously
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_name: name, from_email: email, message: message })
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to send message.");
        return response.json();
    })
    .then(() => {
        responseMessage.innerText = "Message sent successfully!";
        responseMessage.style.color = "green";
        document.querySelector("#contact-form").reset();
    })
    .catch(() => {
        responseMessage.innerText = "Oops! Something went wrong.";
        responseMessage.style.color = "red";
    });
});


document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent traditional form submission

    // Get user input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate inputs
    if (!name || !email || !message) {
        document.getElementById("response-message").innerText = "All fields are required!";
        return;
    }

    // Prepare the data payload
    const formData = {
        from_name: name,
        from_email: email,
        message: message
    };

    // Send data asynchronously to EmailJS
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to send email.");
        return response.json();
    })
    .then(data => {
        document.getElementById("response-message").innerText = "Message sent successfully!";
        storeInquiry(name, email, message); // Store the inquiry after successful email send
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("response-message").innerText = "Oops! Something went wrong.";
    });
});

// ✅ Function to store inquiries in JSON Server only after email is successfully sent
function storeInquiry(name, email, message) {
    fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to store inquiry.");
        return response.json();
    })
    .then(data => {
        alert("Thank you! Your request has been sent and stored.");
        console.log("Client Request Stored:", data);
    })
    .catch(error => console.error("Error submitting form:", error));
}

// ✅ Function to delete a request (DELETE Request)
function deleteRequest(requestId) {
    fetch(`http://localhost:5000/requests/${requestId}`, { method: "DELETE" })
    .then(response => {
        if (!response.ok) throw new Error(`Failed to delete request with ID: ${requestId}`);
        alert("Request successfully deleted.");
        console.log(`Deleted request with ID: ${requestId}`);
    })
    .catch(error => console.error("Error deleting request:", error));
}