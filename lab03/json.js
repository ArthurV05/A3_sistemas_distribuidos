let pessoa = {
    nome: "Pedro Valente",
    idade: 20,
    altura: 1.73,
    cidade: "Camaçari",
    hobbies: ["futebol", "jogar", "estudar", "criar"]
};

console.log("Nome: ", pessoa.nome);
console.log("Idade: ", pessoa.idade);
console.log("Altura: ", pessoa.altura);
console.log("Cidade: ", pessoa.cidade);
console.log("Hobbies: ", pessoa.hobbies.join(", "));

//Convertendo o objeto para string
let pessoaString = JSON.stringify(pessoa);
console.log("String JSON: ", pessoaString);


let filmeStr = '{"titulo": "O Senhor dos Anéis", "diretor": "Peter Jackson", "ano": 2001, "genero": "Fantasia"}';
console.log("String Json: ", filmeStr);

//Convertendo a string para objeto
let filmeObj = JSON.parse(filmeStr);

console.log("Título: ", filmeObj.titulo);
console.log("Diretor: ", filmeObj.diretor);
console.log("Ano: ", filmeObj.ano);
console.log("Gênero: ", filmeObj.genero);


