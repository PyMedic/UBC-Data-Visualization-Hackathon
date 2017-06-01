import draw from './draw'
import sampleD3 from './sampleD3Viz'
import { getCourseNames, getBeforeAndAfter } from './util'

const controller = (data, course = getCourseNames(data)[0]) => {
    
    console.log(course)
    // returns { before: [], after: []}
    const dataToViz = getBeforeAndAfter(data, course)
    
    draw(dataToViz)
}

export default controller