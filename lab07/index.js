const express = require('express');
const JogoDAO = require('./daos/jogoDAO');
const EmpresaDAO = require('./daos/empresaDAO');
//const db = require('./db').db; //Importa a instância do banco de dados

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

//Realiza um parse do body para uma estrutura do JSON
app.use(express.json());

app.listen(APP_PORT, () => {
    console.log(`API de jogo em execução na porta ${APP_PORT}`);
    console.log(`Acesse a url http://localhost:${APP_PORT}`);
});

app.get('/jogos', (req,res) => {
    JogoDAO.findAll(req.query.categoria, (err, jogos) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(jogos);
    });
});

app.get('/jogos/:id', (req, res) => {

    const id = req.params.id;
    JogoDAO.findById(id, (err, jogos) => {
        if (err) return res.status(500).json({ error: err.message });
        if (jogo) {
            res.json(jogo);
        } else {
            res.status(404).send('Jogo não encontrado. ');
        }
    });
});

app.get('/jogos/:id', (req, res) => {
    let query = 'SELECT * FROM jogos WHERE id = ?';
    db.get(query, [req.params.id], (err, jogo) => {
        if (err) return res.status(500).json({ error: err.message });
        if (jogo) {
            res.send(jogo);
        } else {
            res.status(404).send('Jogo não encontrado. ');
        }
    });
});

//rotas

app.post('/jogos', (req,res) => {
    const {nome, categoria, ano, fkEmpresa} = req.body;
    if (!nome && !categoria && !ano && !fkEmpresa) return res.status(400)
        .json({ error: "Campos nome, categoria e ano são obrigatórios."});
    jogoDAO.create(nome, categoria, ano, fkEmpresa, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, nome, categoria, ano, fkEmpresa });
    });
});

//Realiza um parse do body para uma estrutura do JSON
app.use(express.json());

app.put('/jogos/:id', (req,res) => {
    const {nome, categoria, ano } = req.body;
    const id = req.params.id;

    jogoDAO.update(id, nome, categoria, ano, (err, jogo) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!jogo) return res.status(404).send('Jogo não encontrado. ');
        res.json(jogo);
    });
});

app.delete('/jogos/:id', (req,res) => {
    const id = req.params.id;

    jogoDAO.delete(id, (err, jogo) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!jogo) return res.status(404).send('Jogo não encontrado. ');
        res.json(jogo);
    });
});

