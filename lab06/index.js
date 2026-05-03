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

app.get('/jogos/:id', (req,res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);
    let jogo = jogos.find(j => j.id == req.params.id);

    if (jogo) {
        res.send(jogo);
    } else {
        res.status(404).send('jogo não encontrado. ');
    }
});

//rotas

app.post('/jogos', (req,res) => {
    let data = fs.readFileSync()
    let jogos = JSON.parse(data);
    let novoJogo = req.body;

    novoJogo.id = jogos.legth + 1;
    jogos.push(novoJogo);

    fs.writeFileSync(arquivo, JSON.stringify(jogos));
    res.status(201).send(novoJogo);

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

