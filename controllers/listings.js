const Listing = require('../models/listing')

const showNewForm = (req, res) => {
    res.render('listings/new.ejs')
}

const create = async (req, res) => {
    console.log(req.session)
    res.send(req.body)
}

module.exports = {
    showNewForm,
    create,
}