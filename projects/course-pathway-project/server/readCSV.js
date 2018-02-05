import parse from 'csv-parse'
import fs from 'fs'
import { reduceData } from './util'


const readCSV = (callback) => {
    const parser = parse({delimiter: ',', columns: true, relax: true, auto_parse: true},
        (err, data) => {
            const jsonData = {
                students: reduceData({}, data)
            }
            callback(jsonData)
    })
    fs.createReadStream(__dirname + '/../data/mockEnrollmentData.csv').pipe(parser)
    //fs.createReadStream(__dirname + '/../data/testData.csv').pipe(parser)
}



export default readCSV