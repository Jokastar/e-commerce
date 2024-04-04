const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    postcode: Number,
    region: String,
    country: String
});


module.exports = {
    addressSchema : addressSchema
}; 