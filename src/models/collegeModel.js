const mongoose = require('mongoose')

const collegeSchema = mongoose.Schema({
    name: {
        type: String, unique: true, trim: true    
    },
    fullName: { type: String, required: true, trim: true 
    },
    logoLink: { type: String, required: true 
    },
    isDeleted: { type: boolean, default: false 
    }

}, { timestamps: true });

module.exports = mongoose.model("college", collegeSchema)



