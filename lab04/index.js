const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log ('Server is running on port 30000');
    console.log ('Acesse a url http://localhost:3000');
});

app.get('/', (req, res) => res.send('Servidor rodando, tudo ok!') )


app.get('/jogos', (req,res) => {
    let jogos = [
        {nome: 'The Legend of Zelda: Breath of the Wild', plataforma: 'Nintendo Switch'},
        {nome: 'God of War', plataforma: 'PlayStation 4'},
        {nome: 'Red Dead Redemption 2', plataforma: 'PlayStation 4, Xbox One, PC'},
    ];
    res.send(jogos);
});