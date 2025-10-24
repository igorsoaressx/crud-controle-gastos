const { pool } = require('../config');
const Categoria = require('../entities/categoria');


//GET 
const getCategoriasDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM categorias ORDER BY nome');
        return rows.map((categoria) => new Categoria(categoria.id, categoria.nome, categoria.descricao));        
    } catch (err) {
        throw "Erro : " + err;
    }
}


//POST 
const addCategoriaDB = async (body) => {
    try {   
        const { nome, descricao } = body; 
        const results = await pool.query(`INSERT INTO categorias (nome, descricao) 
            VALUES ($1, $2)
            returning id, nome, descricao`,
        [nome, descricao]);
        const categoria = results.rows[0];
        return new Categoria(categoria.id, categoria.nome, categoria.descricao); 
    } catch (err) {
        throw "Erro ao inserir a categoria: " + err;
    }    
}


//PUT
const updateCategoriaDB = async (body) => {
    try {   
        const { id, nome, descricao }  = body; 
        const results = await pool.query(`UPDATE categorias set nome = $2, descricao = $3 
        WHERE id = $1 
        returning id, nome, descricao`,
        [id, nome, descricao]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const categoria = results.rows[0];
        return new Categoria(categoria.id, categoria.nome, categoria.descricao); 
    } catch (err) {
        throw "Erro ao alterar a categoria: " + err;
    }      
}


//DELETE
const deleteCategoriaDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM categorias WHERE id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Categoria removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a categoria: " + err;
    }     
}


//GET 
const getCategoriaPorCodigoDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT * FROM categorias WHERE id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const categoria = results.rows[0];
            return new Categoria(categoria.id, categoria.nome, categoria.descricao); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a categoria: " + err;
    }     
}


// EXPORTS 
module.exports = {
    getCategoriasDB, 
    addCategoriaDB, 
    updateCategoriaDB, 
    deleteCategoriaDB, 
    getCategoriaPorCodigoDB
}