function saudacao() {
    console.log("Função simples que exibe uma mensagem no console.");
}

saudacao(); //Função chamada, retornará a mensagme no console

function somar(a, b) {
    console.log("A soma é: " + (a + b));
}

somar(5, 10) //Função chamada, recebe dois valores e retorna a soma deles no console

function somarRetorno(a, b) {
    return a + b;
}

let resultado = somarRetorno(19, 1); 
console.log("O resultado da soma é: ", resultado);

let somarAnonimo = function(a, b){
    console.log("O resultado da função anônima é: ", a + b);
}

somarAnonimo(10, 20); //Função anônima

let somarArrow = (a, b) => a + b;

console.log("O retorno da arrow function é: ", somarArrow(15,35)); //Função arrow

let vetor= [10,20,30,40,50];

function exibirElemento(elemento, indice) {
    console.log(`Elemento no índice ${indice}: ${elemento}`);
};

function processarCallback(vetor, callback) {
    console.log("Processando callback dentro da função forEach");
    vetor.forEach(callback);
    
};

processarCallback(vetor, exibirElemento);

// Callback em arrow function
vetor.forEach((elemento, indice) => {
    console.log(`Arrow function exibindo elementos no índice ${indice}: ${elemento} `)
});