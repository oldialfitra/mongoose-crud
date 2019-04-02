const book = require('../models/book')

class Book {
    static addBook(req, res) {
        book
            .create({
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            })
            .then(function (newBook) {
                res.status(201).json(newBook)
            })
            .catch(function (err) {
                if (err.errors.isbn) {
                    res.status(400).json(err.errors.isbn.message)
                }
                else if (err.errors.title) {
                    res.status(400).json(err.errors.title.message)
                }
                else if (err.errors.author) {
                    res.status(400).json(err.errors.author.message)
                }
                else if (err.errors.category) {
                    res.status(400).json(err.errors.category.message)
                }
                else if (err.errors.stock) {
                    res.status(400).json(err.errors.stock.message)
                }
                else {
                    res.status(500).json(err)
                }
            })
    }

    static getAllBooks(req, res) {
            for (const key in req.query) {
                req.query[key] = new RegExp(req.query[key] + '.*', 'i')
            }
            book
                .find({ ...req.query })
                .then(function (books) {
                    console.log(books)
                    res.status(200).json(books)
                })
                .catch(function (err) {
                    res.status(500).json({
                        message: err
                    })
                })
    }

    static updateBook(req, res) {
        book
            .findByIdAndUpdate(req.params._id, {
                $set: req.body
            }, {
                    new: true
                })
            .then(function (book) {
                res.status(200).json(book)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static deleteMember(req, res) {
        book
            .findByIdAndDelete(req.params._id)
            .then(function (book) {
                res.status(200).json(book)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = Book