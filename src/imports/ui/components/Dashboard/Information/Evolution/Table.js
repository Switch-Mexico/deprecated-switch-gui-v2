import React from 'react';
import { Table } from 'reactstrap';

const data = [
  { name: 'Hydroelectric', value: 11 },
  { name: 'Wind', value: 9 },
  { name: 'Combined Cycle', value: 67 },
  { name: 'Coal', value: 2 },
  { name: 'Bioenergy', value: 3 },
  { name: 'Photovoltaic', value: 5 },
  { name: 'Nuclear Power', value: 3 },
];

export default class T extends React.Component {
  render() {
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Technology</th>
            <th>MW</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hydroelectric</td>
            <td>11</td>
          </tr>
          <tr>
            <td>Wind</td>
            <td>9</td>
          </tr>
          <tr>
            <td>Combined Cycle</td>
            <td>67</td>
          </tr>
          <tr>
            <td>Coal</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Bioenergy</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Photovoltaic</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Nuclear Power</td>
            <td>3</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
