import R from 'ramda'

// helper functions
const createCourseName = (course) => course.courseSubject + course.courseNumber
const filterByCourseName = (courseName) => R.filter(x => createCourseName(x) === courseName)
const filterByRelativeTerm = (relativeTerm) => R.filter(course => course.relativeTerm === relativeTerm)

const sortHelper = (a, b) => {
    let first = Number(a.slice(-3))
    let second = Number(b.slice(-3))
    if (R.test(/^[a-zA-Z]*$/, a.slice(-1))) {
        first = Number(a.slice(-4, -1))
    }
    if (R.test(/^[a-zA-Z]*$/, b.slice(-1))) {
        second = Number(b.slice(-4, -1))
    }
    return first - second
}

// horribly ugly way to sort courses :(
const sortCourses = (courses) => R.sort((a, b) => sortHelper(a, b), courses)

const sortArrayOfCourses = (arrayOfCourses) => 
    R.sort((a, b) => sortHelper(createCourseName(a), createCourseName(b)), arrayOfCourses)

const getCourseNames = (data) => {
    const arrayOfCourses = []
    R.map(courses =>
        R.map(course => 
            arrayOfCourses.push(createCourseName(course))
        , courses)
    , data.students)
    return sortCourses(R.uniq(arrayOfCourses))
}

const countNumberOfCourses = (arrayOfCourses) => (R.groupWith((a, b) => 
    createCourseName(a) === createCourseName(b), arrayOfCourses))   


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
        before: countNumberOfCourses(sortArrayOfCourses(R.flatten(beforeArray))), 
        current: countNumberOfCourses(sortArrayOfCourses(R.flatten(currentArray))), 
        after: countNumberOfCourses(sortArrayOfCourses(R.flatten(afterArray)))
    }
}

export {
    getCourseNames,
    sortCourses,
    getBeforeCurrentAndAfter,
    createCourseName,
    countNumberOfCourses
}