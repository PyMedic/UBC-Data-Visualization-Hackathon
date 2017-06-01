import httpGetRequest from './httpGetRequest'
import controller from './controller'
import { initSelector } from './setup'
import { getCourseNames, getBeforeCurrentAndAfter } from './util'

$(document).ready(function() {
    httpGetRequest('http://localhost:4000/' + 'data', (data) => {
        Object.freeze(data)
        console.log(data)

        // create the dropdown selector
        initSelector(getCourseNames(data))

        // call controller, which handles the state
        controller(data)
    })
})