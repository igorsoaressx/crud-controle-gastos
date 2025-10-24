const { Router } = require('express');


const { getCategorias, addCategoria, updateCategoria, deleteCategoria, getCategoriaPorId } = require('../controllers/categoriaController');

const rotasCategorias = new Router();

// Rota principal /categoria
rotasCategorias.route('/categoria')
   .get(getCategorias)    
   .post(addCategoria)   
   .put(updateCategoria);   

// Rota para um item específico por ID
rotasCategorias.route('/categoria/:id') 
   .get(getCategoriaPorId)      
   .delete(deleteCategoria);   

module.exports = { rotasCategorias };