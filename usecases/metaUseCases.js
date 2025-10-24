const { pool } = require('../config');
const Meta = require('../entities/meta');

//GET
const getMetasDB = async () => {
    try {    
        const { rows } = await pool.query(`
            SELECT m.*, c.nome as categoria_nome
            FROM metas m
            JOIN categorias c ON m.categoria_id = c.id
            ORDER BY m.ano, m.mes`);

        return rows.map((meta) => new Meta(meta.id, meta.categoria_id, 
            meta.valor_limite, meta.mes, meta.ano,
            meta.categoria_nome));
    } catch (err) {
        throw "Erro : " + err;
    }
}

//GET 
const getMetaPorCodigoDB = async (id) => {
    try {           
        const results = await pool.query(`
            SELECT m.*, c.nome as categoria_nome
            FROM metas m
            JOIN categorias c ON m.categoria_id = c.id
            WHERE m.id = $1`, [id]);

        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const meta = results.rows[0];
            return new Meta(meta.id, meta.categoria_id, 
                meta.valor_limite, meta.mes, meta.ano,
                meta.categoria_nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a meta: " + err;
    }     
}

//POST
const addMetaDB = async (body) => {
    try {   
        const { categoria_id, valor_limite, mes, ano } = body; 
        const results = await pool.query(`INSERT INTO metas (categoria_id, valor_limite, mes, ano) 
            VALUES ($1, $2, $3, $4)
            returning id, categoria_id, valor_limite, mes, ano`,
        [categoria_id, valor_limite, mes, ano]);
        const meta = results.rows[0];
        return new Meta(meta.id, meta.categoria_id, 
            meta.valor_limite, meta.mes, meta.ano);
    } catch (err) {
        throw "Erro ao inserir a meta: " + err;
    }    
}

//PUT
const updateMetaDB = async (body) => {
    try {   
        const { id, categoria_id, valor_limite, mes, ano }  = body; 
        const results = await pool.query(`UPDATE metas SET categoria_id = $2, valor_limite = $3, mes = $4, ano = $5 
            WHERE id = $1 
            returning id, categoria_id, valor_limite, mes, ano`,
        [id, categoria_id, valor_limite, mes, ano]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const meta = results.rows[0];
        return new Meta(meta.id, meta.categoria_id, 
            meta.valor_limite, meta.mes, meta.ano);
    } catch (err) {
        throw "Erro ao alterar a meta: " + err;
    }      
}

//DELETE
const deleteMetaDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM metas WHERE id = $1`, [id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Meta removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a meta: " + err;
    }     
}

module.exports = {
    getMetasDB,
    getMetaPorCodigoDB,
    addMetaDB,
    updateMetaDB,
    deleteMetaDB
}