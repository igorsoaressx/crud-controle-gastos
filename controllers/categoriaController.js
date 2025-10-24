

// funções do useCase
const { getCategoriasDB, addCategoriaDB, updateCategoriaDB, deleteCategoriaDB, getCategoriaPorCodigoDB } = require('../usecases/categoriaUseCases');

//GET (Listar todas)
const getCategorias = async (request, response) => {
    await getCategoriasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as categorias: ' + err
        }));
};

//POST (Create)
const addCategoria = async (request, response) => {
    await addCategoriaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Categoria criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

//PUT (Update)
const updateCategoria = async (request, response) => {
    await updateCategoriaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Categoria alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

//DELETE
const deleteCategoria = async (request, response) => {
    await deleteCategoriaDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

//GET por ID
const getCategoriaPorId = async (request, response) => {
    await getCategoriaPorCodigoDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

//EXPORTS 
module.exports = {
   getCategorias, 
   addCategoria, 
   updateCategoria, 
   deleteCategoria, 
   getCategoriaPorId
}