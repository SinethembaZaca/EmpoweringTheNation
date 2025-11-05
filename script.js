// Auto-update footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Course fees
const courseFees = {
  "first-aid": 1500,
  sewing: 1500,
  landscaping: 1500,
  "life-skills": 1500,
  "child-minding": 750,
  cooking: 750,
  "garden-maintenance": 750,
};

// Function to calculate total fees
function calculateTotal() {
  const checkboxes = document.querySelectorAll('input[name="courses"]:checked');
  const selectedCourses = Array.from(checkboxes).map((cb) => cb.value);
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validate inputs
  if (!name || !phone || !email) {
    alert("Please fill in all your contact details.");
    return;
  }

  if (!/^\d+$/.test(phone)) {
    alert("Please enter a valid phone number (digits only).");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return;
  }

  if (selectedCourses.length === 0) {
    alert("Please select at least one course.");
    return;
  }

  // Calculate subtotal
  let subtotal = selectedCourses.reduce((sum, course) => sum + courseFees[course], 0);

  // Apply discount
  let discount = 0;
  if (selectedCourses.length === 2) discount = 0.05;
  else if (selectedCourses.length === 3) discount = 0.1;
  else if (selectedCourses.length > 3) discount = 0.15;

  const discountedTotal = subtotal - subtotal * discount;

  // Apply VAT (15%)
  const vat = discountedTotal * 0.15;
  const total = discountedTotal + vat;

  // Display result
  const totalDiv = document.getElementById("total");
  totalDiv.innerHTML = `
    <h3>Quote Summary</h3>
    <p><strong>Selected Courses:</strong> ${selectedCourses.join(", ")}</p>
    <p><strong>Subtotal:</strong> R${subtotal.toFixed(2)}</p>
    <p><strong>Discount:</strong> ${discount * 100}%</p>
    <p><strong>VAT (15%):</strong> R${vat.toFixed(2)}</p>
    <h4>Total (including VAT): R${total.toFixed(2)}</h4>
    <p><em>This is a quotation only — a consultant will contact you to finalize registration.</em></p>
  `;
}