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
        .radius((d) => d.numberOfCourses + 10)
        .iterations(1)

    const forceBefore = d3.forceSimulation()
        .nodes(nodes.filter(d => d.time === 'before'))
        .force('X', d3.forceX(20).strength(1))
        .force('Y', (d) => { 
            return d3.forceY(height).strength(1)
        })
        //.force('center', d3.forceCenter(graphWidth /2, height / 2))
        .force("charge", d3.forceManyBody())
        .force("collide", forceCollide)
        .on("tick", tick)
    
    const forceAfter = d3.forceSimulation()
        .nodes(nodes.filter(d => d.time === 'after'))
        .force('X', d3.forceX(graphWidth).strength(1))
        .force('Y', (d) => { 
            return d3.forceY(height).strength(1)
        })
        //.force('center', d3.forceCenter(graphWidth /2, height / 2))
        .force("charge", d3.forceManyBody().strength(1))
        .force("collide", forceCollide)
        .on("tick", tick)

    const circle = g.selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr("r", (d) => Math.pow(Math.log(d.numberOfCourses*8), 2))
        
}

export default draw