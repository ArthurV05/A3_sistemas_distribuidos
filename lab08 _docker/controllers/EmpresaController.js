const empresaDAO = require('..(daos/empresaDAO)');

class EmpresaController {
    index(req, res) {
        empresaDAO.findAll(req.query.categoria, (err, empresa) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(empresa);
        });
    }

    show(req, res) {
        const id = req.params.id;

        empresaDAO.findById(id, (err, empresa) => {
            if (err) return res.status(500).json({ error: err.message });
            if (empresa) {
                res.json(empresa);
            } else {
                return res.status(404).json({ error: "Empresa não encontrada." });
            }
        });
    }

    create(req, res) {
        const { nome } = req.body;
        if (!nome) return res.status(404)
            .json({ error: "Dados incompletos." });

        empresaDAO.create(nome, (err, empresa) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(empresa);
        });

    };

    update(req, res) {
        const { nome } = req.body;
        const id = req.params.id;

        empresaDAO.update(id, nome, (err, empresa) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!empresa) return res.status(404).json({ error: "Empresa não encontrada." });
            res.json({ message: "Empresa editada com sucesso." });
        });
    }

    delete (req, res) {
        const id = req.params.id;
        
        empresaDAO.delete(id, (err, empresa) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!empresa) return res.status(404).json({ error: "Empresa não encontrada." });    
            res.json({ message: "Empresa removida com sucesso." });
        });
    }
};

module.exports = new EmpresaController;