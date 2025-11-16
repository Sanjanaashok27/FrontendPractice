document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fname = document.getElementById('FirstName').value.trim();
    const lname = document.getElementById('LastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmpassword').value;
    const phone = document.getElementById('number').value.trim();
    const dob = document.getElementById('dob').value;
    const age = Number(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    const fnameError = document.getElementById('fnameError');
    const lnameError = document.getElementById('lnameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    const phoneError = document.getElementById('phoneError');
    const dobError = document.getElementById('dobError');
    const ageError = document.getElementById('ageError');
    const genderError = document.getElementById('genderError');

    fnameError.textContent = '';
    lnameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmError.textContent = '';
    phoneError.textContent = '';
    dobError.textContent = '';
    ageError.textContent = '';
    genderError.textContent = '';

    let isValid = true;

    if (fname.length < 2) {
        fnameError.textContent = 'First name must be at least 2 characters';
        isValid = false;
    }
    // allow letters and spaces only for names
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(fname)) {
        fnameError.textContent = 'First name can only contain letters and spaces';
        isValid = false;
    }
    if (lname.length < 2) {
        lnameError.textContent = 'Last name must be at least 2 characters';
        isValid = false;
    }
    if (!namePattern.test(lname)) {
        lnameError.textContent = 'Last name can only contain letters and spaces';
        isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Enter a valid email';
        isValid = false;
    }
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    if (password !== confirmPassword) {
        confirmError.textContent = 'Passwords do not match';
        isValid = false;
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        phoneError.textContent = 'Enter a valid 10-digit phone number';
        isValid = false;
    }
    if (!dob) {
        dobError.textContent = 'Date of birth is required';
        isValid = false;
    } else if (age < 18 || age > 60) {
        ageError.textContent = 'Age must be between 18 and 60';
        isValid = false;
    }
    if (!gender) {
        genderError.textContent = 'Please select gender';
        isValid = false;
    }
    if (isValid) {
        alert('Form submitted successfully!');
    }
});

document.getElementById('dob').addEventListener('change', function() {
    const dobValue = this.value;
    if (dobValue) {
        const dobDate = new Date(dobValue);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        document.getElementById('age').value = age;
    }
});