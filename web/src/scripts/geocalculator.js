export function calculateDistanceAndScore(lat1, lon1, lat2, lon2) {
  let kilometers = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  let miles = kilometers * 0.621371;
  let feet = Math.floor((miles % 1) * 5280);
  let score = calculateScore(miles);

  return {
    distance: `${Math.floor(miles)} Miles and ${feet} feet`,
    score: score,
  };
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

//y= -0.25 + 1000
function calculateScore(distance) {
  let score = -0.25 * distance + 1000;
  if (score > 1000) {
    score = 1000;
  }
  if (score < 0) {
    score = 0;
  }
  return score;
}
