const OrdemServico = require('../models/OrdemServico')

module.exports = class OrdemServicoController {
    static async create(req, res) {
        const { nome_cliente, nome_funcionario, servico, valor_servico, status } = req.body

        try {
            const ordemServico = await OrdemServico.create({
                nome_cliente: nome_cliente,
                nome_funcionario: nome_funcionario,
                servico: servico,
                valor_servico: valor_servico,
                status: status
            })
            return res.status(201).json({ message: 'Ordem de Serviço criada com sucesso', ordemServico })
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível criar a Ordem de Serviço' })
        }
    }

    static async listAll(req, res) {
        try {
            const ordensServico = await OrdemServico.findAll()
            return res.status(200).json({ ordensServico })
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível listar as Ordens de Serviço' })
        }
    }

    static async listById(req, res) {
        try {
            const ordemServico = await OrdemServico.findByPk(req.params.id)
            if (!ordemServico) {
                return res.status(404).json({ message: 'Ordem de Serviço não encontrada' })
            }
            return res.status(200).json({ ordemServico })
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível consultar a Ordem de Serviço' })
        }
    }

    static async remove(req, res) {
        try {
            const ordemServico = await OrdemServico.findByPk(req.params.id)
            if (!ordemServico) {
                return res.status(404).json({ message: 'Ordem de Serviço não encontrada' })
            }

            await ordemServico.destroy()
            return res.status(200).json({ message: 'Ordem de Serviço excluída com sucesso' })
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível excluir a Ordem de Serviço' })
        }
    }
}
