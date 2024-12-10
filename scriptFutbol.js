function fetchMatches(type, leagueId) {
    const apiKey = 'f842652436381d80af379e36d891f6d1';
    const number = 10; // Número de partidos a obtener
    const url = `https://v3.football.api-sports.io/fixtures?league=128&season=2022`;

    fetch(url, {
        method: 'GET',
        headers: {
            'x-apisports-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta completa:', data);
        console.log(`${type === 'next' ? 'Próximos' : 'Anteriores'} partidos:`, data.response);

        const matchesList = document.getElementById(
            type === 'next' ? 'matches-list-proximo' : 'matches-list-antes'
        );

        if (matchesList) {
            matchesList.innerHTML = ''; // Limpia la lista previa
            if (data.response.length === 0) {
                matchesList.innerHTML = `<li>No hay partidos disponibles.</li>`;
            } else {
                data.response.forEach(match => {
                    const listItem = document.createElement('li');
                    const fecha = new Date(match.fixture.date).toLocaleString();
                    if (type === 'next') {
                        listItem.textContent = `${match.teams.home.name} vs ${match.teams.away.name} - Fecha: ${fecha}`;
                    } else {
                        const homeScore = match.goals.home;
                        const awayScore = match.goals.away;
                        listItem.textContent = `${match.teams.home.name} ${homeScore} - ${awayScore} ${match.teams.away.name} - Fecha: ${fecha}`;
                    }
                    matchesList.appendChild(listItem);
                });
            }
        }
    })
    .catch(error => console.error('Error al obtener los partidos:', error));
}

// Llamadas para próximos y anteriores
fetchMatches('next', 128); // Liga Profesional Argentina - próximos
//fetchMatches('last', 128); // Liga Profesional Argentina - anteriores
