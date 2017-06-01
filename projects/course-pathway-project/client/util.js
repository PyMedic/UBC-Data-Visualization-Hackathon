import R from 'ramda'

// helper functions
const createCourseName = (course) => course.courseSubject + course.courseNumber
const filterByCourseName = (course) => R.filter(x => createCourseName(x) === course)


// horribly ugly way to sort courses :(
const sortCourses = (courses) => R.sort((a, b) => {
    let first = Number(a.slice(-3))
    let second = Number(b.slice(-3))
    if (R.test(/^[a-zA-Z]*$/, a.slice(-1))) {
        first = Number(a.slice(-4, -1))
    }
    if (R.test(/^[a-zA-Z]*$/, b.slice(-1))) {
        second = Number(b.slice(-4, -1))
    }
    return first - second
}, courses)

const getCourseNames = (data) => {
    const courses = []
    R.map(student =>
        R.map(course => 
            courses.push(createCourseName(course))
        , student)
    , data.students)
    return sortCourses(R.uniq(courses))
}

const getBeforeAndAfter = (data, course) => {
    R.map(student => {

    }, data.student)
}

export {
    getCourseNames,
    sortCourses,
    getBeforeAndAfter,
    createCourseName
}