let estrelaSelecionada = null;

function selecionarEstrela(idEstrela) {
    estrelaSelecionada = idEstrela;
    const allStars = document.querySelectorAll('.star-icon');
    let found = false;
    allStars.forEach(star => {
        if (star.id === idEstrela) {
            star.classList.add('cheia');
            found = true;
        } else if (!found) {
            star.classList.add('cheia');
        } else {
            star.classList.remove('cheia');
        }
    });
}

function enviarResposta(idQuestao, proximaPagina) {
    if (estrelaSelecionada) {
        const respostaSelecionada = document.getElementById(estrelaSelecionada).dataset.avaliacao;
        fetch('/enviarResposta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questao_id: idQuestao, resposta: parseInt(respostaSelecionada) })
        })
        .then(response => {
            if (response.ok) {
                console.log('Resposta do questionário enviada com sucesso para o servidor');
                window.location.href = proximaPagina;
            } else {
                console.error('Erro ao enviar resposta do questionário para o servidor');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar resposta do questionário para o servidor:', error);
        });
    } else {
        console.log('Nenhuma resposta selecionada');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const enviarButton = document.querySelector('.button');
    enviarButton.addEventListener('click', function() {
        const idQuestao = parseInt(this.getAttribute('data-questao-id'));
        const proximaPagina = this.getAttribute('data-proxima-pagina');
        enviarResposta(idQuestao, proximaPagina);
    });
});
