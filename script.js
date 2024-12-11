// Definicion de la clave API en el ámbito global
const apiKey = 'f842652436381d80af379e36d891f6d1';

document.addEventListener('DOMContentLoaded', function() {
    
    // Ejecutar funciones para cargar los datos al iniciar la página
    searchVivo();
    proxPartidos()
    status()
    
    const actualizarBtn = document.getElementById('actualizar-partidos-btn');
    if (actualizarBtn) {
        actualizarBtn.addEventListener('click', function() {
            searchVivo();  // Actualizar los partidos en vivo
        });
    }

    //funcion BUSCAR PARTIDOS EN VIVO EN EL MUNDO `https://v3.football.api-sports.io/fixtures?live=all` 
    function searchVivo() {
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

    //funcion BUSCAR proximos PARTIDOS Argentina 
    function proxPartidos() {
        const countryName = "Argentina"
        const cantidad = 10
        const league_id=128
        const fixturesUrl = 'https://v3.football.api-sports.io/fixtures?league=128&season=2022&';

        fetch(`${fixturesUrl}`, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const matches = data.response
            //.filter(match => match.league.country === 'Argentina');
            const proxMatches = matches || [];
            const proxMatchesList = document.getElementById('proxMatches-list');
            console.log("Datos disponibles: ", data)          

           /* if (proxMatchesList) {
                proxMatchesList.innerHTML = ''; // Limpiar la lista de partidos anteriores

                let fechaAgregada = false;  // Control para agregar la fecha solo una vez

                if (proxMatches.length > 0) {
                    proxMatches.forEach(match => {

                        const matchDate = new Date(match.fixture.date);
                       const formattedDate = `${matchDate.getDate().toString().padStart(2, '0')}/${(matchDate.getMonth() + 1).toString().padStart(2, '0')}/${matchDate.getFullYear()}`;
                        
                        const listItem = document.createElement('li');
                        listItem.classList.add('proxPartidos');

                        listItem.innerHTML = `
                            <div class="card-body text-center">
                                <div class="row g-1 border-bottom border-white">
                                    <div class="col-12 bg-dark text-white pt-2">
                                        <p class="text-tiempo-liga small">${match.league.name}</p>    
                                        <p class="card-text-partido">${formattedDate} |${match.teams.home.name} - ${match.teams.away.name}</p>
                                    </div>
                                </div>
                            </div>
                        `;

                        proxMatchesList.appendChild(listItem);
                    }
                    }); 
                } else {
                    const noMatchesItem = document.createElement('li');
                    noMatchesItem.textContent = "No hay partidos en la liga.";
                    matchesList.appendChild(noMatchesItem);
                }
            }*/
        })
        .catch(error => console.error('Error al obtener los partidos:', error));
    }

        //funcion BUSCAR proximos PARTIDOS Argentina 
        function status() {
            const countryName = "Argentina"
            const cantidad = 10
            const league_id=128
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
