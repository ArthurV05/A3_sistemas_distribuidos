const db = require("../db").db;
const Empresa = require("../models/Empresa");

class EmpresaDAO{
    static findAll(nome, callback) {
        let query = "SELECT * FROM Empresa";
        
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
        const query = "SELECT * FROM Empresa WHERE id = ?";
        db.get(query, [id], (err, row) => {
            if (err) return callback(err, null);
            if (!row) return callback(null, null);
            callback(null, new Empresa(row.id, row.nome));
        });
    }

    static create(nome, callback) {
        const query = "INSERT INTO Empresa (nome) VALUES (?)";
        db.run(query, [nome], function (err) {
            if (err) return callback(err, null);
            callback(null, this.lastID);
        });
    }

    static update(id, nome, callback) {
        const query = "UPDATE Empresa set nome = ? WHERE id = ?";
        db.run(query, [nome, id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }

    static delete(id, callback) {
        const query = "DELETE FROM Empresa where id = ?";
        db.run(query, [id], function (err) {
            if (err) return callback (err);
            callback(null, this.changes > 0);
        });
    }

    
}

module.exports = EmpresaDAO;