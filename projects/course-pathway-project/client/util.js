import R from 'ramda'

// helper functions
const createCourseName = (course) => course.courseSubject + course.courseNumber
const filterByCourseName = (courseName) => R.filter(x => createCourseName(x) === courseName)
const filterByRelativeTerm = (relativeTerm) => R.filter(course => course.relativeTerm === relativeTerm)

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
    const arrayOfCourses = []
    R.map(courses =>
        R.map(course => 
            arrayOfCourses.push(createCourseName(course))
        , courses)
    , data.students)
    return sortCourses(R.uniq(arrayOfCourses))
}

// returns { before: [], current: [], after: []}.
const getBeforeCurrentAndAfter = (data, courseName) => {
    const beforeArray = []
    const currentArray = []
    const afterArray = []

    const addToArrays = (relativeTermOfCourse, courses) => {
        const before = R.add(-1, relativeTermOfCourse)
        const current = relativeTermOfCourse
        const after = R.add(1, relativeTermOfCourse)

        const filteredBefore = filterByRelativeTerm(before)(courses)
        const filteredCurrent = filterByRelativeTerm(current)(courses)
        const filteredAfter = filterByRelativeTerm(after)(courses)

        if (!(R.isEmpty(filteredBefore))) {
            beforeArray.push(filteredBefore)
        }
        if (!(R.isEmpty(filteredCurrent))) {
            currentArray.push(filteredCurrent)
        }
        if (!(R.isEmpty(filteredAfter))) {
            afterArray.push(filteredAfter)
        }
    }

    R.map(courses => {
        R.map(course => {
            if (createCourseName(course) === courseName) {
                const relativeTermOfCourse = course.relativeTerm
                addToArrays(relativeTermOfCourse, courses)
            }
        }, courses)
    }, data.students)

    return { 
        before: R.flatten(beforeArray), 
        current: R.flatten(currentArray), 
        after: R.flatten(afterArray) 
    }
}

export {
    getCourseNames,
    sortCourses,
    getBeforeCurrentAndAfter,
    createCourseName
}