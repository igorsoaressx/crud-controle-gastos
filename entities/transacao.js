class Transacao {
   
    constructor(id, descricao, valor, data, categoria_id, categoria_nome) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.data = new Date(data).toISOString().split('T')[0];
        this.categoria_id = categoria_id;
        this.categoria_nome = categoria_nome; 
    }
}
module.exports = Transacao;