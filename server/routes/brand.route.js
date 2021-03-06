const express = require('express');

const router = express.Router();


const brandController = require('../controllers/brand.controller');

// @route GET /brands
// @desc Get brandss
// @access Private
router.get("/", brandController.getAllBrand);


//@route POST /brand
//@desc post brand
//@access Private
router.post('/', brandController.createBrand)



//@route GET /brand/:id
//@desc get brand details
//@access Private
router.get('/:id', brandController.brandDetails)


//@route PUT /brand/:id
//@desc Edit brand 
//@access Private
router.put('/:id', brandController.editBrand)


//@route DELETE /brand/:id
//@desc Delete brand 
//@access Private
router.delete('/:id', brandController.deleteBrand)






module.exports = router;