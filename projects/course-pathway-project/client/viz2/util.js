import R from 'ramda'

// helper functions
const createCourseName = (course) => 
    course.courseSubject + course.courseNumber
const filterByCourseName = (courseName) => 
    R.filter(x => createCourseName(x) === courseName)
const filterByRelativeTerm = (relativeTerm) => 
    R.filter(course => course.relativeTerm === relativeTerm)
const filterByRelativeTermBefore = (relativeTerm) =>
    R.filter(course => course.relativeTerm <= relativeTerm)
const filterByRelativeTermAfter = (relativeTerm) =>
    R.filter(course => course.relativeTerm >= relativeTerm)
const getFloorOfCourse = (course) => {
    course = String(course)
    const floor = (number) => Math.floor(Number(number)/100)*100
    if (R.test(/^[a-zA-Z]*$/, course.slice(-1))) {
        return floor(course.slice(-4,-1))
    } else {
        return floor(course.slice(-3))
    }
}
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


const getRelativeTermCourseList = (data) => {
    //console.log(data)
    //return data
    
    //console.log("inside getRelativeTermCourseList")
    const relativeTerm = data.relativeTerm
    //console.log(relativeTerm)
    const relativeTermCourseList = {}
    const displayTerm = x => console.log("test")
    R.forEach(displayTerm, relativeTerm)
    //console.log("end getRelativeTermCourseList")
    
    for(var i in relativeTerm){
        //console.log(i)
        for(var j in data.relativeTerm[i]){
            var relativeTermNumber = j;
            //console.log(data.relativeTerm[x])
            for(var k in data.relativeTerm[j]){
                //console.log(data.relativeTerm[j][k].courseNumber)
                //console.log(data.relativeTerm[j][k].courseSubject)
                var courseNumber = data.relativeTerm[j][k].courseNumber
                var courseSubject = data.relativeTerm[j][k].courseSubject
                var courseName = courseSubject + " " + courseNumber
                
                if(typeof relativeTermCourseList[relativeTermNumber] === "undefined"){
                    relativeTermCourseList[relativeTermNumber] = {}                  
                }
                
                //if(typeof relativeTermCourseList.relativeTermNumber === "undefined"){
                    //relativeTermCourseList[relativeTermNumber] = []
                //    relativeTermCourseList.relativeTermNumber = relativeTermNumber
                //}
                
                if(typeof relativeTermCourseList[relativeTermNumber][courseName] === "undefined"){
                    //relativeTermCourseList[relativeTermNumber][courseName] = [courseName, 0]
                    relativeTermCourseList[relativeTermNumber][courseName] = 0
                }
                else{
                    relativeTermCourseList[relativeTermNumber][courseName] += 1
                }
            }
        }
    }
    //console.log("after setup.js done")
    //console.log(relativeTermCourseList)
    return relativeTermCourseList
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

        const filteredBefore = filterByRelativeTermBefore(before)(courses)
        const filteredCurrent = filterByRelativeTerm(current)(courses)
        const filteredAfter = filterByRelativeTermAfter(after)(courses)

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
        after: countNumberOfCourses(sortArrayOfCourses(R.flatten(afterArray))),
        courseName
    }
}

// input: { before: [], current: [], after: [], courseName: ''}
const convertToNodes = (data) => {
    const arrayToNode = (array, timeString) => {
        return R.map(arrayOfObjects => {
            return {
                numberOfCourses: arrayOfObjects.length,
                courseNumber: arrayOfObjects[0].courseNumber,
                courseSubject: arrayOfObjects[0].courseSubject,
                time: timeString
            }
        }, array)
    }

    const nodes = R.concat(
        arrayToNode(data.before, 'before'), arrayToNode(data.after, 'after')
    )

    return  {
        nodes,
        courseName: data.courseName
    }
}

// input: {[1][ARTS 101]{enrollment: 10}, ...}, 2:{}, ....}
const convertToNodes2 = (data) => {
    console.log(data)
    const arrayToNode = (array, timeString) => {
        return R.map(arrayOfObjects => {
            return {
                numberOfCourses: arrayOfObjects.length,
                courseNumber: arrayOfObjects[0].courseNumber,
                courseSubject: arrayOfObjects[0].courseSubject,
                time: timeString
            }
        }, array)
    }

    //const nodes = R.concat(
        
        //arrayToNode(data.before, 'before'), arrayToNode(data.after, 'after')
    //)
    
    const nodes = []
    for(var i in data){
        var termNumber = i
        //nodes[termNumber] = []
        for(var j in data[i]){    
            //console.log(j)
            var courseName = j
            var enrollmentNumber = data[i][courseName]
            
            
            var nodeObject = {
                enrollment: enrollmentNumber,
                courseName: courseName,
                time: termNumber
            }
            
            nodes.push(nodeObject)
            //nodes[termNumber][courseName] = enrollmentNumber
            //nodes[termNumber][courseName].push(enrollmentNumber)
            //var testString = termNumber+" "+courseName+" "+enrollmentNumber
            //console.log(testString)
        }
    }
    
    console.log("after nodes job")
    console.log(nodes)

    return nodes;
    /*return  {
        nodes,
        courseName: data.courseName
    }*/
}

export {
    getCourseNames,
    sortCourses,
    getBeforeCurrentAndAfter,
    createCourseName,
    convertToNodes,
    convertToNodes2,
    getFloorOfCourse,
    getRelativeTermCourseList
}