
const { getTransacoesDB, addTransacaoDB, updateTransacaoDB, deleteTransacaoDB, getTransacaoPorCodigoDB } = require('../usecases/transacaoUseCases');

//GET
const getTransacoes = async (request, response) => {
    await getTransacoesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as transações: ' + err
        }));
}

//POST
const addTransacao = async (request, response) => {
    await addTransacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Transação criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

//PULL
const updateTransacao = async (request, response) => {
    await updateTransacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Transação alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

//DELETE
const deleteTransacao = async (request, response) => {
    await deleteTransacaoDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

//GET ID
const getTransacaoPorId = async (request, response) => {
    await getTransacaoPorCodigoDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getTransacoes, 
   addTransacao, 
   updateTransacao, 
   deleteTransacao, 
   getTransacaoPorId
}