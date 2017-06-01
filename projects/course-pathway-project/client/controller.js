import draw from './draw'
import sampleD3 from './sampleD3Viz'
import { getCourseNames, getBeforeCurrentAndAfter } from './util'

const controller = (data, courseName = getCourseNames(data)[0]) => {
    
    // just for testing purposes. this is a popular course
    courseName = 'ARTS268'

    // returns frozen { before: [], current: [], after: []}
    const dataToViz = Object.freeze(getBeforeCurrentAndAfter(data, courseName))
    console.log(dataToViz)
    draw(dataToViz)
}

export default controller