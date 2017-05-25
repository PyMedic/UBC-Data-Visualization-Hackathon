import readCSV from './readCSV'
import { reduceData } from './util'

const pipeline = (course, callback) => {
    readCSV(course, (data) => {
        callback(reduceData([], data))
    })
    
}

export default pipeline