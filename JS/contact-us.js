document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const fields = form.querySelectorAll("[data-validation]");
    
    // Validation rules
    const rules = {
        required: function(value) {
            return value.trim() !== "";
        },
        email: function(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        phone: function(value) {
            return /^[0-9]{10,15}$/.test(value);
        }
    };

    function validateField(field) {
        const validations = field.getAttribute("data-validation").split("|");
        const value = field.value;
        const errorMessage = field.nextElementSibling; // Assuming the error message <span> is right after the field

        // Clear any previous error message
        errorMessage.textContent = '';

        for (let i = 0; i < validations.length; i++) {
            const rule = validations[i];
            if (!rules[rule](value)) {
                field.classList.add("is-invalid");  // Add invalid class for styling
                errorMessage.textContent = "Invalid " + field.name + ".";  // Update error message
                return false;
            }
        }

        field.classList.remove("is-invalid");  // Remove invalid class if valid
        return true;
    }

    // Validate on input
    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("input", function() {
            validateField(fields[i]);
        });
    }

    // Validate on form submission
    form.addEventListener("submit", function(e) {
        let isValid = true;
        for (let i = 0; i < fields.length; i++) {
            if (!validateField(fields[i])) isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            alert("Please correct the errors before submitting.");
        }
    });
});
