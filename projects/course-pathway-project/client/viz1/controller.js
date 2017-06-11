import draw from './draw'
import { getCourseNames, getBeforeCurrentAndAfter, convertToNodes } from './util'
import R from 'ramda'

const controller = (data, courseName = getCourseNames(data)[0]) => {

    const dataToViz = R.pipe(
        getBeforeCurrentAndAfter,
        convertToNodes
    ) 

    // initial draw
    draw(dataToViz(data, courseName))
}

export default controller