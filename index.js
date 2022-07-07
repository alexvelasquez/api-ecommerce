const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001;

const productos = require("./db/productos.json");
const categorias = require("./db/categorias.json");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.listen(
    PORT,
    () => console.log(`listening on http:localhost:${PORT}`)
)

app.get('/', (req, res) => {
    res.status(200).send("Bienvenido")
})

app.get('/productos', (req, res) => {
    let { categoria, nombre } = req.query
    let response = productos;
    if(nombre && nombre.trim() != ''){
        nombre = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        response = response.filter(p=>p.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(nombre))
    }
    if(categoria && categoria.trim() != ''){
        response = response.filter(p=>p.categoria.id == categoria) 
    }
    res.status(200).send(response)
})
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const response = productos.filter(p => p.id == id);
    if (response.length) {
        res.status(200).send(response[0])
    }
    res.status(200).send({})
})

app.get('/categorias', (req, res) => {
    res.status(200).send(categorias)
})
