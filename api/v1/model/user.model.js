const mongoose = require('mongoose');

const { generateRandomString } =require("../helper/generate")

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true},
        tokenUser: { type: String,  },
        phone: String,
        avatar: { type: String, default: null },
        status: {
            type:String,
            default:'active'
        }, // 'active', 'inactive', 'banned'
        deleted: {
        type: Boolean,
        default: false,
        },
        deletedAt: { type: Date },
    },
    {
        timestamps: true,
       
    }
  
);



module.exports = mongoose.model('User', userSchema);
