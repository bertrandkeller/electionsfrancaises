var NodeGeocoder = require('node-geocoder');
const csv = require('csv-parser');
const fs = require('fs');

var options = {
  provider: 'yandex',

  // Optional depending on the providers
  //httpAdapter: 'https', // Default
  //apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
  formatter: null,         // 'gpx', 'string', ...
  language: "fr"
};

var geocoder = NodeGeocoder(options);

fs.createReadStream('_data/commune.csv')
  .pipe(csv())
  .on('data', (row) => {
    const address = row['Libellé de la commune'] + row['Libellé du département'] + row.Code;
    geocoder.geocode(address)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });


