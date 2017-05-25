import parse from 'csv-parse'
import fs from 'fs'
import { reduceData } from './util'


const readCSV = (course, callback) => {
    const parser = parse({delimiter: ',', columns: true, relax: true, auto_parse: true},
        (err, data) => {
            callback(data)
    })
    fs.createReadStream(__dirname + '/../data/mockEnrollmentData.csv').pipe(parser)
}

export default readCSV