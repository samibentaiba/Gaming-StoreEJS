// Delete product confirmation
document.querySelectorAll(".delete-product").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      e.preventDefault();
    }
  });
});

// Auto-dismiss alerts after 3 seconds
document.querySelectorAll(".alert").forEach((alert) => {
  setTimeout(() => {
    alert.style.opacity = "0";
    setTimeout(() => alert.remove(), 500);
  }, 3000);
});

// Image preview for product form
const imageUrlInput = document.querySelector('input[name="imageUrl"]');
const imagePreview = document.querySelector("#imagePreview");

if (imageUrlInput && imagePreview) {
  imageUrlInput.addEventListener("input", (e) => {
    const url = e.target.value;
    if (url) {
      imagePreview.src = url;
      imagePreview.style.display = "block";
    } else {
      imagePreview.style.display = "none";
    }
  });
}

// Price formatting
document.querySelectorAll(".price").forEach((price) => {
  const value = parseFloat(price.textContent);
  price.textContent = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
});

// Form validation
const forms = document.querySelectorAll(".needs-validation");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add("was-validated");
  });
});
