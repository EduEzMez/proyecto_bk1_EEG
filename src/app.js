import express from 'express';
const app = express();


app.use(express.json())
//El urlencoded permite que el servidor pueda interpretar mejor los datos complejos con req.query
app.use(express.urlencoded({extended:true}));
app.use('/static',express.static('public'))

const usuarios = [
    {id:1, name:"Ezequiel", apellido:"Gomez"},
    {id:2, name:"Mabel", apellido:"Mereles"}
]

app.get('/', (req,res) =>{ //LISTO
    res.send(usuarios)
})

app.get('/:pid', (req,res) =>{ //LISTO
    let idUsuario = Number(req.params.pid);
    let usuario = usuarios.find(user => user.id === idUsuario);
    if(!usuario) return res.send({error:"Usuario no encontrado"})
    res.send({usuario})
})


app.get('/api/products', (req,res) =>{ //LISTO
    res.send('Pruduct')
})

app.get('/api/carts', (req,res) =>{ //LISTO
    res.send('Cart')
})

const server = app.listen(8080,()=>console.log("Escuchando puerto 8080"))


