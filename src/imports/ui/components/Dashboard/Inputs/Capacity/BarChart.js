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

export default class C extends React.Component {
  render() {
    if (this.props.data && this.props.data.name) {
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
