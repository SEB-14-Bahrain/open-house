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
    
    res.redirect('/listings')
}

const index = async (req, res) => {
    const allListings = await Listing.find().populate('owner')
    console.log(allListings)
    res.render('listings/index.ejs', {allListings})
}

const show = async (req, res) => {
    const foundListing = await Listing.findById(req.params.listingId).populate('owner').populate('questions.author')

    const userHasFavorited = foundListing.favoritedByUsers.some((user) => { return user._id.equals(req.session.user._id) })

    res.render('listings/show.ejs', {
        foundListing, 
        userHasFavorited
    })
}

const deleteListing = async (req, res) => {
    const foundListing = await Listing.findById(req.params.listingId)

    if (foundListing.owner.equals(req.session.user._id)) {
        await Listing.findByIdAndDelete(req.params.listingId)
        res.redirect('/listings')
    } else {
        res.send("You don't have permission to do that.")
    }
}

const edit = async (req, res) => {
    const foundListing = await Listing.findById(req.params.listingId)
    res.render('listings/edit.ejs', {
        foundListing
    })
}

const update = async (req, res) => {
    const foundListing = await Listing.findById(req.params.listingId)

    if (foundListing.owner.equals(req.session.user._id)) {
        await Listing.findByIdAndUpdate(req.params.listingId, req.body)
        res.redirect(`/listings/${req.params.listingId}`)
    } else {
        res.send("You don't have permission to do that.")
    }
}

const favorite = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.listingId, {
        $push: { favoritedByUsers: req.params.userId },
    })
    res.redirect(`/listings/${req.params.listingId}`)
}

const unfavorite = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.listingId, {
        $pull: { favoritedByUsers: req.params.userId },
    })
    res.redirect(`/listings/${req.params.listingId}`)
}

module.exports = {
    showNewForm,
    create,
    index,
    show,
    deleteListing,
    edit,
    update,
    favorite,
    unfavorite,
}