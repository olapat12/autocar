const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    fuelLevel:{
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("cars", carSchema);
