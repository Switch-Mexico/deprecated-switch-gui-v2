import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart, Line
} from 'recharts';

const CustomizedLabel = React.createClass({
  
render () {
  const {x, y, fill, value} = this.props;
   return <text fontSize='56' 
             fontFamily='sans-serif'
             fill="white"
             >{value}%</text>
}
});

export default class C extends React.Component {
  render() {
    console.log(this.props)
    if (true) {

      return (
        <ResponsiveContainer>
          <ComposedChart layout="vertical" width={600} height={400} data={this.props.data[0].value}
                margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <XAxis type="number" unit=" MW" />
            <YAxis dataKey="name" type="category" className="test-text" allowDataOverflow={true} 
            padding={{ left: 20, right: 200 }} width={180} />
            <Tooltip/>
            <Legend/>
            <CartesianGrid stroke='#f5f5f5'/>
            <Bar dataKey='Capacity Limit' barSize={15} fill='#413ea0' unit=" MW"/>
          </ComposedChart>
        </ResponsiveContainer>
      );
    }
    return <div />;
  }
}
