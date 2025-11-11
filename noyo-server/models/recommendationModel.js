const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    similarProducts: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            score: Number
        }
    ],
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
