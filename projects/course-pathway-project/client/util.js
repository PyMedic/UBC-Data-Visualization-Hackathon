import R from 'ramda'

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

const getCourses = (data) => {
    const courses = []
    R.map(student =>
        R.map(x => 
            courses.push(x.courseSubject + x.courseNumber)
        , student)
    , data.students)
    return sortCourses(R.uniq(courses))
}

export {
    getCourses
}