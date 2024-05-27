const express = require('express');
const path = require('path'); // Módulo para manipulação de caminhos de arquivo
const pool = require('./lib/db'); // Importe o módulo pool de db.js

const app = express();
const port = 3000;

app.use(express.json());

// Rota para lidar com as solicitações POST para enviar respostas do questionário para o banco de dados
app.post('/enviarResposta', async (req, res) => {
    try {
        const { questao_id, resposta } = req.body;

        const query = `
            INSERT INTO respostas (questao_id, resposta)
            VALUES ($1, $2)
        `;
        await pool.query(query, [questao_id, resposta]);

        res.status(200).json({ message: 'Resposta do questionário armazenada com sucesso no banco de dados' });
    } catch (error) {
        console.error('Erro ao armazenar resposta do questionário no banco de dados:', error);
        res.status(500).json({ error: 'Erro ao armazenar resposta do questionário no banco de dados' });
    }
});

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
