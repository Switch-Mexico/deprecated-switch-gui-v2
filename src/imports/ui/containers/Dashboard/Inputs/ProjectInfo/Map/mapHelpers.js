

export function showCircles(coordinates) {
L.circle([coordinates[1],coordinates[0]], {
    color: '#ff4949', //set the points color opacity and radius
    fillColor: '#ff4949',
    fillOpacity: .3,
    opacity:.3,
    radius: 25000
  }).on('click', () => a.handleClick(id)).addTo(a.state.maps)

}