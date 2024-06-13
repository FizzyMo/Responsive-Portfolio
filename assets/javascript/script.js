const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

async function sendEmail(formData) {
    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) 
        });

        // Check for successful response
        if (response.ok) { 
            Swal.fire({
                title: "Great",
                text: "Your email has been sent",
                icon: "success"
            });
            form.reset(); // Clear the form
        } else {
            
            console.error('Error sending email (Server Error):', response.status, response.statusText);
            throw new Error("There was a server error sending your email."); 
        }

    } catch (error) { 
        console.error("Error sending email:", error);
        Swal.fire({
            title: "Error",
            text: "There was an error sending your email. Please try again later.",
            icon: "error"
        });
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const formData = {
        fullName: fullName.value,
        email: email.value,
        phone: phone.value,
        subject: subject.value,
        message: message.value
    };

    sendEmail(formData); 
});