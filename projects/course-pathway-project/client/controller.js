import initEventListeners from './eventListeners'
import { getCourses } from './util'
import sampleD3 from './sampleD3Viz'

const controller = (data, course = "ARTS210") => {
    initEventListeners(getCourses(data))
    
    // just a sample. will remove later
    sampleD3()
}

export default controller