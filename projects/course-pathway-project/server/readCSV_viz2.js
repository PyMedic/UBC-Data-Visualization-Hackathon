import parse from 'csv-parse'
import fs from 'fs'
import { reduceData_viz2 } from './util'

const readCSV_viz2 = (callback) => {
    const parser = parse({delimiter: ',', columns: true, relax: true, auto_parse: true},
        (err, data) => {
            const jsonData = {
                
                relativeTerm: reduceData_viz2({}, data)
                
            }

            callback(jsonData)
    })
    fs.createReadStream(__dirname + '/../data/mockEnrollmentData.csv').pipe(parser)
    //fs.createReadStream(__dirname + '/../data/testData.csv').pipe(parser)
}

export default readCSV_viz2