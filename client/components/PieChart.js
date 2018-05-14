import React from 'react';
import { pie, arc } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import * as d3 from 'd3';

const width = 300;
const height = 250;
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

//TODO pass min:max to domain
const dataToColorMap = d3.scaleLinear().domain([0,60]).range([0,1]);

const pieChart = pie()
  .sort(null)
  .value(d => d.value);

const PieChart = ({ data }) => (
  <div style={{display:'flex', justifyContent:'row'}}>
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
    {/* Turn into presentational */}
    <body>
      <table id='ver-minimalist'>
      <tr>
        <th>State</th>
        <th>Category</th>
        <th>Revenue($)</th>
      </tr>
      <tr>
        <td>NY</td>
        <td>Game</td>
        <td>$2,000 </td>
        <td><button>Launch Campaign</button></td>
        </tr>
        <tr>
        <td>NJ</td>
        <td>Sports</td>
        <td>$700</td>
        <td><button>Launch Campaign</button></td>
        </tr>
        <tr>
        <td>MA</td>
        <td>Computers</td>
        <td>$6,000 </td>
        <td><button>Launch Campaign</button></td>
        </tr>
        <tr>
        <td>CO</td>
        <td>Toys</td>
        <td>$800</td>
        <td><button>Launch Campaign</button></td>
        </tr>
      </table>
    </body>
  </div>
);

  export default PieChart;
