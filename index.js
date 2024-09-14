// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    const maxPasswordLength = 8;
    const maxPhoneLength = 9;

    // Función para detectar posibles inyecciones SQL
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

    // Limitar el campo de contraseña a 8 caracteres en tiempo real
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length > maxPasswordLength) {
            passwordInput.value = passwordInput.value.slice(0, maxPasswordLength); // Limita la entrada a 8 caracteres
        }
    });

    // Limitar el campo de número telefónico a 9 dígitos en tiempo real
    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ''); // Elimina todo lo que no sea un número
        if (phoneInput.value.length > maxPhoneLength) {
            phoneInput.value = phoneInput.value.slice(0, maxPhoneLength); // Limita la entrada a 9 dígitos
        }
    });

    // Validación y recorte de valores cuando se envía el formulario
    form.addEventListener('submit', (event) => {
        // Recorta el valor del campo de contraseña si es necesario
        if (passwordInput.value.length > maxPasswordLength) {
            passwordInput.value = passwordInput.value.slice(0, maxPasswordLength); // Recorta a 8 caracteres
        }

        // Recorta el valor del campo de teléfono si es necesario
        if (phoneInput.value.length > maxPhoneLength) {
            phoneInput.value = phoneInput.value.slice(0, maxPhoneLength); // Recorta a 9 dígitos
        }

        // Verifica posibles inyecciones SQL en los campos de correo electrónico y contraseña
        if (containsSQLInjection(emailInput.value) || containsSQLInjection(passwordInput.value)) {
            event.preventDefault(); // Evita el envío del formulario
            alert('No se permite sentencias SQL.');
            window.location.reload(); // Recarga la página después del mensaje de alerta
            return; // Sale de la función para evitar el resto de la validación
        }

        // Verifica si el formulario es válido después del recorte
        if (!form.checkValidity()) {
            event.preventDefault(); // Evita el envío si hay errores
            form.reportValidity(); // Muestra los mensajes de error
        } else {
            alert('Inicio de sesión correcto');
            event.preventDefault(); // Evita que la página se recargue de inmediato
            window.location.reload(); // Recarga la página después del mensaje de alerta
        }
    });
});
