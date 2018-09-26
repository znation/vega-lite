#!/usr/bin/env node
// script for npm run x-compile

const list = require('list-contents');
const fs = require('fs')
const specFolder = './examples/specs';
const vl = require('../build/vega-lite');
const trees = {}
function compile(vlSpec) {
  const result = vl.myCompile(vlSpec);
  return result;
}


list(specFolder,(o)=>{

  o.files.forEach(file => {
    let a;
    if (file.split('.').pop() !== 'json') {
      return;
    }

    const text = fs.readFileSync(specFolder+'/'+ file, 'utf8')
    try{
      const spec = JSON.parse(text);
      a = compile(spec);
      trees[file.split('.')[0]] = a;
    }
    catch (error){
      // console.log(file);
    }



  });
  writeToFile();

});
// const files = list(specFolder, (o) => o.files)

const writeToFile = () => fs.writeFileSync('serialized.json', JSON.stringify(trees));
// console.log(trees);
