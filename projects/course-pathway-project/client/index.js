import httpGetRequest from './httpGetRequest'
import controller from './controller'

$(document).ready(function() {
    httpGetRequest('http://localhost:4000/' + 'data', (data) => {
        Object.freeze(data)
        console.log(data.students)
        controller(data)
    })
})