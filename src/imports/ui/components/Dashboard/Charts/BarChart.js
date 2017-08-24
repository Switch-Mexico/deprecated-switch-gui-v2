import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';

import da from '../../../data/index';

export default class C extends React.Component {
  render() {
    if (
      this.props.data.values &&
      this.props.stacked &&
      typeof this.props.data.values != 'function'
    ) {
      let listItems = [];
      Object.entries(da.balancingAreas).forEach(([key, value]) => {
        listItems.push(
          <Bar
            key={value.properties.color}
            dataKey={value.properties.name}
            stackId="a"
            fill={value.properties.color}
          />
        );
      });
      return (
        <ResponsiveContainer>
          <BarChart data={this.props.data.values} margin={{ top: 20, right: 25, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {listItems}
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (this.props.data.name) {
      return (
        <ResponsiveContainer>
          <BarChart data={this.props.data.values} margin={{ top: 20, right: 25, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey={this.props.data.name} stackId="a" fill={this.props.color} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    return <div />;
  }
}
