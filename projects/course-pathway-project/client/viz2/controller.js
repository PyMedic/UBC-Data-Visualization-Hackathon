import draw from './draw'
import { getCourseNames, getBeforeCurrentAndAfter, convertToNodes2, getRelativeTermCourseList } from './util'
import R from 'ramda'

const controller = (data) => {

    const relativeTermCourseList = getRelativeTermCourseList(data)
    //console.log("processed data")
    //console.log(processedData)
    //console.log("===end===")
    const nodeList = convertToNodes2(relativeTermCourseList)
    
    
    //const processDataToViz

    // initial draw
/*console.log("===data===")
console.log(data)
console.log("===end===") */    
    
    
/*console.log("dataToViz data")
console.log(getRelativeTermCourseList(data))
console.log("===end===")*/
  draw(nodeList)
    
}

export default controller