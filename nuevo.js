document.addEventListener('DOMContentLoaded', function() {
    // Llamar a la función searchMatches con 'next' para los próximos partidos
    searchMatches('next');
    // Llamar a la función searchMatches con 'last' para los resultados anteriores
    searchMatches('last');
});

// Función de búsqueda de partidos
function searchMatches(type) {
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
        const matchesListProx = document.getElementById('matches-list-proximo');
        const matchesListAntes = document.getElementById('matches-list-antes');

        // Limpiar listas de partidos anteriores
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
                if (type === 'next') {
                    const listItemProx = document.createElement('li');
                    listItemProx.textContent = `${match.teams.home.name} vs ${match.teams.away.name} - Fecha: ${new Date(match.fixture.date).toLocaleDateString()}`;
                    matchesListProx.appendChild(listItemProx);
                } else if (type === 'last') {
                    const listItemAntes = document.createElement('li');
                    const homeScore = match.goals.home;
                    const awayScore = match.goals.away;
                    listItemAntes.textContent = `${match.teams.home.name} ${homeScore} - ${awayScore} ${match.teams.away.name} - Fecha: ${new Date(match.fixture.date).toLocaleDateString()}`;
                    matchesListAntes.appendChild(listItemAntes);
                }
            });
        }

        // Mostrar contenedores de información
        if (type === 'next') {
            document.getElementById('match-info-proximo').classList.remove('hidden');
        } else if (type === 'last') {
            document.getElementById('match-info-antes').classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}
