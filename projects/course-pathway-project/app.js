import express from 'express'

const app = express()

app.use(express.static('dist'))

app.listen(4000, () => {
     console.log('Please go to http://localhost:4000/index.html to view')
})