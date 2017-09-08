import React from 'react';
import Buttons from './Buttons';

import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from 'recharts';


const data = [{name: 'Hydroelectric', value: 11},
{name: 'Wind', value: 9},
{name: 'Combined Cycle', value: 67},
{name: 'Coal', value: 2},
{name: 'Bioenergy', value: 3},
{name: 'Photovoltaic', value: 5},
{name: 'Nuclear Power', value: 3}]

const COLORS = ['#0088FE', 
  '#bdc3c7',
  '#e74c3c', 
  '#2c3e50',
  '#2ecc71',
  '#f1c40f',
  '#9b59b6',
  ];  

const StraightAnglePieChart = React.createClass({
	render () {
  	return (
      <ResponsiveContainer>
        <PieChart>
          <Pie startAngle={180} endAngle={0} data={data} cy={250} outerRadius={180} fill="#8884d8" label>
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