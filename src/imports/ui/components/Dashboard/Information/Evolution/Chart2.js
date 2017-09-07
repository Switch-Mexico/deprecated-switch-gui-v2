import React from 'react';
import Buttons from './Buttons';

import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];   

const data = [{name: 'Hydroelectric', value: 400}, {name: 'Combined Cycle', value: 300},
                  {name: 'Eolic', value: 300}, {name: 'Bioenergy', value: 200},
                  {name: 'Geothermal', value: 278}, {name: 'Solar', value: 189}]

const StraightAnglePieChart = React.createClass({
	render () {
  	return (
      <ResponsiveContainer>
        <PieChart>
          <Pie startAngle={180} endAngle={0} data={data} cy={250} outerRadius={200} fill="#8884d8" label>
          {
            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
          </Pie>
        </PieChart>
       </ResponsiveContainer>
    );
  }
})

export default StraightAnglePieChart;