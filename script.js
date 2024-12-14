// Definicion de la clave API en el ámbito global
const apiKey = 'f842652436381d80af379e36d891f6d1';

document.addEventListener('DOMContentLoaded', function () {

    //loadHeader();
    //loadFooter();

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

    // funciones y llamadas para cargar header y footer
    function loadHeader() {
        fetch('Encabezado.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data;
            })
            .catch(error => console.log('Error cargando el encabezado:', error));
    }

    function loadFooter() {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            })
            .catch(error => console.log('Error cargando el pie de página:', error));
    }

    // Ejecutar funciones para cargar los datos al iniciar la página

    searchVivo();
    partidoTemporadas()
    tablaPos(128)
    status()
    membresiasAbono()

    const actualizarBtn = document.getElementById('actualizar-partidos-btn');
    if (actualizarBtn) {
        actualizarBtn.addEventListener('click', function () {
            searchVivo();  // Actualizar los partidos en vivo
        });
    }

    //funcion BUSCAR PARTIDOS EN VIVO EN EL MUNDO `https://v3.football.api-sports.io/fixtures?live=all` 
    function searchVivo() {
        const countryName = "Argentina"
        const liveFixturesUrl = `https://v3.football.api-sports.io/fixtures?live=all`;
        fetch(liveFixturesUrl, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                const matches = data.response.filter(match => match.league.country);
                const liveMatches = matches || [];
                const matchesList = document.getElementById('matches-list');
                console.log("Datos Recibido de Fetch:", data.response)


                if (matchesList) {
                    matchesList.innerHTML = ''; // Limpiar la lista de partidos anteriores

                    let fechaAgregada = false;  // Control para agregar la fecha solo una vez

                    if (liveMatches.length > 0) {
                        liveMatches.forEach(match => {
                            const matchDate = new Date(match.fixture.date);
                            const formattedDate = `${matchDate.getDate().toString().padStart(2, '0')}/${(matchDate.getMonth() + 1).toString().padStart(2, '0')}/${matchDate.getFullYear()}`;

                            if (!fechaAgregada) {
                                const fechaVivoDiv = document.querySelector('.fechaVivo');
                                if (fechaVivoDiv) {
                                    const dateTitle = document.createElement('p');
                                    dateTitle.textContent = `Fecha del Partido: ${formattedDate}`;
                                    fechaVivoDiv.appendChild(dateTitle);
                                }
                                fechaAgregada = true;
                            }

                            const tiempoPartido = match.fixture.status.elapsed || 'N/A';

                            const listItem = document.createElement('li');
                            listItem.classList.add('partidosVivo');

                            listItem.innerHTML = `
                            <div class="card-body text-center">
                                <div class="row g-1 border-bottom border-white">
                                    <div class="col-12 bg-dark text-white">
                                        <p class="card-text-partido mb-0">${match.teams.home.name} ${match.goals.home} - ${match.goals.away} ${match.teams.away.name}</p>
                                    </div>
                                </div>
                                <div class="row g-1">
                                    <div class="col-6 bg-secondary text-white border-end border-white">
                                        <p class="text-tiempo-liga me-2 small mb-0">${tiempoPartido} minutos</p>
                                    </div>
                                    <div class="col-6 bg-secondary text-white">
                                        <p class="text-tiempo-liga small mb-0">${match.league.name}</p>
                                    </div>
                                </div>
                            </div>
                        `;

                            matchesList.appendChild(listItem);
                        });
                    } else {
                        const noMatchesItem = document.createElement('li');
                        noMatchesItem.textContent = "No se esta jugando ningun partido en estos momento";
                        matchesList.appendChild(noMatchesItem);
                    }
                }
            })
            .catch(error => console.error('Error al obtener los partidos en vivo:', error));
    }

    //funcion BUSCAR PARTIDOS EN VIVO EN EL MUNDO `https://v3.football.api-sports.io/fixtures?live=all` 
    function partidoTemporadas() {
        const countryName = "Argentina"
        const liveFixturesUrl = `https://v3.football.api-sports.io/fixtures?league=128&season=2022`;
        fetch(liveFixturesUrl, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                const matches = data.response.filter(match => match.league.country);
                const liveMatches = matches || [];
                const matchesList = document.getElementById('matches-list-proximo');

                console.log("Datos Recibido de Fetch:", data.response)


                if (matchesList) {
                    matchesList.innerHTML = ''; // Limpiar la lista de partidos anteriores

                    let fechaAgregada = false;  // Control para agregar la fecha solo una vez

                    if (liveMatches.length > 0) {
                        liveMatches.forEach(match => {
                            const matchDate = new Date(match.fixture.date);
                            const formattedDate = `${matchDate.getDate().toString().padStart(2, '0')}/${(matchDate.getMonth() + 1).toString().padStart(2, '0')}/${matchDate.getFullYear()}`;

                            if (!fechaAgregada) {
                                const fechaVivoDiv = document.querySelector('.fechaVivo');
                                if (fechaVivoDiv) {
                                    const dateTitle = document.createElement('p');
                                    dateTitle.textContent = `Fecha del Partido: ${formattedDate}`;
                                    fechaVivoDiv.appendChild(dateTitle);
                                }
                                fechaAgregada = true;
                            }

                            const tiempoPartido = match.fixture.status.elapsed || 'N/A';

                            const listItem = document.createElement('li');
                            listItem.classList.add('partidosProximos');

                            // Alternar colores basados en el número de elementos existentes en la lista
                            if (matchesList.children.length % 2 === 0) {
                                // Índice par: agregar clase para un color
                                listItem.classList.add('bg-dark'); // Clase Bootstrap para fondo claro
                            } else {
                                // Índice impar: agregar clase para otro color
                                listItem.classList.add('bg-secondary'); // Clase Bootstrap para fondo gris oscuro
                            }

                            listItem.innerHTML = `
                        
                            <div class="text-center">
                                <div class="row g-1 border-bottom border-white">
                                    <div class="col-12 text-white">
                                        <p class="card-text-partido mb-0">${match.teams.home.name} ${match.goals.home} - ${match.goals.away} ${match.teams.away.name}</p>
                                    </div>
                                </div>
                            </div>
                        `;

                            matchesList.appendChild(listItem);
                        });
                    } else {
                        const noMatchesItem = document.createElement('li');
                        noMatchesItem.textContent = "No se esta jugando ningun partido en estos momento";
                        matchesList.appendChild(noMatchesItem);
                    }
                }
            })
            .catch(error => console.error('Error al obtener los partidos:', error));
    }

    function tablaPos(leagueId) {
        const standingsUrl = `https://v3.football.api-sports.io/standings?league=${leagueId}&season=2022`;

        fetch(standingsUrl, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta completa de la API:', data);

                // Verificar si la respuesta contiene standings
                const standings = data.response?.[0]?.league?.standings?.[0];
                if (!standings) {
                    console.error('No se encontraron datos de standings en la respuesta');
                    return;
                }

                // Seleccionar el cuerpo de la tabla
                const standingsTableBody = document.querySelector('#standings-table tbody');
                if (!standingsTableBody) {
                    console.error('El contenedor para la tabla no existe en el HTML');
                    return;
                }

                standingsTableBody.innerHTML = ''; // Limpiar contenido previo

                // Generar las filas de la tabla
                standings.forEach(team => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${team.rank}</td>
                    <td>${team.team.name}</td>
                    <td>${team.points}</td>
                    <td>${team.all.played}</td>
                    <td>${team.all.win}</td>
                    <td>${team.all.draw}</td>
                    <td>${team.all.lose}</td>
                    <td>${team.all.goals.for}</td>
                    <td>${team.all.goals.against}</td>
                `;
                    standingsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error al obtener los standings:', error));
    }

    //funcion BUSCAR proximos PARTIDOS Argentina 
    function status() {
        const countryName = "Argentina"
        const cantidad = 10
        const league_id = 128
        const fixturesUrl = 'https://v3.football.api-sports.io/status';

        fetch(`${fixturesUrl}`, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Status: ", data)

            })
            .catch(error => console.error('Error al obtener los partidos:', error));
    }
});
