import '/imports/ui/styles/App/HomeContainer.scss';
import { ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

import country from '../../../../data';

const CapacityChart = props => {
  if (props.data) {
    let listItems = [];
    let balancingAreas = country().balancingAreas;

    Object.entries(balancingAreas).forEach(([key, value]) => {
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
        <BarChart data={props.data.values} margin={{ top: 20, right: 25, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {listItems}
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return <div>Loading</div>;
};

export default CapacityChart;
