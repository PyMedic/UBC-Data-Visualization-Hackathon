import controller from './controller'

const initSelector = (courses) => {
    document.getElementById('course-list').innerHTML = courses.map(x => 
        "<option>" + x + "</option>"
    )  
}

const initEventListener = (data) => {
    document.getElementById('course-list').addEventListener('change', function() {
        // redraw on selection
        controller(data, this.value)
    })
}

export {
    initSelector, 
    initEventListener
} 