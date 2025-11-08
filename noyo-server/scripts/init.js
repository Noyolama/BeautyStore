const User = require('../models/userModel');
const Category = require('../models/categoryModel');

const defaultCategories = [
    {
        name: 'SkinCare'
    },
    {
        name: 'BodyCare',
    },
    {
        name: 'HairCare'
    }
]

const initializeApp = async () => {
    try {
        //TODO: Move this to env or change admin user flow
        const adminCredentials = {
            name: 'Admin User',
            email: 'admin@admin.com',
            password: 'Admin@123',
            role: 'admin'
        }

        console.log('🌱 Checking for admin user...');
        const adminUser = await User.findOne({ email: adminCredentials.email });
        const categories = await Category.find({ });

        if (adminUser) {
            console.log('🌱 Admin user already exists.');
        } else {
            console.log('🌱 Creating admin user....');
            await User.create(adminCredentials);
            console.log('🌱 Admin user created successfully.');
        }

        if(!(categories?.length > 0)) {
            await Category.create(defaultCategories)
            console.log('🌱 Category created successfully.');
        }

        console.log('✅ App initialized successfully!');

    } catch (error) {
        console.error('❌ Seeding failed:', error);
    }
};

module.exports = initializeApp;
