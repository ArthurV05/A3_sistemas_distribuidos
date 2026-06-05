const sqlite3 = require("sqlite3").verbose();
require('dotenv').config();

class Database {
    _createTable() {

        //Criação da tabela empresa
        const tbEmpresa = `
            CREATE TABLE IF NOT EXISTS Empresa (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE
                );
            `;
        this.db.run(tbEmpresa, (err) => {
            if (err) console.error("Erro ao criar tabela: ", err.message);
            else {
                console.log("Tabela 'empresas' verificada/criada");
                this._seed();
            }
        });

        //Criação da tabela Jogo

        const tbJogo = `
            CREATE TABLE IF NOT EXISTS Jogo (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                categoria TEXT NOT NULL,
                ano INTEGER NOT NULL,
                fk_empresa INTEGER NOT NULL,
                FOREIGN KEY (fk_empresa) REFERENCES Empresa(id)
            );
        `;

        this.db.run(tbJogo, (err) => {
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

    _seed() {
        const query = "INSERT OR IGNORE INTO Empresa (nome) VALUES (?)";
        this.db.run(query, ["Nintendo"], (err) => {
            if (err) console.error("Erro ao criar empresa: ", err.message);
            else console.log("Empresa criada.");
        });
        this.db.run(query, ["Ubisoft"], (err) => {
            if (err) console.error("Erro ao criar empresa: ", err.message);
            else console.log("Empresa criada.");
        });
        this.db.run(query, ["EA"], (err) => {
            if (err) console.error("Erro ao criar empresa: ", err.message);
            else console.log("Empresa criada.");
        });
        this.db.run(query, ["Bethesda"], (err) =>{
            if (err) console.error("Erro ao criar empresa: ", err.message);
            else console.log("Empresa criada.");
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

module.exports = {
    db: new Database().db
}