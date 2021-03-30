// client for epc-network-homework app
// usage: node client.js [input-CSV-filename]
// Author: Grzegorz Jarząbek

var request = require('request');
var fs = require('fs');
var r = request.post("http://localhost:3000/upload");

const UPLOAD_PATH = process.argv[2];
const DOWNLOAD_PATH = UPLOAD_PATH.substring(0, UPLOAD_PATH.length-4) + "-filtered.csv";

var upload = fs.createReadStream(UPLOAD_PATH, { highWaterMark: 500 });
var download = fs.createWriteStream(DOWNLOAD_PATH);

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
