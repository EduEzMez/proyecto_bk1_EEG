import express from 'express';
const app = express();

/*
    Permite que el servidor pueda interpretar mejor los datos complejos 
    al mapaerlos con req.query
*/
app.use(express.urlencoded({extended:true}));

//endponit normal
app.get('/',(req,res) =>{
    res.send("<h1>Bienvenido al servidor</h1>")
})

//endponit normal mostrando un array de objetos
let usuarios = [
    {id: 1, nombre : "Ezequiel", apellido: "Gomez", edad: 35, correo: "edu.ezequielgomez@gmail.com", genero: "m"},
    {id: 2, nombre : "Mabel", apellido: "Mereles", edad: 40, correo: "maby_mr8@gmail.com", genero: "f"}
]
app.get('/usuarios',(req,res) =>{
    res.send(usuarios)
})

//endpoint con parametro "params"
app.get('/unparametro/:nombre',(req,res) =>{
    console.log(req.params.nombre)
    res.send(`Bienvenido ${req.params.nombre}`)
})

//endpoint con dos parametros "params"
app.get('/dosparametros/:nombre/:apellido',(req,res) =>{
    console.log(req.params.nombre)
    console.log(req.params.apellido)
    res.send(`Bienvenido ${req.params.nombre} ${req.params.apellido}`)
})

//endpoint query
app.get('/ejemploQueries', (req, res) => {
    let consultas = req.query
    let {nombre,apellido,edad} = req.query
    res.send(consultas)
})

//endpoint query generos
app.get('/genero', (req, res) => {
    let genero = req.query.genero
    if (!genero || (genero !== "m" && genero !== "f")) return req.send({usuarios})
    
    let usuarioFiltrado = usuarios.filter(usuario => usuario.genero===genero);
    res.send({usuarios:usuarioFiltrado})
})


app.listen(8080,()=>console.log("Servidor arriba desde puerto 8080"))