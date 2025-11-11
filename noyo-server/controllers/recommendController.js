const natural = require('natural');
const cosineSimilarity = require('cosine-similarity');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const Recommendation = require('../models/recommendationModel');

const tfidf = new natural.TfIdf();
let productsCache = [];
let tfidfCacheReady = false;

// === Build TF-IDF once and cache in memory ===
async function buildModel() {
    if (tfidfCacheReady) return console.log('🧠 TF-IDF already cached');

    productsCache = await Product.find({}).populate({
        path: 'category',
        select: 'name'
    });
    tfidf.documents = [];
    productsCache.forEach((p) => {
        const text = `${p.category?.name || ''} ${p.brand || ''} ${p.description || ''} ${p?.skinType}`;
        tfidf.addDocument(text);
    });

    tfidfCacheReady = true;
    console.log('✅ TF-IDF model cached with', productsCache.length, 'products');
}

// === Utility: compute similarity between products ===
const computeSimilarities = () => {
    const similarities = [];
    const allTerms = tfidf.documents.flatMap((doc) => Object.keys(doc)).filter((v, i, a) => a.indexOf(v) === i);

    // Convert each product to numeric vector
    const vectors = productsCache.map((p, i) =>
        allTerms.map((term) => tfidf.tfidf(term, i))
    );

    productsCache.forEach((p, i) => {
        const sims = [];

        productsCache.forEach((q, j) => {
            if (i === j) return;
            const sim = cosineSimilarity(vectors[i], vectors[j]);
            if (sim > 0) sims.push({ productId: q._id, score: sim });
        });

        sims.sort((a, b) => b.score - a.score);
        similarities.push({ productId: p._id, similarProducts: sims.slice(0, 10) });
    });

    return similarities;
};

// === Precompute and save similarities to MongoDB ===
async function precomputeSimilarities() {
    await buildModel();
    console.log('⚙️ Computing similarities...');
    const data = computeSimilarities();

    console.log('-----tester----', data)

    await Recommendation.deleteMany({});
    await Recommendation.insertMany(data);

    console.log('💾 Precomputed cosine similarities stored in DB');
}

// === Helper: fetch from DB or fallback to compute ===
async function getSimilarProductsFromDB(productId, topN = 5) {
    const cached = await Recommendation.findOne({ productId }).populate('similarProducts.productId');
    if (cached && cached.similarProducts?.length) {
        return cached.similarProducts
            .slice(0, topN)
            .map((s) => s.productId);
    }

    // fallback (if no cache)
    const target = productsCache.find((p) => p._id.toString() === productId);
    if (!target) return [];
    const idx = productsCache.indexOf(target);

    const sims = productsCache.map((p, j) => {
        if (idx === j) return null;
        return { product: p, score: cosineSimilarity(tfidf.documents[idx], tfidf.documents[j]) };
    }).filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, topN)
        .map(r => r.product);

    return sims;
}

// === Controller: recommend by product ID ===
const recommendByProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await buildModel();

        const recs = await getSimilarProductsFromDB(id, 4);
        res.json({ data: recs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// === Controller: recommend by user history ===
const recommendByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        await buildModel();

        const orders = await Order.find({ user: userId });
        if (!orders.length) return res.json([]);

        const purchasedIds = [...new Set(orders.flatMap(o => o.orderItems.map(p => p.product.toString())))];
        const userProducts = productsCache.filter(p => purchasedIds.includes(p._id.toString()));

        const recommendations = [];
        for (const p of userProducts) {
            const sims = await getSimilarProductsFromDB(p._id.toString(), 3);
            recommendations.push(...sims);
        }

        const unique = [
            ...new Map(recommendations.map(p => [p._id.toString(), p])).values(),
        ].filter(p => !purchasedIds.includes(p._id.toString()));

        res.json({ data: unique.slice(0, 10) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// === Manual trigger: precompute and store similarities ===
const precompute = async (req, res) => {
    try {
        await precomputeSimilarities();
        res.json({ message: 'Precomputed similarities stored in DB' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to precompute' });
    }
};

module.exports = {
    recommendByProduct,
    recommendByUser,
    precompute,
    buildModel,
    precomputeSimilarities
}
