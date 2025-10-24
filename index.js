const express = require('express');
const cors = require('cors'); 
const rotas = require('./routes/rotas');
const app = express();

app.use(cors({
    origin: '*' 
}));


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(rotas);

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor da API rodando....');
});