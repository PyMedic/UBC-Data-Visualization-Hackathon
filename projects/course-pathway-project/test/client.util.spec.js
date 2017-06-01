import assert from 'assert'
import * as util from '../client/util'

describe('sortCourses', () => {
    it('returns an empty array if passed an empty array', () => {
        const input = []
        const output  = []
        assert.deepEqual(output, util.sortCourses(input))
    })
    it('returns a sorted array by the last three characters', () => {
        const input = ["ARTS400","ARTS300","ARTS200","ARTS100"]
        const output = ["ARTS100","ARTS200","ARTS300","ARTS400"]
        assert.deepEqual(output, util.sortCourses(input))
    })
    it('ignores the last character if it is a string', () => {
        const input = ["ARTS400A","ARTS300B","ARTS200c","ARTS100e"]
        const output = ["ARTS100e","ARTS200c","ARTS300B","ARTS400A"]
        assert.deepEqual(output, util.sortCourses(input))
    })
})

describe('createCourseName', () => {
    it('takes in a course object and returns the name appended together', () => {
        const courseObj = {
            courseNumber: '330A',
            courseSubject: 'SUBJ'
        }
        const expected = 'SUBJ330A'
        assert.deepEqual(expected, util.createCourseName(courseObj))
    })
})