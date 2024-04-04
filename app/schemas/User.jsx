import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street:{
        type:String, 
    },
    city:{
        type:String,
    },
    postcode:{
        type:Number,
    },
    region:{
        type:String,
    },
    country:{
        type:String,
    }
});


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default:"" 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order'
    }],
    address:{
        type:addressSchema
    },
    role:{
        type:String,
        immutable: true,
        default:"user"
    }
});

//prevent the modification of the User role
userSchema.pre('validate', function(next) {
    if (this.isNew) {
        // If the document is new, set the role to the default value
        this.role = 'user';
    }
    // Mark the role property as immutable
    this.schema.path('role').immutable(true);
    next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema); 

module.exports = User; 