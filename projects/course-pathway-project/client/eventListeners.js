const initEventListeners = (courses) => {
    document.getElementById('course-list').innerHTML = courses.map(x => 
        "<option>" + x + "</option>"
    )  
}

export default initEventListeners