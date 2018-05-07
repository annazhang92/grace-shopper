import React from 'react';
import { pie, arc } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import * as d3 from 'd3';

const width = 500;
const height = 350;
const radius = Math.min(width, height) / 2;

const dataArc = arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

  const labelArc = arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40);

const colours=["#5490c1", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"];

const colorScale = d3.scaleLinear()
                .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
                .range(colours);
const dataToColorMap = d3.scaleLinear().domain([0,60]).range([0,1]);

const pieChart = pie()
  .sort(null)
  .value(d => d.value);

  const PieChart = ({ data }) => (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pieChart(data).map((d, i) => (
          <g key={i} className="arc">
            <path
              d={dataArc(d)}
              fill={colorScale(dataToColorMap(d.data.value))}
            />

            <text
              dy=".35em"
              transform={`translate(${labelArc.centroid(d)})`}
            >
              {d.data.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );

  export default PieChart;
