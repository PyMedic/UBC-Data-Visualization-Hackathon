import R from 'ramda'

const filterByCourse = (data) => R.filter(x => x.COURSE_NUMBER === course, data)

const reduceData = R.reduce(
    (accArr, curObj) => {
        const studentIdentifier = curObj.STUDENT_IDENTIFIER

        const course = curObj.COURSE_NUMBER
        const relativeTerm = curObj.RELATIVE_TERM
        const courseSubject = curObj.COURSE_SUBJECT
        const percentGrade = curObj.PERCENT_GRADE

        const courseData = {
            "courseNumber": course,
            "relativeTerm": relativeTerm,
            "courseSubject": courseSubject,
            "percentGrade": percentGrade
        }

        if (typeof accArr[studentIdentifier] === "undefined") {
            accArr[studentIdentifier] = []
        }

        accArr[studentIdentifier].push(courseData)

        return accArr
    }
)

export {
    filterByCourse,
    reduceData
}