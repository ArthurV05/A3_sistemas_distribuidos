const db = require("../db").db;
const Jogo = require("../models/Jogo");

class JogoDAO {
    static findAll(categoria, callback) {
        let query = "SELECT * FROM Jogo";

        //Verificando se foi passado um parâmetro de busca
        if(categoria) {
            query += " WHERE categoria LIKE '%" + categoria + "%'";
        }

        db.all(query, [], (err, rows) => {
            if (err) return callback(err, null);
            const jogos = rows.map(row  => new Jogo(row.id, row.nome, row.categoria, row.ano, row.fk_empresa));
            callback(null, jogos);
        });

    }

    static findById(id, callback) {
        const query = "SELECT * FROM Jogo WHERE id = ?";
        db.get(query,[id], (err, row) => {
            if (err) return callback(err, null);
            if (!row) return callback(null, null);
            callback(null, new Jogo(row.id, row.nome, row.categoria, row.ano, row.fk_empresa));
        });
    }

    static create(nome, categoria, ano, fk_empresa, callback) {
        const query = "INSERT INTO Jogo (nome, categoria, ano, fk_empresa) VALUES (?, ?, ?, ?)";
        db.run(query, [nome, categoria, ano, fk_empresa], function (err){
            if (err) return callback(err, null);
            callback(null, this.lastID);
        });
    }

    static update(id, nome, categoria, ano, fk_empresa, callback){
        const query = "UPDATE Jogo set nome = ?, categoria = ?, ano = ?, fk_empresa = ? WHERE id = ?";
        db.run(query, [nome, categoria, ano, fk_empresa, id], function (err){
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }

    static delete (id, callback){
        const query = "DELETE FROM Jogo where id = ?";
        db.run(query, [id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0)
        })
    }
}
module.exports = JogoDAO;