const express = require('express');
const fs = require('fs');

const app = express();
const arquivo = 'jogos.db';

app.listen(3000, () => {
    console.log('API de jogo em execução na porta 3000');
    console.log('Acesse a url http://localhost:3000');


    fs.access(arquivo, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('${arquivo} não encontrado. Criando arquivo...');
            let jogosIniciais = [
                { id: 1, nome: "Super Mario Wolrd", ano: 1990, categoria: "Plataforma" },
                { id: 2, nome: "The Legend of Zelda: Ocarina of Time", ano: 1998, categoria: "Ação/Aventura" },
                { id: 3, nome: "Minecraft", ano: 2011, categoria: "Sandbox" },
                { id: 4, nome: "The Witcher 3: Wild Hunt", ano: 2015, categoria: "RPG" },
                { id: 5, nome: "Red Dead Redemption 2", ano: 2018, categoria: "Ação/Aventura" },
                { id: 6, nome: "God of War", ano: 2018, categoria: "Ação/Aventura" }
            ];
            fs.writeFileSync(arquivo, JSON.stringify(jogosIniciais, null, 2));
        }
    });
});

app.get('/jogos', (req,res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);

    // Verificando se foi passado um parâmetro de busca
    if (req.query.nome) {
        jogos = jogos.filter(jogo => jogo.nome.toLowerCase().includes(req.query.nome.toLowerCase()));
    }
    res.send(jogos);
});

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

