const transaction = require('../models/transaction')

class Transaction {
    static addTransaction(req, res) {
        transaction
            .create({
                member: req.body.member,
                out_date: new Date(),
                due_date: req.body.due_date,
                fine: 0,
                booklist: req.body.booklist
            })
            .then(function (newTransaction) {
                res.status(201).json(newTransaction)
            })
            .catch(function (err) {
                if (err.errors.member) {
                    res.status(400).json(err.errors.member.message)
                }
                else if (err.errors.due_date) {
                    res.status(400).json(err.errors.due_date.message)
                }
                else if (err.errors.booklist) {
                    res.status(400).json(err.errors.booklist.message)
                }
                else {
                    res.status(500).json(err)
                }
            })
    }

    static getAllTransaction(req, res) {
        if (req.query.id) {
            let books = []
            transaction
                .find()
                .populate('booklist')
                .then(function (transactions) {
                    transactions.forEach(e => {
                        console.log(e.booklist)
                        e.booklist.forEach(f => {
                            if ((f._id.toString()) == req.query.id) {
                                books.push(e)
                            }
                        })
                    })
                    res.status(200).json(books)
                })
                .catch(function (err) {
                    console.log(err)
                    res.status(500).json(err)
                })
        }
        else {
            transaction
                .find()
                .populate('member')
                .populate('booklist')
                .then(function (transactions) {
                    res.status(200).json(transactions)
                })
                .catch(function (err) {
                    res.status(500).json(err)
                })
        }
    }

    static updateTransaction(req, res) {
        transaction
            .findByIdAndUpdate(req.params._id, {
                in_date: req.body.in_date
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

    static deleteTransaction(req, res) {
        transaction
            .findByIdAndDelete(req.params._id)
            .then(function (book) {
                res.status(200).json(book)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = Transaction