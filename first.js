function showError(elemId, message) {
    const el = document.getElementById(elemId);
    if (el) el.textContent = message;
}

const errorToField = {
    fnameError: 'FirstName',
    lnameError: 'LastName',
    emailError: 'email',
    passwordError: 'password',
    confirmError: 'confirmpassword',
    phoneError: 'number',
    dobError: 'dob',
    ageError: 'age',
    genderError: 'gender'
};

function setFieldInvalid(errorId, hasError) {
    const fieldId = errorToField[errorId];
    if (!fieldId) return;
    const field = document.getElementById(fieldId);
    if (!field) return;
    if (hasError) field.classList.add('invalid'); else field.classList.remove('invalid');
}

let formSubmitted = false;
const touched = {};

function validateName(fieldId, errorId) {
    const raw = document.getElementById(fieldId).value;
    const value = raw.trim();
    const namePattern = /^[A-Za-z\s]+$/;
    const showRequired = touched[fieldId] || formSubmitted;
    if (raw === '') {
        if (showRequired) showError(errorId, 'This field is required');
        setFieldInvalid(errorId, !!(showRequired));
        return false;
    }
    if (value === '') {
        showError(errorId, 'Please enter your name (not only spaces or tabs)');
        setFieldInvalid(errorId, true);
        return false;
    }
    if (value.length < 2) {
        showError(errorId, 'Name must be at least 2 characters');
        return false;
    }
    if (!namePattern.test(value)) {
        if (/\d/.test(value)) {
            showError(errorId, 'Names cannot contain numbers');
        } else if (/[_]/.test(value)) {
            showError(errorId, 'Names cannot contain underscores or special characters');
        } else {
            showError(errorId, 'Use letters and spaces only');
        }
        setFieldInvalid(errorId, true);
        return false;
    }
    showError(errorId, '');
    setFieldInvalid(errorId, false);
    return true;
}

function validateEmail() {
    const raw = document.getElementById('email').value;
    const value = raw.trim();
    const emailError = 'emailError';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const showRequired = touched['email'] || formSubmitted;
    if (raw === '') {
        if (showRequired) showError(emailError, 'Email is required');
        setFieldInvalid(emailError, !!(showRequired));
        return false;
    }
    if (value === '') {
        showError(emailError, 'Please enter your email (not only spaces or tabs)');
        setFieldInvalid(emailError, true);
        return false;
    }
    if (!emailPattern.test(value)) {
        showError(emailError, 'Please enter a valid email address like name@example.com');
        setFieldInvalid(emailError, true);
        return false;
    }
    showError(emailError, '');
    setFieldInvalid(emailError, false);
    return true;
}

function validatePassword() {
    const pwd = document.getElementById('password').value || '';
    const confirm = document.getElementById('confirmpassword').value || '';
    const showRequiredPwd = touched['password'] || formSubmitted;
    if (pwd.length < 6) {
        if (showRequiredPwd) showError('passwordError', 'Password must be at least 6 characters');
        setFieldInvalid('passwordError', showRequiredPwd);
        return false;
    }
    showError('passwordError', '');
    setFieldInvalid('passwordError', false);
    const showConfirm = touched['confirmpassword'] || formSubmitted;
    if (showConfirm && pwd !== confirm) {
        showError('confirmError', 'Passwords do not match');
        setFieldInvalid('confirmError', true);
        return false;
    }
    showError('confirmError', '');
    setFieldInvalid('confirmError', false);
    return true;
}

function validatePhone() {
    const raw = document.getElementById('number').value || '';
    const value = raw.trim();
    const phonePattern = /^[0-9]{10}$/;
    const showRequired = touched['number'] || formSubmitted;
    if (raw === '') {
        if (showRequired) showError('phoneError', 'Phone number is required');
        setFieldInvalid('phoneError', !!(showRequired));
        return false;
    }
    if (value === '') {
        showError('phoneError', 'Please enter your phone number (not only spaces or tabs)');
        setFieldInvalid('phoneError', true);
        return false;
    }
    if (!phonePattern.test(value)) {
        showError('phoneError', 'Enter a 10-digit phone number using only digits');
        setFieldInvalid('phoneError', true);
        return false;
    }
    showError('phoneError', '');
    setFieldInvalid('phoneError', false);
    return true;
}

function validateDobAndAge() {
    const dobRaw = document.getElementById('dob').value || '';
    const ageVal = Number(document.getElementById('age').value);
    const showRequired = touched['dob'] || formSubmitted;
    if (!dobRaw) {
        if (showRequired) showError('dobError', 'Please pick your date of birth');
        setFieldInvalid('dobError', !!(showRequired));
        return false;
    }
    if (Number.isNaN(ageVal)) {
        showError('ageError', 'Age could not be calculated from DOB');
        setFieldInvalid('ageError', true);
        return false;
    }
    if (ageVal < 18 || ageVal > 60) {
        showError('ageError', 'Age should be between 18 and 60');
        setFieldInvalid('ageError', true);
        return false;
    }
    showError('dobError', '');
    showError('ageError', '');
    setFieldInvalid('dobError', false);
    setFieldInvalid('ageError', false);
    return true;
}

function validateGender() {
    const genderVal = document.getElementById('gender').value;
    const showRequired = touched['gender'] || formSubmitted;
    if (!genderVal) {
        if (showRequired) showError('genderError', 'Please select your gender');
        setFieldInvalid('genderError', !!(showRequired));
        return false;
    }
    showError('genderError', '');
    setFieldInvalid('genderError', false);
    return true;
}


document.getElementById('FirstName').addEventListener('blur', function() { touched['FirstName'] = true; validateName('FirstName', 'fnameError'); });
document.getElementById('LastName').addEventListener('blur', function() { touched['LastName'] = true; validateName('LastName', 'lnameError'); });
document.getElementById('email').addEventListener('blur', function() { touched['email'] = true; validateEmail(); });
document.getElementById('password').addEventListener('blur', function() { touched['password'] = true; validatePassword(); });
document.getElementById('confirmpassword').addEventListener('blur', function() { touched['confirmpassword'] = true; validatePassword(); });
document.getElementById('number').addEventListener('blur', function() { touched['number'] = true; validatePhone(); });
document.getElementById('dob').addEventListener('blur', function() { touched['dob'] = true; validateDobAndAge(); });
document.getElementById('gender').addEventListener('blur', function() { touched['gender'] = true; validateGender(); });

document.getElementById('FirstName').addEventListener('input', function() { validateName('FirstName', 'fnameError'); });
document.getElementById('LastName').addEventListener('input', function() { validateName('LastName', 'lnameError'); });
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirmpassword').addEventListener('input', validatePassword);
document.getElementById('number').addEventListener('input', validatePhone);

document.getElementById('dob').addEventListener('input', function() {
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
    } else {
        document.getElementById('age').value = '';
    }
    validateDobAndAge();
});
document.getElementById('gender').addEventListener('change', function() { touched['gender'] = true; validateGender(); });


document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    formSubmitted = true;
    const ok = [
        validateName('FirstName', 'fnameError'),
        validateName('LastName', 'lnameError'),
        validateEmail(),
        validatePassword(),
        validatePhone(),
        validateDobAndAge(),
        validateGender()
    ];
    if (ok.every(Boolean)) {
        alert('Form submitted successfully!');
    } else {
        
        const firstError = document.querySelector('.invalid');
        if (firstError) firstError.focus();
        alert('Please fix the highlighted errors before submitting.');
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