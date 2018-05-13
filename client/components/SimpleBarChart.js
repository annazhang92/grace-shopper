import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import * as d3 from 'd3';

class SimpleBarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {
    const { node } = this;
    // const { data } = this.props;
    const { products  } = this.props;
    var { reverse, label } = this.props;
    const data = [
      {
        count: Math.floor(Math.random() * 30) + 1,
        imageUrl: 'https://picsum.photos/300/175/?616',
        name: 'Handmade Metal Chair'
      },
      {
        count: Math.floor(Math.random() * 30) + 1,
        imageUrl: 'https://picsum.photos/300/175/?random',
        name: 'Mascara'
      },
      {
        count: Math.floor(Math.random() * 15) + 5,
        imageUrl: 'https://picsum.photos/300/175/?random',
        name: 'Computer'
      },
      {
        count: Math.floor(Math.random() * 40) + 1,
        imageUrl: 'https://picsum.photos/300/175/?random',
        name: 'Toys'
      },
      {
        count: Math.floor(Math.random() * 20) + 5,
        imageUrl: 'https://picsum.photos/300/175/?random',
        name: 'Toys'
      },
      {
        count: Math.floor(Math.random() * 20) + 5,
        imageUrl: 'https://picsum.photos/300/175/?random',
        name: 'Toys'
      },
      {
        count: Math.floor(Math.random() * 20) + 5,
        imageUrl: 'https://picsum.photos/300/175/?random',
        name: 'Toys'
      }
    ];

    // reverse = false;
    const width = 200;
    const height = 20;
    const sortedData = data.sort((a, b) => {
      return d3.descending(a.count, b.count);
    });

    const max = data.reduce((max, p) => p.count > max ? p.count : max, data[0].count);

    var x = d3.scaleLinear()
      .domain([0,max])
      .range(reverse ? [0, width / 2]:[width / 2, 0] );

    var chart = d3.select(node)
      .attr('height', height * (data.length + 1) )
      .attr('width', width);

    chart.append('text')
      .attr('x', (140))
      .attr('y', (height * (data.length + 1)) - 5)
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .style('font-size', '14px')
      .style('text-decoration', 'underline')
      .text(label);

    var bar = chart.selectAll('g')
      .data(sortedData)
      .enter().append('g')
      .attr('transform', (d, i) => {
        return 'translate(0,' + (i * height ) + ')';
      });

    var tooltip = d3.select('div').append('div').attr('class', 'toolTip');

    reverse ?
      bar.append('rect')
        .attr('width', d => { return x(d.count); })
        .attr('height', height - 1)
        .on('mousemove', d => {
          tooltip
            .style('left', d3.event.pageX - 50 + 'px')
            .style('top', d3.event.pageY - 70 + 'px')
            .style('display', 'inline-block')
            .style('opacity', 1)
            .html(d.name);
        })
        .on('mouseout', () => { tooltip.style('display', 'none'); })
    :
      bar.append('rect')
      .attr('x', d => { return x(d.count); })
      .attr('width', d => { return x(0) - x(d.count); })
      .attr('height', height - 1)
      .on('mousemove', d => {
        var string = '<img src= ' + d.imageUrl + ' />';
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .style('opacity', 1)
          .html(d.name );
      })
      .on('mouseout', () => { tooltip.style('display', 'none'); })


    bar.append('text')
      .attr('x', reverse ? d => { return x(d.count) - 3; } : d => { return x(d.count) + 20; })
      .attr('y', height / 2)
      .attr('dy', '.35em')
      .text(d => { return d.count; });
  }

  render() {

    return (
      <div>
        <svg className='chart' ref={node => this.node = node} width={ 500 } height={ 500 } style={{marginTop: '25px'}}>
        </svg>
      </div>
    );
  }
}

export default SimpleBarChart;
