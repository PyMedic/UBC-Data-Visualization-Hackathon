// defining constants
const margin = {
     top: 20,
     right: 20,
     bottom: 30,
     left: 50
}
const graphWidth = $('#graph').width()
const height = 700 - margin.top - margin.bottom

const draw = (data) => {
    const before = data.before
    const current = data.current
    const after = data.after

    const svg = d3.select('#graph')
        .append('svg')
        .attr('style', 'display: block; margin: auto; margin-top: 30px;')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', '0 0 ' + Math.min(graphWidth, height) + ' ' + 700)
        .attr('preserveAspectRatio', 'xMinYMin')

    const g = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")")    





}

export default draw