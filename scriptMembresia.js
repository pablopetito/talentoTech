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

        const arrayO = document.getElementById('card-planes');
        arrayO.innerHTML = ''; // Limpiar la lista de partidos anteriores

        planes.forEach(plan => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 col-sm-12 mb-4'; // Clases para columnas y espaciado
            card.innerHTML = `
                <div class="card text-center">
                    <div class="card-body">
                        <i class="${plan.icono} card-icon"></i>
                        <h5 class="card-title">${plan.titulo}</h5>
                        <p class="card-text">${plan.descripcion}</p>
                        <p class="card-price">${plan.costo}</p>
                        <button class="btn btn-plan">Elegir Plan</button>
                    </div>
                </div>
            `;
            arrayO.appendChild(card);
        })
    }

    membresiasAbono()

})