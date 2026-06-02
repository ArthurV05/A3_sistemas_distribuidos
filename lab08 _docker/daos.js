const db = require("../db").db;
const jogo = require("../models/Jogos");

class JogoDAO {
    static findAll(categoria, callback) {
        let query = "SELECT * FROM Jogos";

        //Verificando se foi passado um parâmetro de busca
        if(categoria) {
            query += " WHERE categoria LIKE '%" + categoria + "%'";
        }

        db.all(query, [], (err, rows) => {
            if (err) return callback(err, null);
            const jogos = rows.map(row  => new jogo(row.id, row.nome, row.categoria, row.ano, row.fk_empresa));
            callback(null, jogos);
        });

    }

    static findById(id, callback) {
        const query = "SELECT * FROM jogos WHERE id = ?";
        db.get(query,[id], (err, row) => {
            if (err) return callback(err, null);
            if (!row) return callback(null, null);
            callback(null, new jogo(row.id, row.nome, row.categoria, row.ano, row.fk_empresa));
        });
    }

    static create(nome, categoria, ano, fk_empresa, callback) {
        const query = "INSERT INTO jogos (nome, categoria, ano, fk_empresa) VALUES (?, ?, ?, ?)";
        db.run(query, [nome, categoria, ano, fk_empresa], function (err){
            if (err) return callback(err, null);
            callback(null, this.lastID);
        });
    }

    static update(id, nome, categoria, ano, fk_empresa, callback){
        const query = "UPDATE jogos set nome = ?, categoria = ?, ano = ? WHERE id = ?";
        db.run(query, [nome, categoria, ano, id], function (err){
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }

    static delete (id, callback){
        const query = "DELETE FROM jogos where id = ?";
        db.run(query, [id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0)
        })
    }
}
module.exports = JogoDAO;

const db = require("../db").db;
const Empresa = require("../models/Empresa");

class EmpresaDAO{
    static findAll(nome, callback) {
        const query = "SELECT * FROM empresa";
        
        //Verificando se foi passado um parâmetro de busca
        if (nome) {
            query += " WHERE nome LIKE '%" + nome + "%'";
        }

        db.all(query, [], (err, rows) => {
            if (err) return callback(err, null);
            const empresas = rows.map(row => new Empresa(row.id, row.nome));
            callback(null, empresas);
        });
    }

    static findById(id, callback) {
        const query = "SELECT * FROM empresa WHERE id = ?";
        db.get(query, [id], (err, row) => {
            if (err) return callback(err, null);
            if (!row) return callback(null, null);
            callback(null, new Empresa(row.id, row.nome));
        });
    }

    static create(nome, callback) {
        const query = "INSERT INTO empresa (nome) VALUES (?)";
        db.run(query, [nome], function (err) {
            if (err) return callback(err, null);
            callback(null, this.lastID);
        });
    }

    static update(id, nome, callback) {
        const query = "UPDATE empresa set nome = ? WHERE id = ?";
        db.run(query, [nome, id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }

    static delete(id, callback) {
        const query = "DELETE FROM empresa where id = ?";
        db.run(query, [id], function (err) {
            if (err) return callback (err);
            callback(null, this.changes > 0);
        });
    }

    
}

module.exports = EmpresaDAO;