const express = require('express');
const JogoController = require('./controllers/JogoController');
const EmpresaController = require('./controllers/EmpresaController');

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

//Realiza um parse do body para uma estrutura do JSON
app.use(express.json());


app.get('/', (req, res) => res.send('API Version 1.2.0 on-line!'))


app.get('/jogos', JogoController.index);
app.get('/jogos/:id', JogoController.show);
app.post('/jogos', JogoController.create);
app.put('/jogos/:id', JogoController.update);
app.delete('/jogos/:id', JogoController.delete);

app.get('/empresas', EmpresaController.index);
app.get('/empresas/:id', EmpresaController.show);
app.post('/empresas', EmpresaController.create);
app.put('/empresas/:id', EmpresaController.update);
app.delete('/empresas/:id', EmpresaController.delete);

console.log(`Servidor rodando na porta ${APP_PORT}`);

app.listen(APP_PORT);