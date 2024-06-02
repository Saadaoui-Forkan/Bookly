const path = require('path');
const fs = require("fs");
const Book = require('../models/book');
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const { asyncHandler } = require('../middlewares/asyncHandler');

// method   POST 
// route    api/books
// desc     Create new book
// access   Private | admin
const createBook = asyncHandler(async(req, res) => {
    try{
        // Image Validation
        if (!req.file) {
            return res.status(400).json({ message: "no image provided" });
        }

        // Upload Photo
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
        const result = await cloudinaryUploadImage(imagePath);

        // Save new post in database
        const book = await Book.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            user: req.userId,
            image: {
                url: result.secure_url,
                publicId: result.public_id,
            },
            author: req.body.author,
            language: req.body.language,
            PublicationDate: req.body.PublicationDate,
        });

        // Send response to the client
        res.status(201).json(book);

        // 6. Remove image from the server
        fs.unlinkSync(imagePath);
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
});

module.exports = {
    createBook,
}

