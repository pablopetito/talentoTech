// Datos de usuario predefinidos (solo para login básico)
const USERNAME = "admin";
const PASSWORD = "12345";

document.addEventListener("DOMContentLoaded", () => {
    // Modales
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    // Botones para abrir y cerrar los modales
    const openLoginModalButton = document.getElementById("openLoginModal");
    const openRegisterModalButton = document.getElementById("openRegisterModal");
    const closeLoginModalButton = document.getElementById("closeLoginModal");
    const closeRegisterModalButton = document.getElementById("closeRegisterModal");

    // Formularios
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Mensajes de error
    const loginErrorMessage = document.getElementById("loginErrorMessage");
    const registerErrorMessage = document.getElementById("registerErrorMessage");

    // Mostrar y ocultar el modal de Login
    openLoginModalButton.addEventListener("click", () => {
        loginModal.style.display = "flex";
    });
    closeLoginModalButton.addEventListener("click", () => {
        loginModal.style.display = "none";
        loginErrorMessage.textContent = ""; // Limpiar mensaje de error
    });

    // Mostrar y ocultar el modal de Registro
    openRegisterModalButton.addEventListener("click", () => {
        registerModal.style.display = "flex";
    });
    closeRegisterModalButton.addEventListener("click", () => {
        registerModal.style.display = "none";
        registerErrorMessage.textContent = ""; // Limpiar mensaje de error
    });

    // Cerrar los modales si se hace clic fuera de ellos
    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target === registerModal) {
            registerModal.style.display = "none";
        }
    });

    // Manejar el formulario de Login
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        if (username === USERNAME && password === PASSWORD) {
            alert("Inicio de sesión exitoso. ¡Bienvenido!");
            loginModal.style.display = "none";
        } else {
            loginErrorMessage.textContent = "Usuario o contraseña incorrectos.";
        }
    });

    // Manejar el formulario de Registro
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newUsername = document.getElementById("registerUsername").value;
        const newEmail = document.getElementById("registerEmail").value;
        const newPassword = document.getElementById("registerPassword").value;

        if (newUsername && newEmail && newPassword) {
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            registerModal.style.display = "none";
            registerErrorMessage.textContent = ""; // Limpiar mensaje de error
        } else {
            registerErrorMessage.textContent = "Por favor, completa todos los campos.";
        }
    });
});
