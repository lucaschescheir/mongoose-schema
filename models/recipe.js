
const mongoose = require('mongoose');





const shoeSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    details: [{
        size: { type: Number, required: true },
        price: Number,
        year: Number
    }],
    description: [String]
})

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;
