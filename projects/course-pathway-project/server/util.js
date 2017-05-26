import R from 'ramda'

const reduceData = R.reduce(
    (accObj, curObj) => {
        const studentIdentifier = curObj.STUDENT_IDENTIFIER

        const course = curObj.COURSE_NUMBER
        const relativeTerm = curObj.RELATIVE_TERM
        const courseSubject = curObj.COURSE_SUBJECT
        const percentGrade = curObj.PERCENT_GRADE

        if (typeof accObj[studentIdentifier] === 'undefined') { 
            accObj[studentIdentifier] = []
        }

        accObj[studentIdentifier].push({
            "courseNumber": course,
            "relativeTerm": relativeTerm,
            "courseSubject": courseSubject,
            "percentGrade": percentGrade
        })

        return accObj
    }
)

export {
    reduceData
}