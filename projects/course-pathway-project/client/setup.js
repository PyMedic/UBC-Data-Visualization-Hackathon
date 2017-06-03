import controller from './controller'
import { selectAll } from 'd3'

const initSelector = (courses) => {
    document.getElementById('course-list').innerHTML = courses.map(x => 
        "<option>" + x + "</option>"
    )  
}

const initEventListener = (data) => {
    document.getElementById('course-list').addEventListener('change', function() {

        selectAll('svg').remove()
        // redraw on selection
        controller(data, this.value)
    })
}

export {
    initSelector, 
    initEventListener
} 