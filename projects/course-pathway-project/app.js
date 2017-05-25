import express from 'express'
import pipeline from './server/pipeline'

const app = express()

app.use(express.static('dist'))

pipeline('336A', (data) => {
    console.log(data)
})

app.listen(4000, () => {
     console.log('Please go to http://localhost:4000/index.html to view')
})