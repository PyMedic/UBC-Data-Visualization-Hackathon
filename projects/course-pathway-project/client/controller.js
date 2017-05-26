import initEventListeners from './eventListeners'
import { getCourses } from './util'

const controller = (data, course = "ARTS210") => {
    initEventListeners(getCourses(data))
    
}

export default controller