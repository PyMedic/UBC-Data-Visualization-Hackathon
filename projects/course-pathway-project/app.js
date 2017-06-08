import express from 'express'
import readCSV from './server/readCSV'

const app = express()

app.use(express.static('dist'))

app.get('/viz1', (req, res) => {
    readCSV((data) => {
        res.json(data)
    })
})

app.get('/viz2', (req, res) => {
    readCSV((data) => {
        res.json(data)
    })
})

app.listen(4000, () => {
     console.log('Please go to http://localhost:4000/index.html to view')
})