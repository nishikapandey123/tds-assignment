const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Import the path module

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fullstackdb', { useNewUrlParser: true, useUnifiedTopology: true });

const dataSchema = new mongoose.Schema({
    clientName: String,
    guardianType: String,
    guardianName: String,
    dob: String,
    mobileNo: String,
    additionalMobileNo: String,
    address: String,
    state: String,
    district: String,
    city: String,
    nextFollowUpDate: String
});

const Data = mongoose.model('Data', dataSchema);

app.post('/saveData', async (req, res) => {
    const newData = new Data({
        clientName: req.body.clientName,
        guardianType: req.body.guardianType,
        guardianName: req.body.guardianName,
        dob: req.body.dob,
        mobileNo: req.body.mobileNo,
        additionalMobileNo: req.body.additionalMobileNo,
        address: req.body.address,
        state: req.body.state,
        district: req.body.district,
        city: req.body.city,
        nextFollowUpDate: req.body.nextFollowUpDate
    });

    try {
        await newData.save();
        res.send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});


app.get('/getData', async (req, res) => {
    try {
        const data = await Data.find({}).lean().exec();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});




// Serve static files
app.use(express.static(path.join(__dirname)));

// Handle other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
