const express = require('express');
const db = require('./db').db; //Importa a instância do banco de dados

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

//Realiza um parse do body para uma estrutura do JSON
app.use(express.json());

app.listen(APP_PORT, () => {
    console.log(`API de jogo em execução na porta ${APP_PORT}`);
    console.log(`Acesse a url http://localhost:${APP_PORT}`);
});

app.get('/', (req,res) => res.send('API Version 1.1.0 on-line!'));

app.get('/jogos', (req, res) => {
    let query = 'SELECT * FROM jogos';
    //Verifica se foi passada um parâmetro de categoria
    if (req.query.categoria) {
        query += "WHERE categoria LIKE '%" + req.query.categoria + "%'";
    }

    db.all(query, [], (err, jogos) => {
        if (err) return res.status(500).json({ error: err.message });
        res.send(jogos);
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
    const {nome, categoria, ano} = req.body;
    if (!nome && !categoria && !ano) {
        return res.status(400).json({ error: 'Campos nome, categoria e ano são obrigatórios.'});
    }

    db.run("INSERT INTO jogos (nome, categoria, ano) VALUES (?, ?, ?)",
        [nome, categoria, ano], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, nome});
    });
});

//Realiza um parse do body para uma estrutura do JSON
app.use(express.json());

app.put('/jogos/:id', (req,res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);
    let novoValor = req.body;

    let jogo = jogos.find(jogo =>{
        if(jogo.id == req.params.id){
            jogo.nome = novoValor.nome;
            jogo.categoria = novoValor.categoria;
            jogo.ano = novoValor.ano;
            fs.writeFileSync(arquivo, JSON.stringify(jogos));
            return jogo;
        }
    });
    if (jogo){
        res.send(jogo);
    } else {
        res.status(404).send('jogo não encontrado. ');
    }
});

app.delete('/jogos/:id', (req,res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);

    //Verifica se algum jogo foi removido
    if (!jogos.find(jogo => jogo.id == req.params.id)) {
        return res.status(404).send('jogo não encontrado. ')
    };
    //Filtra o array para remover o jogo com id especificado
    let jogosAtualizados = jogos.filter(jogo => jogo.id != req.params.id);

    //Escreve o array atualizado de volta no arquivo
    fs.writeFileSync(arquivo, JSON.stringify(jogosAtualizados));
    res.send('jogo removido com sucesso. ');
    
});

