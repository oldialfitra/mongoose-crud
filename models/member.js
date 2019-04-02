const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const memberSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    address: {
        type: String,
        required: [true, 'Address required']
    },
    zipcode: {
        type: String,
        required: [true, 'Zipcode required']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        validate: [
            {
                validator: function (val) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(val).toLowerCase());
                },
                message: `Email format invalid`
            },
            {
                validator: function (val) {
                    return this.model('Member').findOne({ email: val, _id: { $ne: this._id } })
                        .then(data => {
                            if (data) {
                                throw err;
                            }
                        })
                        .catch(err => {
                            throw err;
                        });
                },
                message: `Email already exists`
            }
        ]
    },
    phone: {
        type: String,
        minlength: [11, 'Minimal 11 digits'],
        maxlength: [13, 'Maximal 13 digits'],
        required: [true, 'Phone Number Required']
    }
})

const Members = mongoose.model('Member', memberSchema)

module.exports = Members