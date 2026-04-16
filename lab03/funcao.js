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
console.log("O resultado da soma é: " + resultado);

