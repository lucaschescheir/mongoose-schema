
const mongoose = require('mongoose');





const shoeSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: String,
    pictureUrl: String,
    details: [{
        size: { type: Number },
        price: Number,
        type: {type: String}
    }],

})

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;
