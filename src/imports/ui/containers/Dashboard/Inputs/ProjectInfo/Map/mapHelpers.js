

import loadZones from '../../../../../data/load_zones/coordinates';

export function showCircles(map,props) {
    
    Object.keys(loadZones).forEach(function(key) {
        L.circle([loadZones[key][0],loadZones[key][1]], {
            color: '#66CD00', //set the points color opacity and radius
            fillColor: '#66CD00',
            fillOpacity: 1,
            opacity: 1,
            radius: 25000
        }).on('click', () => props.setLoadZoneID(key)).addTo(map);

    }); 
    
}