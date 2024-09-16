document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    const maxPasswordLength = 8;
    const maxPhoneLength = 9;


    const containsSQLInjection = (value) => {
        const sqlInjectionPatterns = [
            /select\s+\*/i,
            /select\s+\w+\s+from\s+\w+/i,
            /insert\s+into\s+\w+/i,
            /update\s+\w+\s+set\s+\w+/i,
            /delete\s+from\s+\w+/i,
            /drop\s+table\s+\w+/i,
            /union\s+select\s+/i,
            /or\s+1\s*=\s*1/i
        ];
        return sqlInjectionPatterns.some(pattern => pattern.test(value));
    };


    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length > maxPasswordLength) {
            passwordInput.value = passwordInput.value.slice(0, maxPasswordLength); 
        }
    });


    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, '');
        if (phoneInput.value.length > maxPhoneLength) {
            phoneInput.value = phoneInput.value.slice(0, maxPhoneLength);
        }
    });

    form.addEventListener('submit', (event) => {
        if (passwordInput.value.length > maxPasswordLength) {
            passwordInput.value = passwordInput.value.slice(0, maxPasswordLength);
        }

        if (phoneInput.value.length > maxPhoneLength) {
            phoneInput.value = phoneInput.value.slice(0, maxPhoneLength);
        }

        if (containsSQLInjection(emailInput.value) || containsSQLInjection(passwordInput.value)) {
            event.preventDefault();
            alert('No se permite sentencias SQL.');
            window.location.reload();
            return;
        }

        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
        } else {
            alert('Inicio de sesión correcto');
            event.preventDefault(); 
            window.location.reload();
        }
    });
});
