import draw from './draw'
import sampleD3 from './sampleD3Viz'
import { getCourseNames, getBeforeCurrentAndAfter } from './util'

const controller = (data, courseName = getCourseNames(data)[0]) => {
    
    // returns { before: [], current: [], after: []}
    courseName = 'ARTS268'
    const dataToViz = getBeforeCurrentAndAfter(data, courseName)
    
    console.log(dataToViz)

    draw(dataToViz)
}

export default controller