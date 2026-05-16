class Jogos {
    constructor(id, nome, categoria, ano, fkempresa) {
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.ano = ano;
    this.fkempresa = fkempresa;
    }
}
module.exports = jogos;

class Empresa{
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}
module.exports = empresa;