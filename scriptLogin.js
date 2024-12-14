// Datos de usuario de prueba 
const USERNAME = "talento";
const PASSWORD = "talento";

document.addEventListener("DOMContentLoaded", () => {
    // Modales
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    // Botones para abrir y cerrar los modales
    const openLoginModalButton = document.getElementById("openLoginModal");
    const closeLoginModalButton = document.getElementById("closeLoginModal");
    const openRegisterModalButton = document.getElementById("openRegisterModal");
    const closeRegisterModalButton = document.getElementById("closeRegisterModal");

    // Formularios
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Mensajes de error
    const loginErrorMessage = document.getElementById("loginErrorMessage");
    const registerErrorMessage = document.getElementById("registerErrorMessage");

    // Referencias a elementos
    const userSection = document.getElementById("userSection");

    // Verificar si el usuario ya está logueado (usando LocalStorage)
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        showWelcomeMessage(storedUsername);
    }

    // Mostrar y ocultar el modal de Registro
    openRegisterModalButton.addEventListener("click", () => {
        registerModal.style.display = "flex";
    });

    closeRegisterModalButton.addEventListener("click", () => {
        registerModal.style.display = "none";
        registerErrorMessage.textContent = ""; // Limpiar mensaje de error
    });

    // Abrir el modal de Login
    openLoginModalButton.addEventListener("click", () => {
        loginModal.style.display = "flex";
    });

    // Cerrar el modal de Login
    closeLoginModalButton.addEventListener("click", () => {
        loginModal.style.display = "none";
        loginErrorMessage.textContent = ""; // Limpiar mensaje de error
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

    // Manejar el inicio de sesión
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        // Validar credenciales
        if (username === USERNAME && password === PASSWORD) {
            loginModal.style.display = "none";
            localStorage.setItem("username", username); // Guardar el nombre de usuario
            showWelcomeMessage(username);
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

    // Función para mostrar el mensaje de bienvenida y el botón de "Cerrar sesión"
    function showWelcomeMessage(username) {
        userSection.innerHTML = `
            <p style="display: inline-block;"> Usuario Activo:</p>
            <i class="fs-6 bi bi-person text-dark" style="display: inline-block;"></i>
            <p class="fs-6 text-dark fw-bold" style="display: inline-block;">${username}</p>
            <button class="action-button boton-rojo" id="logoutButton">Cerrar sesión</button>
        `;

        // Añadir funcionalidad al botón de "Cerrar sesión"
        const logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", () => {
            // 1. Eliminar el nombre de usuario almacenado en LocalStorage
            localStorage.removeItem("username");

            // 2. Limpiar los campos del formulario de login
            document.getElementById("loginUsername").value = ""; // Limpiar nombre de usuario
            document.getElementById("loginPassword").value = ""; // Limpiar contraseña

            // 3. Volver a mostrar el botón de "Ingresar"
            userSection.innerHTML = `<button class="action-button boton-verde" id="openLoginModal">Ingresar</button>
                                        <button class="action-button boton-naranja" id="openRegisterModal">Registrarse</button>        
                        `;

            // 4. Asociar nuevamente el evento para abrir el modal
            document.getElementById("openLoginModal").addEventListener("click", () => {
                loginModal.style.display = "flex";
            });
        });
    }
});