import React, { Component } from 'react';
import { hexbin } from 'd3-hexbin';
import * as d3 from 'd3';
import PieChart from './PieChart';


const testData = [
  {
    "key":"Sunday",
    "value":0
  },
  {
    "key":"Monday",
    "value":0
  },
  {
    "key":"Tuesday",
    "value":0
  },
  {
    "key":"Wednesday",
    "value":0
  },
  {
    "key":"Thrusday",
    "value":0
  },
  {
    "key":"Friday",
    "value":0
  },
  {
    "key":"Saturday",
    "value":0
  },
  {
    "key":"Sunday",
    "value":0
  },
  {
    "key":"Monday",
    "value":0
  },
  {
    "key":"Tuesday",
    "value":0
  },
  {
    "key":"Wednesday",
    "value":0
  },
  {
    "key":"Thrusday",
    "value":0
  },
  {
    "key":"Friday",
    "value":0
  },
  {
    "key":"Saturday",
    "value":0
  },
  {
    "key":"Sunday",
    "value":0
  },
  {
    "key":"Monday",
    "value":0
  },
  {
    "key":"Tuesday",
    "value":0
  },
  {
    "key":"Wednesday",
    "value":0
  },
  {
    "key":"Thrusday",
    "value":0
  },
  {
    "key":"Friday",
    "value":0
  },
  {
    "key":"Saturday",
    "value":0
  },
  {
    "key":"Sunday",
    "value":0
  },
  {
    "key":"Monday",
    "value":0
  },
  {
    "key":"Tuesday",
    "value":0
  },
  {
    "key":"Wednesday",
    "value":0
  },
  {
    "key":"Thrusday",
    "value":0
  },
  {
    "key":"Friday",
    "value":0
  },
  {
    "key":"Saturday",
    "value":0
  },
  {
    "key":"Sunday",
    "value":10
  },
  {
    "key":"Monday",
    "value":10
  },
  {
    "key":"Tuesday",
    "value":10
  },
  {
    "key":"Wednesday",
    "value":10
  },
  {
    "key":"Thrusday",
    "value":10
  },
  {
    "key":"Friday",
    "value":10
  },
  {
    "key":"Saturday",
    "value":10
  },
  {
    "key":"Sunday",
    "value":10
  },
  {
    "key":"Monday",
    "value":10
  },
  {
    "key":"Tuesday",
    "value":10
  },
  {
    "key":"Wednesday",
    "value":10
  },
  {
    "key":"Thrusday",
    "value":10
  },
  {
    "key":"Friday",
    "value":10
  },
  {
    "key":"Saturday",
    "value":10
  },
  {
    "key":"Sunday",
    "value":20
  },
  {
    "key":"Monday",
    "value":20
  },
  {
    "key":"Tuesday",
    "value":20
  },
  {
    "key":"Wednesday",
    "value":20
  },
  {
    "key":"Thrusday",
    "value":20
  },
  {
    "key":"Friday",
    "value":20
  },
  {
    "key":"Saturday",
    "value":20
  },
  {
    "key":"Sunday",
    "value":20
  },
  {
    "key":"Monday",
    "value":20
  },
  {
    "key":"Tuesday",
    "value":20
  },
  {
    "key":"Wednesday",
    "value":20
  },
  {
    "key":"Thrusday",
    "value":20
  },
  {
    "key":"Friday",
    "value":20
  },
  {
    "key":"Saturday",
    "value":20
  },
  {
    "key":"Sunday",
    "value":30
  },
  {
    "key":"Monday",
    "value":30
  },
  {
    "key":"Tuesday",
    "value":30
  },
  {
    "key":"Wednesday",
    "value":30
  },
  {
    "key":"Thrusday",
    "value":30
  },
  {
    "key":"Friday",
    "value":30
  },
  {
    "key":"Saturday",
    "value":30
  },
  {
    "key":"Sunday",
    "value":40
  },
  {
    "key":"Monday",
    "value":40
  },
  {
    "key":"Tuesday",
    "value":40
  },
  {
    "key":"Wednesday",
    "value":40
  },
  {
    "key":"Thrusday",
    "value":40
  },
  {
    "key":"Friday",
    "value":40
  },
  {
    "key":"Saturday",
    "value":40
  },
  {
    "key":"Sunday",
    "value":40
  },
  {
    "key":"Monday",
    "value":40
  },
  {
    "key":"Tuesday",
    "value":40
  },
  {
    "key":"Wednesday",
    "value":40
  },
  {
    "key":"Thrusday",
    "value":40
  },
  {
    "key":"Friday",
    "value":40
  },
  {
    "key":"Saturday",
    "value":40
  },
  {
    "key":"Sunday",
    "value":20
  },
  {
    "key":"Monday",
    "value":40
  },
  {
    "key":"Tuesday",
    "value":40
  },
  {
    "key":"Wednesday",
    "value":40
  },
  {
    "key":"Thrusday",
    "value":40
  },
  {
    "key":"Friday",
    "value":40
  },
  {
    "key":"Saturday",
    "value":20
  },

    {
      "key":"Sunday",
      "value":10
    },
    {
      "key":"Monday",
      "value":20
    },
    {
      "key":"Tuesday",
      "value":20
    },
    {
      "key":"Wednesday",
      "value":20
    },
    {
      "key":"Thrusday",
      "value":20
    },
    {
      "key":"Friday",
      "value":20
    },
    {
      "key":"Saturday",
      "value":10
    },
    {
      "key":"Sunday",
      "value":10
    },
    {
      "key":"Monday",
      "value":50
    },
    {
      "key":"Tuesday",
      "value":50
    },
    {
      "key":"Wednesday",
      "value":50
    },
    {
      "key":"Thrusday",
      "value":50
    },
    {
      "key":"Friday",
      "value":50
    },
    {
      "key":"Saturday",
      "value":10
    },
    {
      "key":"Sunday",
      "value":10
    },
    {
      "key":"Monday",
      "value":50
    },
    {
      "key":"Tuesday",
      "value":50
    },
    {
      "key":"Wednesday",
      "value":50
    },
    {
      "key":"Thrusday",
      "value":50
    },
    {
      "key":"Friday",
      "value":50
    },
    {
      "key":"Saturday",
      "value":10
    },
    {
      "key":"Sunday",
      "value":10
    },
    {
      "key":"Monday",
      "value":60
    },
    {
      "key":"Tuesday",
      "value":60
    },
    {
      "key":"Wednesday",
      "value":60
    },
    {
      "key":"Thrusday",
      "value":60
    },
    {
      "key":"Friday",
      "value":60
    },
    {
      "key":"Saturday",
      "value":10
    },
    {
      "key":"Sunday",
      "value":10
    },
    {
      "key":"Monday",
      "value":60
    },
    {
      "key":"Tuesday",
      "value":60
    },
    {
      "key":"Wednesday",
      "value":60
    },
    {
      "key":"Thrusday",
      "value":60
    },
    {
      "key":"Friday",
      "value":60
    },
    {
      "key":"Saturday",
      "value":10
    },
    {
      "key":"Sunday",
      "value":10
    },
    {
      "key":"Monday",
      "value":60
    },
    {
      "key":"Tuesday",
      "value":60
    },
    {
      "key":"Wednesday",
      "value":60
    },
    {
      "key":"Thrusday",
      "value":60
    },
    {
      "key":"Friday",
      "value":60
    },
    {
      "key":"Saturday",
      "value":10
    },
    {
      "key":"Sunday",
      "value":10
    },
    {
      "key":"Monday",
      "value":20
    },
    {
      "key":"Tuesday",
      "value":20
    },
    {
      "key":"Wednesday",
      "value":20
    },
    {
      "key":"Thrusday",
      "value":20
    },
    {
      "key":"Friday",
      "value":20
    },
    {
      "key":"Saturday",
      "value":10
    },
    {
      "key":"Sunday",
      "value":10
    },
    {
      "key":"Monday",
      "value":10
    },
    {
      "key":"Tuesday",
      "value":10
    },
    {
      "key":"Wednesday",
      "value":10
    },
    {
      "key":"Thrusday",
      "value":10
    },
    {
      "key":"Friday",
      "value":10
    },
    {
      "key":"Saturday",
      "value":10
    },
    {
      "key":"Sunday",
      "value":0
    },
    {
      "key":"Monday",
      "value":0
    },
    {
      "key":"Tuesday",
      "value":0
    },
    {
      "key":"Wednesday",
      "value":0
    },
    {
      "key":"Thrusday",
      "value":0
    },
    {
      "key":"Friday",
      "value":0
    },
    {
      "key":"Saturday",
      "value":0
    },
    {
      "key":"Sunday",
      "value":0
    },
    {
      "key":"Monday",
      "value":0
    },
    {
      "key":"Tuesday",
      "value":0
    },
    {
      "key":"Wednesday",
      "value":0
    },
    {
      "key":"Thrusday",
      "value":0
    },
    {
      "key":"Friday",
      "value":0
    },
    {
      "key":"Saturday",
      "value":0
    },
    {
      "key":"Sunday",
      "value":0
    },
    {
      "key":"Monday",
      "value":0
    },
    {
      "key":"Tuesday",
      "value":0
    },
    {
      "key":"Wednesday",
      "value":0
    },
    {
      "key":"Thrusday",
      "value":0
    },
    {
      "key":"Friday",
      "value":0
    },
    {
      "key":"Saturday",
      "value":0
    },
    {
      "key":"Sunday",
      "value":0
    },
    {
      "key":"Monday",
      "value":0
    },
    {
      "key":"Tuesday",
      "value":0
    },
    {
      "key":"Wednesday",
      "value":0
    },
    {
      "key":"Thrusday",
      "value":0
    },
    {
      "key":"Friday",
      "value":0
    },
    {
      "key":"Saturday",
      "value":0
    }
]


class HeatMap extends Component {

  constructor(props){
    super(props);
    // const { data } = this.props;
    this.state = {
      data: testData ? testData : [],
      pieData: [
        { label: '<5', value: 4 },
        { label: '5-13', value: 13 },
        { label: '14-17', value: 14 },
        { label: '18-24', value: 20 },
        { label: '25-44', value: 30 },
        { label: '45-64', value: 60 }
      ]
    },
    this.onHexClick = this.onHexClick.bind(this);
  };

  onHexClick(i){
    console.log('click AGAIN',i);
    console.log('pie', this.state.data);
    this.state.pieData[0].label = `label ${i}`;
    // console.log('New Pie Data', this.state.pieData);
    // var test = [
    //   { label: `label ${i}`, value: 2704659 },
    //   { label: '5-13', value: 4499890 },
    //   { label: '14-17', value: 2159981 },
    //   { label: '18-24', value: 3853788 },
    //   { label: '25-44', value: 14106543 },
    //   { label: '45-64', value: 8819342 },
    //   { label: '≥65', value: 612463 },
    // ];
    // this.setState({ pieData: test });
    // console.log('Color scale', colorScale);
  };

  render () {
  const { pieData } = this.state;
  const { doSomething } = this;
  const margin = {
    top: 60,
    right: 20,
    bottom: 20,
    left: 50
  },
  width = 850,
  height = 350;

  const hexData = d3.nest()
                .key(function(d) {
                  return d.key;
                })
                .entries(this.state.data),
  MapColumns = hexData.reduce(function(a,b){
                      if(a.values.length > b.values.length){
                        return a;
                      }else{
                        return b;
                      }
                    }).values.length,
  MapRows = hexData.length,
  hexRadius = d3.min([width/((MapColumns + 0.6) * Math.sqrt(3)),height/((MapRows + 1/3) * 1.5)]),
  colours=["#5490c1", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"],
  colorScale = d3.scaleLinear()
                .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
                .range(colours),
  dataToColorMap = d3.scaleLinear().domain([0,60]).range([0,1]);

  var points = [];
  for (var i = 0; i < MapRows; i++) {
      for (var j = 0; j < MapColumns; j++) {
          points.push([hexRadius * j * 1.75, hexRadius * i * 1.5,hexData[i].values[j].value]);
      }
  };

  const hexbinPath = hexbin().radius(hexRadius);
  console.log('BUILD HEX');
  console.log(`hexData ${hexData}`,hexData);
  console.log(`MapColumns`,MapColumns);
  console.log(`hexRadius`,hexRadius);
  console.log(`points`,points);
  console.log(`hexagon()`,hexbinPath.hexagon() );
  console.log(`hexagon()`,hexbinPath.hexagon() );
  console.log('*---*');
  const hours = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];
  return (
    <div>
      <svg width={width+margin.left+margin.right} height={height + margin.top + margin.bottom+100}>
        <g transform={"translate(10," + 50 + ")"}>
        {hours.map((d,i)=><text key={i} x={70 + hexRadius * i * 1.75} y={-15}>{d}</text>)}
        </g>
        <g transform={"translate(10," + margin.top + ")"}>
        {hexData.map((d,i)=><text key={i} x='0' y={i + hexRadius * i * 1.5}>{d.key}</text>)}
        </g>
        <g transform={"translate(90," + margin.top + ")"}>
        {hexbinPath(points).map((d,i)=>
         <g className="hexPath" key={i} onClick={() => {
            onHexClick(d[0][2]);
          }}>

          <path shapeRendering="geometricPrecision" transform={"translate(" + d.x + "," + d.y + ")"} d={hexbinPath.hexagon()} style={{fill:colorScale(dataToColorMap(d[0][2]))}}/>
          <text transform={"translate(" + (d.x-7) + "," + (d.y+5) + ")"} >{d[0][2]}</text>
        </g>
        )}
        </g>
        <g>
          <linearGradient id="linearGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          {colours.map((d,i)=><stop key={i} offset={i/(colours.length-1)} stopColor={d}/>)}
          </linearGradient>
          <text x={margin.left+200} y={height-margin.bottom -50} style={{fontSize:14}}>Orders per  hour</text>
          <rect style={{fill:'url(#linearGradient)'}} x={margin.left+200} y={height- margin.bottom -40} width={(width-40)/2} height="10" />
          <text x={margin.left+200} y={height-margin.bottom -10} style={{fontSize:14}}>0 (min)</text>
          <text x={margin.left+580} y={height-margin.bottom -10} style={{fontSize:14}}>60 (max)</text>
        </g>
      </svg>
      <PieChart data={this.state.pieData}/>
    </div>
  );
  }
}

export default HeatMap;
