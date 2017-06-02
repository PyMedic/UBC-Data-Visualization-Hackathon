import draw from './draw'
import { getCourseNames, getBeforeCurrentAndAfter, convertToNodes } from './util'
import R from 'ramda'

const controller = (data, courseName = getCourseNames(data)[0]) => {
    


    // just for testing purposes. this is a popular course
    //courseName = 'ARTS268'

    

    // returns  { before: [], current: [], after: [], courseName: ''}
    const dataToViz = R.pipe(
        getBeforeCurrentAndAfter,
        convertToNodes

    ) 

    draw(dataToViz(data, courseName))
}

export default controller