const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const createCategory = async (req, res) => {
    try {
        const { name } = req?.body
        const category = await Category.create({
            name,
            user: req.user._id
        })
        res.status(201).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });

    }
}

const removeCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        const products = await Product.find({ category: category?._id })

        if(products?.length > 0) {
            return res.status(401).json({ success: false, message: 'Category is in use.' });
        }

        await category.deleteOne()

        res.status(201).json({
            success: true,
            message: 'Category deleted successfully.'
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });

    }
}

const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(201).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    removeCategory
}
