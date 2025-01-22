// Marca a fase como concluída
function markLevelComplete(level) {
    const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
    if (!completedLevels.includes(level)) {
        completedLevels.push(level);
        localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
    }
}

// Verifica quais fases foram concluídas
function getCompletedLevels() {
    return JSON.parse(localStorage.getItem('completedLevels')) || [];
}



function updateLevelImages() {
    const completedLevels = getCompletedLevels();

    completedLevels.forEach(level => {
        const levelImage = document.getElementById(`fase${level}`);
        if (levelImage) {
            // Alterando a imagem para indicar que a fase foi concluída
            levelImage.src = `assets/fase_concluida${level}_completed.png`;
        }
    });
}


markLevelComplete(1); // Por exemplo, o jogador completou a fase 1
