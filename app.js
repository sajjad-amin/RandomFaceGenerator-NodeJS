const fetch = require('node-fetch')
const path = require('path');
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const createFace = amount => {
    let i = amount;
    fetch('https://thispersondoesnotexist.com/image')
        .then(r => r.blob())
        .then(r => {
            let stream = r.stream();
            stream.on('data', chunk => {
                fs.createWriteStream(path.join(__dirname, 'img', `${Math.random()}.jpg`)).write(chunk, err => {
                    console.log(`face ${i} created`);
                    if(i > 1){
                        createFace(i-1);
                    }
                });
            })
        })
}
const p = new Promise(resolve => {
    readline.question('How many face you want to create? ', quantity => {
        resolve(quantity);
        readline.close();
    })
})
p.then(quantity => {
    createFace(quantity);
})