const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter category name'],
            trim: true,
        },
    }
)

module.exports = mongoose.model('Category', categorySchema)