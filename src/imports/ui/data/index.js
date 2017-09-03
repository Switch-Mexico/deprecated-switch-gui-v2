// importing GeoJSON files, there is no need to write out the file extension in here, though it is extremly importat to change the actual file extensions from ".geojson" to ".json"

import p_b_a_00 from '../data/balancing_areas/prodesen/b_a_00';
import p_b_a_01 from '../data/balancing_areas/prodesen/b_a_01';
import p_b_a_02 from '../data/balancing_areas/prodesen/b_a_02';
import p_b_a_03 from '../data/balancing_areas/prodesen/b_a_03';
import p_b_a_04 from '../data/balancing_areas/prodesen/b_a_04';
import p_b_a_05 from '../data/balancing_areas/prodesen/b_a_05';
import p_b_a_06 from '../data/balancing_areas/prodesen/b_a_06';
import p_b_a_07 from '../data/balancing_areas/prodesen/b_a_07';
import p_b_a_08 from '../data/balancing_areas/prodesen/b_a_08';
import p_b_a_09 from '../data/balancing_areas/prodesen/b_a_09';

import s_b_a_00 from '../data/balancing_areas/switch/b_a_00';
import s_b_a_01 from '../data/balancing_areas/switch/b_a_01';
import s_b_a_02 from '../data/balancing_areas/switch/b_a_02';
import s_b_a_03 from '../data/balancing_areas/switch/b_a_03';
import s_b_a_04 from '../data/balancing_areas/switch/b_a_04';
import s_b_a_05 from '../data/balancing_areas/switch/b_a_05';
import s_b_a_06 from '../data/balancing_areas/switch/b_a_06';
import s_b_a_07 from '../data/balancing_areas/switch/b_a_07';
import s_b_a_08 from '../data/balancing_areas/switch/b_a_08';
import s_b_a_09 from '../data/balancing_areas/switch/b_a_09';

// Schema of a country. In this case Mexico has 54 load zones clustered in 9 balancing areas. Also we have two types of shapes (1.-provided by PRODESEN and 2.- builded by SWITCH team)
let getCountry = () => ({
  type: 'CountryCollection',
  name: 'Mexico',
  balancingAreas: {
    '10': {
      type: 'balancingArea',
      properties: {
        ID: '10-baja_california_sur-mulege',
        name: 'Baja California Sur Mulege',
        shape: {
          Prodesen: p_b_a_00,
          Switch: s_b_a_00,
        },
        color: '#E39A31',
      },
    },
    '08': {
      type: 'balancingArea',
      properties: {
        ID: '08-baja_california',
        name: 'Baja California',
        shape: {
          Prodesen: p_b_a_08,
          Switch: s_b_a_08,
        },
        color: '#E34A33',
      },
    },
    '09': {
      type: 'balancingArea',
      properties: {
        ID: '09-baja_california_sur',
        name: 'Baja California Sur',
        shape: {
          Prodesen: p_b_a_09,
          Switch: s_b_a_09,
        },

        color: '#7fc97f',
      },
    },
    '04': {
      type: 'balancingArea',
      properties: {
        ID: '04-noroeste',
        name: 'Noroeste',
        shape: {
          Prodesen: p_b_a_04,
          Switch: s_b_a_04,
        },
        color: '#636363',
      },
    },
    '05': {
      type: 'balancingArea',
      properties: {
        ID: '05-norte',
        name: 'Norte',
        shape: {
          Prodesen: p_b_a_05,
          Switch: s_b_a_05,
        },
        color: '#756BB1',
      },
    },
    '06': {
      type: 'balancingArea',
      properties: {
        ID: '06-noreste',
        name: 'Noreste',
        shape: {
          Prodesen: p_b_a_06,
          Switch: s_b_a_06,
        },
        color: '#feb24c',
      },
    },
    '03': {
      type: 'balancingArea',
      properties: {
        ID: '03-occidental',
        name: 'Occidental',
        shape: {
          Prodesen: p_b_a_03,
          Switch: s_b_a_03,
        },
        color: '#e41a1c',
      },
    },
    '01': {
      type: 'balancingArea',
      properties: {
        ID: '01-central',
        name: 'Central',
        shape: {
          Prodesen: p_b_a_01,
          Switch: s_b_a_01,
        },
        color: '#2CA25F',
      },
    },
    '02': {
      type: 'balancingArea',
      properties: {
        ID: '02-oriental',
        name: 'Oriental',
        shape: {
          Prodesen: p_b_a_02,
          Switch: s_b_a_02,
        },
        color: '#2B8CBE',
      },
    },
    '07': {
      type: 'balancingArea',
      properties: {
        ID: '07-peninsular',
        name: 'Peninsular',
        shape: {
          Prodesen: p_b_a_07,
          Switch: s_b_a_07,
        },
        color: '#C51B8A',
      },
    },
  },

  loadZones: {},
});

export default getCountry;
