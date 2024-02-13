// item.js in /models folder

let mongoose = require('mongoose');

// create a model class
let itemModel = mongoose.Schema({ // Define The Schema
    Name: String,
    Age: String,
    Role: String,
    Location: String,
    Date: String,
    TrainingProvided: String,
},
{
    collection:"Data"
});
module.exports = mongoose.model('Item',itemModel); // Export The Page