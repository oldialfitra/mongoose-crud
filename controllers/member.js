const member = require('../models/member')

class Member {

    static registerMember(req, res) {
        member
        .create({
            name: req.body.name,
            address: req.body.address,
            zipcode: req.body.zipcode,
            email: req.body.email,
            phone: req.body.phone
        })
        .then(function (newBook) {
            res.status(201).json(newBook)
        })
        .catch(function (err) {
            if (err.errors.name) {
                res.status(400).json(err.errors.name.message)
            }
            else if (err.errors.address) {
                res.status(400).json(err.errors.address.message)
            }
            else if (err.errors.zipcode) {
                res.status(400).json(err.errors.zipcode.message)
            }
            else if (err.errors.email) {
                res.status(400).json(err.errors.email.message)
            }
            else if (err.errors.phone) {
                res.status(400).json(err.errors.phone.message)
            }
            else {
                res.status(500).json(err)
            }
        })
    }

    static getAllMembers(req, res) {
        member
        .find()
        .then(function (members) {
            res.status(200).json(members)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static updateMember(req, res) {
        member
        .findByIdAndUpdate(req.params._id, {
            $set: req.body
        }, {
            new: true
        })
        .then(function (member) {
            res.status(200).json(member)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static deleteMember(req, res) {
        member
        .findByIdAndDelete(req.params._id)
        .then(function (member) {
            res.status(200).json(member)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

}

module.exports = Member