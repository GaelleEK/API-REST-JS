import express from 'express'
import DataStore from 'nedb'
// start express
const app = express()
// port
const PORT = 3000
// DB
const db = new DataStore({ filename: "Project" })
db.loadDatabase()

app.use(express.json())
// API CRUD
// create
app.post('/api/project', (req, res) => {
    db.insert(req.body)
    res.send(req.body)
})
// getAll
app.get('/api/project', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) console.log(err)
        res.send(docs)
    })
})
// getOne
app.get('/api/project/:id' , (req, res) => {
    db.find({_id: req.params.id}, (err, docs) => {
        if (err) console.log(err)
        res.send(docs)
    })
})
// update
app.patch('/api/project/:id', (req, res) => {
    db.update({ _id: req.params.id }, {$set: {...req.body}})
    res.send(req.body)
})


app.listen(PORT, () => {
    console.log(`serveur lancé sur le port : ${PORT}`)
})