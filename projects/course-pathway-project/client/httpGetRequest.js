import Spinner from './spin.min.js'

const httpGetRequest = (theURL, callback) => {
    // initialize spinner
    const target = document.getElementById('spinner')
    const spinner = new Spinner().spin(target)

    const httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            spinner.stop()
            const data = JSON.parse(httpRequest.responseText)
            callback(data)
        }
    }
    httpRequest.open("GET", theURL, true)
    httpRequest.send(null)
}

export default httpGetRequest