document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  try {
    const res = await fetch('/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Email sent successfully!");
    } else {
      alert("Something went wrong. Try again later.");
    }
  } catch (err) {
    alert("Server error. Please try again.");
  }
});
