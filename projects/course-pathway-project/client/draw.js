import * as d3 from 'd3'

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
    console.log(data)
    const nodes = data.nodes

    const svg = d3.select('#graph')
        .append('svg')
        .attr('style', 'display: block; margin: auto; margin-top: 30px;')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', '0 0 ' + Math.min(graphWidth, height) + ' ' + 700)
        .attr('preserveAspectRatio', 'xMinYMin')

    const g = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")")    

    const tick = () => {
        circle
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

    const forceCollide = d3.forceCollide()
        .radius((d) => d.numberOfCourses + 20)
        .iterations(1)

    const force = d3.forceSimulation()
        .nodes(nodes)
        .force('center', d3.forceCenter(graphWidth /2, height / 2))
        .force("charge", d3.forceManyBody())
        .force("collide", forceCollide)
        .force("x", d3.forceX(0))
        .force("y", d3.forceY(0))
        .on("tick", tick)
    
    const circle = g.selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr("r", (d) => Math.pow(Math.log(d.numberOfCourses*5), 2))
        
}

export default draw