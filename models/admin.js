const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const adminmodel = mongoose.model('Airbnb_Admin', AdminSchema);
module.exports = adminmodel;