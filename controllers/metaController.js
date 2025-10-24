
const { getMetasDB, addMetaDB, updateMetaDB, deleteMetaDB, getMetaPorCodigoDB } = require('../usecases/metaUseCases');

//GET
const getMetas = async (request, response) => {
    await getMetasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as metas: ' + err
        }));
}

//POST
const addMeta = async (request, response) => {
    await addMetaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Meta criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

//PUT
const updateMeta = async (request, response) => {
    await updateMetaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Meta alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

//DELETE
const deleteMeta = async (request, response) => {
    await deleteMetaDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

//GET ID
const getMetaPorId = async (request, response) => {
    await getMetaPorCodigoDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getMetas, 
   addMeta, 
   updateMeta, 
   deleteMeta, 
   getMetaPorId
}