const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs').promises;
const { readFile } = require ('fs');
const fileName = path.join(__dirname, './config/fileArray.json');

// register view engine
app.set('view engine', 'ejs');

// adding express static files
app.use(express.static(path.join(__dirname, '../views/public')));

// Initialize the Express Body Parser
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));

app.get('/', async(req, res, next) => {
    try{
        const{ msg } = req.query;

        const data = await fs.readFile(fileName);

        const notes = JSON.parse(data.toString()).array;

        res.status(200).render('./public/home', {data: {notes}, message: msg});
    }catch(err){
        res.status(400).json({"message": err.message})
    }
})

app.post('/api/add', async(req, res, next) => {
    try{
        const { name, price } = req.body;

        let file = await fs.readFile(fileName);

        file = JSON.parse(file.toString());

        const id = file.array.length>0? parseInt(file.array[file.array.length-1].id) + 1: 1;

        file.array.push({
            id,
            name,
            price: parseInt(price),
            createdAt: new Date()
        })

        fs.writeFile(fileName, JSON.stringify(file, null, 2), (err) => {
            if(err){
                return console.log(err);
            }
        });

        res.status(200).redirect('/?msg=SuccesAdding');
    }catch(err){
        res.status(400).json({"message": err.message})
    }
})

app.get('/api/delete/:id', async (req, res, next) => {
    try{
        const { id } = req.params;

        let file = await fs.readFile(fileName);

        file = JSON.parse(file.toString());
        
        const result = await file.array.find((o, i) => {
            if (o.id == id) {
                file.array.splice(i, 1);
                return true; // stop searching
            }
        });

        fs.writeFile(fileName, JSON.stringify(file, null, 2), (err) => {
            if(err){
                return console.log(err);
            }
        });

        res.status(200).redirect('/?msg=SuccesDeleting');
    }catch(err){
        res.status(400).json({"message": err.message})
    }
})

// Start the Server Listening
app.listen(3000, async() => {
    console.log(`Listening on port 3000`);
});
  