class Meta {
    constructor(id, categoria_id, valor_limite, mes, ano, categoria_nome) {
        this.id = id;
        this.categoria_id = categoria_id;
        this.valor_limite = valor_limite;
        this.mes = mes;
        this.ano = ano;
        this.categoria_nome = categoria_nome; 
    }
}
module.exports = Meta;