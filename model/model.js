const mongoose = require('mongoose') 
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    Name: String,
    Category: String,
    Price: Number,
    SmallDesc: String,
    LongDesc: String,
    Quantity: String,
    Size: String,
    Img:Array,
});

const Product = mongoose.model('Product',ProductSchema); 
module.exports = Product