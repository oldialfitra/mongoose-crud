const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const bookSchema = new Schema({
    isbn: {
        type: String,
        required: [true, 'ISBN required']
    },
    title: {
        type: String,
        required: [true, 'Title required']
    },
    author: {
        type: String,
        required: [true, 'Author required']
    },
    category: {
        type: String,
        required: [true, 'Category required']
    },
    stock: {
        type: String,
        required: [true, 'Stock required']
    }
})

const Books = mongoose.model('Book', bookSchema)

module.exports = Books