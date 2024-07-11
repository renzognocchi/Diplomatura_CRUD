const express = require('express')
const mongoose = require('mongoose')
const app = express()
process.loadEnvFile()
const PORT = process.env.PORT ?? 3000
const morgan = require('morgan')
const DbConection = require('./src/Database.js')
const Dispositivo = require('./src/Products.js')

DbConection()
//middleware para parsear el JSON 
app.use(express.json())
app.use(morgan('dev'))

//ruta principal
app.get("/", (req,res) => {
   res.send('bienvenidos a la appi de dispositivos electronicos')
})

//obtencion de todas los dispositivos electronicos
app.get('/electronicos', async (req,res) => {
    try {
        const dispositivo = await Dispositivo.find()
        return res.json(dispositivo)
    } catch (error) {
        res.status(500)
           .send('error del servidor') 
}})


//obtencion de todas los dispositivos electronicos por ID

app.get('/electronicos/:id', async (req, res) => {
    const { id } = req.params
    try{
        const electronico = await Dispositivo.findById(id)
        if (electronico) { res.json(electronico) }
        else {res.status(404)
                 .json({ message: 'Dispositivo no encontrada' })}
        }catch (error) {
            res.status(500)
               .send('Error al encontrar el dispositivo')
        }
  })

  //obtencion de un dispositivo por el nombre 
app.get('/electronicos/nombre/:nombre', async (req,res) => {
    const { nombre } = req.params
    try{
        const electronicos = await Dispositivo.find({ nombre: {$regex: nombre, $options: 'i' }})
        if (electronicos) {return res.json(electronicos)}
        else {
            res.status(404)
                .json({message: 'Dispositivos no encontrado'})
    }}
    catch (error) { 
        res.status(500)
           .json('error del servidor')
    }
} )
  
//obtencion de un dispositivo por el nombre by query
// app.get('/electronicos', async (req,res) => {
//     const { nombre } = req.query
//     const query = nombre ? { nombre: {$regex: nombre, $options: 'i' }} : {}
//         try{
//             const electronico = await Electronicos.find(query)
//         } catch (error) {
//             res.status(500).send('error al encontrar los dispositivos')
//         }})
        

// creacion de un nuevo producto
app.post('/electronicos', async (req,res) => {
    const nuevoElectronico = new Dispositivo(req.body)
    try{
        await nuevoElectronico.save()
        res.status(201)
            .json(nuevoElectronico)
    } catch {
        return res.status(500)
                  .json({ message: 'error al crear los dispositivos'})
    }
})

//Actualizar un nuevo producto parcialmente 
app.patch('/electronicos/:id', async (req,res) => {
    const { id } = req.params
    try {
        const dispActualizado = await Dispositivo.findByIdAndUpdate(id, req.body, {
            new: true,
        })
    if (dispActualizado) {
        return res.json({ message: `Dispositivo actualizado con exito ${dispActualizado}`})
    }else {
        return res.status(404)
                  .json({ message: 'dispositivo no encontrado para borrar'})
    }} catch (error) {
        return res.status(500)
                  .send('error al modificar el dispositivo')
    }
})


//Borrar un dispositivo
app.delete('/electronicos/:id', async (req,res) => {
    const { id } = req.params
    try {
        const resultado = await Dispositivo.findByIdAndDelete(id)
        if (resultado) {
            res.json({ message: 'dispositivo borrado correctamente'})}
            else {
                res.status(404)
                   .json({ message: 'dispositivo no encontrado para borrar '})
            }
        }
    catch (error) {
        return res.status(500).json({ message: ' error al borrar el dispositivo'})
    }
})

app.listen(PORT, () => {
    console.log(`server listened on http://localhost:${PORT}`)
})