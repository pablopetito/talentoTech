document.addEventListener("DOMContentLoaded", () => {

    function membresiasAbono() {
        const planes = [
            {
                titulo: "Plan Free",
                descripcion: "Acceso básico a los resultados deportivos.",
                costo: "$0,00",
                icono: "fas fa-user"
            },
            {
                titulo: "Plan Básico",
                descripcion: "Funciones adicionales y estadísticas detalladas.",
                costo: "$5.000,00",
                icono: "fas fa-chart-line"
            },
            {
                titulo: "Plan Premium",
                descripcion: "Acceso completo a todos los servicios y beneficios exclusivos.",
                costo: "$10.000,00",
                icono: "fas fa-crown"
            }
        ]

        console.log(planes);

        const arrayO = document.getElementById('arrayObjetos');
        arrayO.innerHTML = ''; // Limpiar la lista de partidos anteriores

        planes.forEach(plan => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<p class="fs-6 m-2">${plan.titulo} | ${plan.descripcion} | ${plan.costo} | ${plan.icono}</p>`;
            arrayO.appendChild(listItem);
        })
    }

    membresiasAbono()

})