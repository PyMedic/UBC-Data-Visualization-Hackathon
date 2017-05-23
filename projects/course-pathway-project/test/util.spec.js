import * as util from '../dev/util'
import assert from 'assert'

describe('doubleArray', () => {
    it('takes in an array of numbers and returns a new array with each number doubled', () => {
        const data = [1,2,3]
        const expected = [2,4,6]
        assert.deepEqual(expected, util.doubleArray(data))
    })
})