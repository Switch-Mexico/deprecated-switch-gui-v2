

import loadZones from '../../../../../data/load_zones/coordinates';

export function showCircles(map) {
    
    Object.keys(loadZones).forEach(function(key) {
        L.circle([loadZones[key][0],loadZones[key][1]], {
            color: '#ff4949', //set the points color opacity and radius
            fillColor: '#ff4949',
            fillOpacity: .3,
            opacity:.3,
            radius: 25000
        }).on('click', () => console.log(key)).addTo(map);

    }); 
    
}