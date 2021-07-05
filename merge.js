var mergeJSON = require("merge-json");
var jsonMerger = require("json-merger");

const fs = require('fs');

let a = fs.readFileSync('data/coordonees.json');
let b = fs.readFileSync('data/regionales.json');

let results = jsonMerger.mergeFiles(['data/coordonees.json','data/regionales2021.json']);
console.log(results)
fs.writeFileSync("regionalesmerged.json", JSON.stringify(results))
