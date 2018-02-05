const margin = {
     top: 20,
     right: 20,
     bottom: 30,
     left: 50
}
const graphWidth = $('#graph').width()
const height = 1000 - margin.top - margin.bottom
//const height = 100 - margin.top - margin.bottom

const colour = {
    '100': 'red',
    '200': 'blue',
    '300': 'green',
    '400': 'grey'
}


export {
    margin,
    graphWidth,
    height,
    colour
}