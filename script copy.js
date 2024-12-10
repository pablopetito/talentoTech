// Definicion de la clave API en el ámbito global
const apiKey = 'f842652436381d80af379e36d891f6d1';

document.addEventListener('DOMContentLoaded', function() {
    
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
    loadHeader();
    loadFooter();

    // Ejecutar funciones para cargar los datos al iniciar la página
    ligas();
    searchVivo();
    searchMatches('next'); // Próximos partidos
    searchMatches('last'); // Resultados anteriores
    tablaPos(128); // Tabla Posiciones 

    // Botones de búsqueda (API Fútbol)
    const upcomingBtn = document.getElementById('search-upcoming-btn');
    if (upcomingBtn) {
        upcomingBtn.addEventListener('click', function() {
            searchMatches('next');
        });
    }

    const resultsBtn = document.getElementById('search-results-btn');
    if (resultsBtn) {
        resultsBtn.addEventListener('click', function() {
            searchMatches('last');
        });
    }

    const vivoBtn = document.getElementById('search-vivo-btn');
    if (vivoBtn) {
        vivoBtn.addEventListener('click', function() {
            searchVivo();
        });
    }

    const actualizarBtn = document.getElementById('actualizar-partidos-btn');
    if (actualizarBtn) {
        actualizarBtn.addEventListener('click', function() {
            searchVivo();  // Actualizar los partidos en vivo
        });
    }

    //funcion BUSCAR FIXTURE PARTIDOS ANTERIORES Y PROXIMOS 
    function searchMatches(type) {
        const league_id=128
        const fixturesUrl = 'https://v3.football.api-sports.io/fixtures?league={league_id}&next=20';

        fetch(`${fixturesUrl}`, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Partidos Liga:', data.response);
            const matches = data.response;

            const matchesListProx = document.getElementById('matches-list-proximo');
            const matchesListAntes = document.getElementById('matches-list-antes');

            // Verificar que las listas existan en el DOM antes de llenarlas
            if (type === 'next' && matchesListProx) {
                matchesListProx.innerHTML = '';
            } else if (type === 'last' && matchesListAntes) {
                matchesListAntes.innerHTML = '';
            }

            // Verificar si hay partidos disponibles
            if (matches.length === 0) {
                const noMatchesText = `<li>No hay ${type === 'next' ? 'próximos' : 'resultados'} partidos disponibles.</li>`;
                if (type === 'next' && matchesListProx) {
                    matchesListProx.innerHTML = noMatchesText;
                } else if (type === 'last' && matchesListAntes) {
                    matchesListAntes.innerHTML = noMatchesText;
                }
            } else {
                matches.forEach(match => {
                    if (type === 'next' && matchesListProx) {
                        const listItemProx = document.createElement('li');
                        listItemProx.textContent = `${match.teams.home.name} vs ${match.teams.away.name} - Fecha: ${new Date(match.fixture.date).toLocaleDateString()}`;
                        matchesListProx.appendChild(listItemProx);
                    } else if (type === 'last' && matchesListAntes) {
                        const listItemAntes = document.createElement('li');
                        const homeScore = match.goals.home;
                        const awayScore = match.goals.away;
                        listItemAntes.textContent = `${match.teams.home.name} ${homeScore} - ${awayScore} ${match.teams.away.name} - Fecha: ${new Date(match.fixture.date).toLocaleDateString()}`;
                        matchesListAntes.appendChild(listItemAntes);
                    }
                });
            }

            // Mostrar los contenedores de información si existen
            const matchInfoProx = document.getElementById('match-info-proximo');
            const matchInfoAntes = document.getElementById('match-info-antes');

            if (type === 'next' && matchInfoProx) matchInfoProx.classList.remove('hidden');
            if (type === 'last' && matchInfoAntes) matchInfoAntes.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    }

    //funcion BUSCAR PARTIDOS EN VIVO EN EL MUNDO 
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
            const liveMatches = data.response || [];
            const matchesList = document.getElementById('matches-list');
            console.log("Por aca voy")
            console.log(liveMatches)

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
                                    <div class="col-12 bg-dark text-white pt-2">
                                        <p class="card-text-partido">${match.teams.home.name} ${match.goals.home} - ${match.goals.away} ${match.teams.away.name}</p>
                                    </div>
                                </div>
                                <div class="row g-1">
                                    <div class="col-6 bg-secondary text-white border-end border-white pt-3">
                                        <p class="text-tiempo-liga me-2 small">${tiempoPartido} minutos</p>
                                    </div>
                                    <div class="col-6 bg-secondary text-white pt-3">
                                        <p class="text-tiempo-liga small">${match.league.name}</p>
                                    </div>
                                </div>
                            </div>
                        `;

                        matchesList.appendChild(listItem);
                    });
                } else {
                    const noMatchesItem = document.createElement('li');
                    noMatchesItem.textContent = "No hay partidos en vivo en esta liga.";
                    matchesList.appendChild(noMatchesItem);
                }
            }
        })
        .catch(error => console.error('Error al obtener los partidos en vivo:', error));
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

    function ligas(leagueId) {

        fetch("https://v3.football.api-sports.io/leagues", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx"
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    
    

});
