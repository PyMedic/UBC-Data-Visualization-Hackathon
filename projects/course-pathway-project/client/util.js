import R from 'ramda'

const getCourses = (data) => {
    const courses = []
    R.map(student =>
        R.map(x => 
            courses.push(x.courseSubject + x.courseNumber)
        , student)
    , data.students)
    return R.uniq(courses)
}

export {
    getCourses
}