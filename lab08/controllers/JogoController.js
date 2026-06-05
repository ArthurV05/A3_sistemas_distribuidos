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

        JogoDAO.findById(id, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });

            if (jogo) {
                res.json(jogo);
            } else {
                return res.status(404).json({ error: "Jogo não encontrado." });
            }
        });
    }

    create(req, res) {
        const { nome, categoria, ano, fk_empresa } = req.body;

        if (!nome || !categoria || !ano || !fk_empresa) {
            return res.status(400).json({
                error: "Campos nome, categoria, ano e fk_empresa são obrigatórios."
            });
        }

        JogoDAO.create(nome, categoria, ano, fk_empresa, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json(jogo);
        });
    }

    update(req, res) {
        const { nome, categoria, ano, fk_empresa } = req.body;
        const id = req.params.id;

        JogoDAO.update(
            id,
            nome,
            categoria,
            ano,
            fk_empresa,
            (err, jogo) => {

                if (err) return res.status(500).json({ error: err.message });

                if (!jogo) {
                    return res.status(404).json({ error: "Jogo não encontrado." });
                }

                res.json({ message: "Jogo editado com sucesso." });
            }
        );
    }

    delete(req, res) {
        const id = req.params.id;

        JogoDAO.delete(id, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });

            if (!jogo) {
                return res.status(404).json({ error: "Jogo não encontrado." });
            }

            res.json({ message: "Jogo removido com sucesso." });
        });
    }
}

module.exports = new JogoController();