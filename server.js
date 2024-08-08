let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://senehebalasuriya123:YbHg1WSR30KZKi6w@cluster0.dhrdt.mongodb.net/testApp?retryWrites=true&w=majority"
let port = process.env.port || 3040;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Pictures');
        // console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/api/pictures', async(req,res) => {
    try{
    const response= await collection.find().sort({"_id":-1}).limit(1).toArray()
    console.log(response);
    res.json({statusCode:200, data:response[0], message:'success'});
    }catch(error){
        console.log(error);
        res.json({statusCode:500, data:null, message:'fail'});
    }
});

app.post('/api/pictures', async (req,res)=>{
    let pictureData = req.body;
    try{
        const response = await collection.insertOne(pictureData);
        console.log(response);
        res.json({statusCode:201, data:response, message:'success'});
    }catch(error){
        console.log(error);
        res.json({statusCode:422, data:null, message:'fail'});
        
    }
});


    runDBConnection();


app.listen(port, ()=>{
    console.log(`express server started ${port}`);
});