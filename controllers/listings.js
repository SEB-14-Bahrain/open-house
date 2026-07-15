const Listing = require('../models/listing')

const showNewForm = (req, res) => {
    res.render('listings/new.ejs')
}

module.exports = {
    showNewForm,
}