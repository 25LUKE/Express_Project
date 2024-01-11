const express = require('express')
const router = express();
const { 
    getContact,
    createContact,
    getById,
    updateContact,
    deleteContact
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken)//this will be used for all the route
router.route('/').get(getContact).post(createContact);;
router.route('/:id').get(getById).put(updateContact).delete(deleteContact);

module.exports = router