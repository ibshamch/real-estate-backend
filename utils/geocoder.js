const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'opencage',
  httpAdapter: 'https',
  apiKey: "62015b0ea17d4c8cb22766075a5b92c9",
  formatter: null
};

const geocoder = NodeGeocoder(options);
module.exports = geocoder;  


// // Function to geocode an address
// async function geocodeAddress(address) {
//   try {
//     const res = await geocoder.geocode(address);
//     console.log("Geocode Result:", res);
//   } catch (err) {
//     console.error("Error geocoding address:", err);
//   }
// }

// // Function to reverse geocode (from latitude/longitude to address)
// async function reverseGeocode(lat, lon) {
//   try {
//     const res = await geocoder.reverse({ lat, lon });
//     console.log("Reverse Geocode Result:", res);
//   } catch (err) {
//     console.error("Error reverse geocoding:", err);
//   }
// }
// // geocodeAddress("St 145 Sec H Comm. Ph 1") 
// reverseGeocode(31.482028, 74.394833)

