const { prototype } = require('../daos');
const JogoDAO = require('../daos/JogoDAO');

class JogoController {

    index(req, res) {
        JogoDAO.findAll(req.query.categoria, (err, jogos) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(jogos);
        });
    }

    show(req, res) {
        const id = req.params.id;

        JogoDAO.findbyId(id, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });
            if (jogo) {
                res.json(jogo);
            } else {
                return res.status(404).json({ error: "Jogo não encontrado." })
            }
        });
    }

    create(req, res) {
        const { nome, categoria, ano, fkempresa } = req.body;
        if (!nome && !categoria && !ano && !fkempresa) return res.status(404)
            .json({ error: "Campos nome, categoria e ano são obrigatórios." });

        JogoDAO.create(nome, categoria, ano, fkempresa, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(jogo);
        });
    }

    update(req, res) {
        const { nome, categoria, ano, fkempresa } = req.body;
        const id = req.params.id;

        JogoDAO.update(id, nome, categoria, ano, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!jogo) return res.status(404).json({ error: "Jogo não encontrado." });
            res.json({ message: "Jogo editado com sucesso." });
        });
    }

    delete(req, res) {
        const id = req.params.id;

        JogoDAO.delete(id, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!jogo) return res.status(404).json({ error: "Jogo não encontrado." });
            res.json({ message: "Jogo removido com sucesso." });
        });
    }
};

module.exports = new JogoController