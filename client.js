// client for epc-network-homework app
// usage: node client.js [input-CSV-filename]
// Author: Grzegorz Jarząbek

var request = require('request');
var fs = require('fs');
var r = request.post("http://localhost:3000/upload");

const Inputfilename = process.argv[2];

var upload = fs.createReadStream(Inputfilename, { highWaterMark: 500 });
var download = fs.createWriteStream(`Filtered-${Inputfilename}`);

r.on('data',(chunk) => {
    download.write(chunk);
});

upload.pipe(r);

var upload_progress = 0;
upload.on("data", function (chunk) {
  upload_progress += chunk.length
  console.log(new Date(), upload_progress);
})

upload.on("end", function (res) {
  console.log('Finished');
})