// Definir la clave API en el ámbito global
const apiKey = 'f842652436381d80af379e36d891f6d1';

document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar el contenido del encabezado
    // Verificar si el botón 'search-upcoming-btn' existe
    const upcomingBtn = document.getElementById('search-upcoming-btn');
    if (upcomingBtn) {
        upcomingBtn.addEventListener('click', function() {
            searchMatches('next');
        });
    }

    // Verificar si el botón 'search-results-btn' existe
    const resultsBtn = document.getElementById('search-results-btn');
    if (resultsBtn) {
        resultsBtn.addEventListener('click', function() {
            searchMatches('last');
        });
    }

    // Verificar si el botón 'search-vivo-btn' existe
    const vivoBtn = document.getElementById('search-vivo-btn');
    if (vivoBtn) {
        vivoBtn.addEventListener('click', function() {
            searchVivo('next');
        });
    }

    function loadHeader() {
        fetch('Encabezado.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data;
            })
            .catch(error => console.log('Error cargando el encabezado:', error));
    }

    // Función para cargar el contenido del pie de página
    function loadFooter() {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            })
            .catch(error => console.log('Error cargando el pie de página:', error));
    }

    // Llamar a las funciones para cargar header y footer
    loadHeader();
    loadFooter();

    // Botones de búsqueda (API Fútbol)
    document.getElementById('search-upcoming-btn').addEventListener('click', function() {
        searchMatches('next');
    });
    document.getElementById('search-results-btn').addEventListener('click', function() {
        searchMatches('last');
    });
    document.getElementById('search-vivo-btn').addEventListener('click', function() {
        searchVivo();
    });

    // Funciones de búsqueda
    function searchMatches(type) {
        const teamSearchUrl = 'https://v3.football.api-sports.io/teams?search=';
        const fixturesUrl = 'https://v3.football.api-sports.io/fixtures';
        const country = 'Argentina'; // País deseado
                  
        fetch(`${fixturesUrl}?league=128&${type}=14`, {
                method: 'GET',
                headers: {
                    'x-apisports-key': apiKey
                }
            })
        .then(response => response.json())
        .then(data => {
            console.log('Partidos Liga:', data.response);
            const matches = data.response;
            const matchesList = document.getElementById('matches-list');
            matchesList.innerHTML = '';
            const matchesListAntes = document.getElementById('matches-list-antes');
            matchesListAntes.innerHTML = '';

            if (matches.length === 0) {
                matchesList.innerHTML = `<li>No hay ${type === 'next' ? 'próximos' : 'resultados'} partidos disponibles para este equipo.</li>`;
            } else {
                matches.forEach(match => {
                    const listItem = document.createElement('li');
                    const listItemAntes = document.createElement('li');
                    if (type === 'next') {
                        listItem.textContent = `${match.teams.home.name} vs ${match.teams.away.name} - Fecha: ${new Date(match.fixture.date).toLocaleDateString()}`;
                    } else {
                        const homeScore = match.goals.home;
                        const awayScore = match.goals.away;
                        listItemAntes.textContent = `${match.teams.home.name} ${homeScore} - ${awayScore} ${match.teams.away.name} - Fecha: ${new Date(match.fixture.date).toLocaleDateString()}`;
                    }
                    matchesList.appendChild(listItem);
                    matchesListAntes.appendChild(listItemAntes);
                });
            }
            document.getElementById('match-info').classList.remove('hidden');
            document.getElementById('match-info-antes').classList.remove('hidden');
        })
        .catch(error => {
            alert(error.message);
        });
    }

    function searchVivo() {
        const liveFixturesUrl = `https://v3.football.api-sports.io/fixtures?live=all`;
    
        fetch(liveFixturesUrl, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
    
            const liveMatches = data.response || []; // Usa un array vacío si no hay respuesta
            const matchesListVivo = document.getElementById('matches-list');
            matchesListVivo.innerHTML = '';  // Limpiar la lista de partidos anteriores

            console.log('Respuesta de la API:', liveMatches);
    
            if (liveMatches.length > 0) {
                liveMatches.forEach(match => {
                    console.log(`En Vivo: ${match.teams.home.name} ${match.goals.home} - ${match.goals.away} ${match.teams.away.name}`);
    
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item'); // Agregar la clase CSS
                    
                    // Convertir la fecha del partido a un formato legible
                    const matchDate = new Date(match.fixture.date);
                    const formattedDate = `${matchDate.getDate().toString().padStart(2, '0')}/${(matchDate.getMonth() + 1).toString().padStart(2, '0')}/${matchDate.getFullYear()} ${matchDate.getHours().toString().padStart(2, '0')}:${matchDate.getMinutes().toString().padStart(2, '0')}`;
    
                    // Crear el contenido de cada partido con liga, fecha y hora
                    listItem.innerHTML = `
                        <p>${match.teams.home.name} ${match.goals.home} - ${match.goals.away} ${match.teams.away.name}</p>
                        <p><strong>Liga:</strong> ${match.league.name}</p>
                        <p><strong>Fecha y Hora:</strong> ${formattedDate}</p>
                    `;
                    matchesListVivo.appendChild(listItem);
                });
            } else {
                const noMatchesItem = document.createElement('li');
                noMatchesItem.textContent = "No hay partidos en vivo en esta liga.";
                matchesListVivo.appendChild(noMatchesItem);
            }
        })
        .catch(error => console.error('Error al obtener los partidos en vivo:', error));
    }
    
    function tablaPos(leagueId) {
        const standingsUrl = `https://v3.football.api-sports.io/standings?league=128&season=2024`;  // La Liga (ID: 140), Temporada 2023

        fetch(standingsUrl, {
            method: 'GET',
            headers: {
                'x-apisports-key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const standings = data.response[0].league.standings[0];
            standings.forEach(team => {
                console.log(`Posición: ${team.rank}, Equipo: ${team.team.name}, Puntos: ${team.points}`);
                // Aquí puedes renderizar los datos en tu HTML
            });
        })
        .catch(error => console.log(error));
    }
        
});
