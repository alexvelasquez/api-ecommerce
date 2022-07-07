const express = require('express');
const app = express();
const PORT = 8001;
const productos = require("./productos.json");
app.listen(
    PORT,
    () => console.log(`listening on http:localhost:${PORT}`)
)

app.get('/productos', (req, res) => {
    const { categoria } = req.query
    let response = productos;
    if(categoria){
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

