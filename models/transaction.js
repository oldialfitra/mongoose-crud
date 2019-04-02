const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    finePerDay = require('../helpers/fine')

const transactionSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: [true, 'Member required']
    },
    in_date: Date,
    out_date: Date,
    due_date: {
        type: Date,
        required: [true, 'Due date required']
    },
    fine: Number,
    booklist: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Booklist required']
    }]
})

transactionSchema.post('findOneAndUpdate', function (docs, next) {
    if (docs.in_date > docs.due_date) {
        docs.fine = finePerDay(docs.due_date, docs.in_date)
    } else {
        docs.fine = 0
    }
    docs.save()
    next()
})

const Transactions = mongoose.model('Transaction', transactionSchema)

module.exports = Transactions