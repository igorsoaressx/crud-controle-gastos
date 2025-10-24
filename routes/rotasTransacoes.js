const { Router } = require('express');
const { getTransacoes, addTransacao, updateTransacao, deleteTransacao, getTransacaoPorId } = require('../controllers/transacaoController');

const rotasTransacoes = new Router();

rotasTransacoes.route('/transacao')
   .get(getTransacoes)
   .post(addTransacao)
   .put(updateTransacao);

rotasTransacoes.route('/transacao/:id')
   .get(getTransacaoPorId)
   .delete(deleteTransacao);

module.exports = { rotasTransacoes };