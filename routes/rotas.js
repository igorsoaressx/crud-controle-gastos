const { Router } = require('express');
const { rotasCategorias } = require('./rotasCategorias');
const { rotasTransacoes } = require('./rotasTransacoes');
const { rotasMetas } = require('./rotasMetas'); 

const rotas = new Router();

rotas.use(rotasCategorias);
rotas.use(rotasTransacoes);
rotas.use(rotasMetas); 

module.exports = rotas;