class Jogo {

    constructor(id, nome, categoria, ano, fk_empresa) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.ano = ano;
        this.fk_empresa = fk_empresa;
    }

}

module.exports = Jogo;