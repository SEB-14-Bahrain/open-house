const Listing = require('../models/listing')

const showNewForm = (req, res) => {
    res.render('listings/new.ejs')
}

const create = async (req, res) => {
    const listingData = {}

    listingData.price = req.body.price
    listingData.streetAddress = req.body.streetAddress
    listingData.city = req.body.city
    listingData.size = req.body.size
    listingData.owner = req.session.user._id

    // if there is no image, we should not add it to the data object
    if (req.body.image) {
        listingData.image = req.body.image
    }

    let createdListing = await Listing.create(listingData)
    
    res.send(createdListing)  
}

module.exports = {
    showNewForm,
    create,
}