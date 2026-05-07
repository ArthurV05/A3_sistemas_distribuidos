const sqlite3 = require("sqlite3").verbose();
require('dotenv').config();

class Database {
    _createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS jogos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                categoria TEXT NOT NULL,
                ano INTEGER NOT NULL
            );
        `;
        this.db.run(query, (err) => {
            if (err) console.error("Erro ao criar tabela: ", err.message);
            else console.log("Tabela 'jogos' verificada/criada");
        });
    }

    _connect() {
        this.db = new sqlite3.Database(process.env.DB_NAME, (err) => {
            if (err) console.error("Erro ao conectar ao banco de dados: ", err.message);
            else {
                console.log("Conexão com o banco de dados estabelecida ");
                this._createTable();
            }
        });
    }

    constructor() {
        if (!Database.instance) {
            this._connect();
            Database.instance = this;
        }
        return Database.instance;
    }

}

module.exports = new Database();