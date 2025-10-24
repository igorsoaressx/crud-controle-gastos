
const { pool } = require('../config');
const Transacao = require('../entities/transacao');

//GET
const getTransacoesDB = async () => {
    try {    
        const { rows } = await pool.query(`
            SELECT t.*, c.nome as categoria_nome 
            FROM transacoes t
            JOIN categorias c ON t.categoria_id = c.id
            ORDER BY t.data DESC`);
        
        return rows.map((transacao) => new Transacao(transacao.id, transacao.descricao, 
            transacao.valor, transacao.data, transacao.categoria_id, 
            transacao.categoria_nome));    
    } catch (err) {
        throw "Erro : " + err;
    }
}

//GET
const getTransacaoPorCodigoDB = async (id) => {
    try {           
        const results = await pool.query(`
            SELECT t.*, c.nome as categoria_nome 
            FROM transacoes t
            JOIN categorias c ON t.categoria_id = c.id
            WHERE t.id = $1`, [id]);
        
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const transacao = results.rows[0];
            return new Transacao(transacao.id, transacao.descricao, 
                transacao.valor, transacao.data, transacao.categoria_id,
                transacao.categoria_nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a transação: " + err;
    }     
}

//POST
const addTransacaoDB = async (body) => {
    try {   
        const { descricao, valor, data, categoria_id } = body; 
        const results = await pool.query(`INSERT INTO transacoes (descricao, valor, data, categoria_id) 
            VALUES ($1, $2, $3, $4)
            returning id, descricao, valor, data, categoria_id`,
        [descricao, valor, data, categoria_id]);
        const transacao = results.rows[0];
        return new Transacao(transacao.id, transacao.descricao, 
            transacao.valor, transacao.data, transacao.categoria_id); 
    } catch (err) {
        throw "Erro ao inserir a transação: " + err;
    }    
}

//PUT
const updateTransacaoDB = async (body) => {
    try {   
        const { id, descricao, valor, data, categoria_id }  = body; 
        const results = await pool.query(`UPDATE transacoes SET descricao = $2, valor = $3, data = $4, categoria_id = $5 
            WHERE id = $1 
            returning id, descricao, valor, data, categoria_id`,
        [id, descricao, valor, data, categoria_id]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const transacao = results.rows[0];
        return new Transacao(transacao.id, transacao.descricao, 
            transacao.valor, transacao.data, transacao.categoria_id); 
    } catch (err) {
        throw "Erro ao alterar a transação: " + err;
    }      
}

//DELETE
const deleteTransacaoDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM transacoes WHERE id = $1`, [id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Transação removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a transação: " + err;
    }     
}

module.exports = {
    getTransacoesDB,
    getTransacaoPorCodigoDB,
    addTransacaoDB,
    updateTransacaoDB,
    deleteTransacaoDB
}