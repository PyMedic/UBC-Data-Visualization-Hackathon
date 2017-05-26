import initEventListeners from './eventListeners'
import { getCourses } from './util'

const controller = (data) => {
    console.log(getCourses(data))
}

export default controller