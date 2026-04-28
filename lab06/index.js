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




// app.get('/', (req, res) => res.send('Servidor rodando, tudo ok!') )


// app.get('/jogos', (req,res) => {
//     let jogos = [
//         {nome: 'The Legend of Zelda: Breath of the Wild', plataforma: 'Nintendo Switch'},
//         {nome: 'God of War', plataforma: 'PlayStation 4'},
//         {nome: 'Red Dead Redemption 2', plataforma: 'PlayStation 4, Xbox One, PC'},
//     ];
//     res.send(jogos);
// }); 