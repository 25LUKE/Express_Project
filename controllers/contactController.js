const asyncHandler = require("express-async-handler");
const Contact = require('../models/Schema');

//@desc Get all contact
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const schem = await Contact.find({ user_id: req.user.id})
    res.status(200).json(schem);
});

//@desc Get single contact
//@route GET /api/contacts/:id
//@access private
const getById = asyncHandler(async (req, res) => {
    const schem = await Contact.findById(req.params.id)
    if (!schem) {
        res.status(404);
        throw new Error('Contact Not Found')
    }
    res.status(200).json({ schem });
})

//@desc Create all contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    const schem = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id //this is comming from the validateToken
    })
    //Error handler
    if (!name || !email || !phone ) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    res.status(201).json({ schem });
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const schem = await Contact.findById(req.params.id);
    if (!schem) {
        res.status(404);
        throw new Error("Update Not Found")
    }
    // a user is not authorized to update another userID
    /* if (Contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contact")
    } */
    const UpdatedContect = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )
    res.status(200).json({ UpdatedContect });
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const schem = await Contact.findById(req.params.id);
    if (!schem) {
        res.status(404);
        throw new Error("Delete Not Found")
    }
    // a user is not authorized to update another userID
    /* if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user contact")
    } */
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json(schem);
})

module.exports = {
    getContact,
    createContact,
    getById,
    updateContact,
    deleteContact
}