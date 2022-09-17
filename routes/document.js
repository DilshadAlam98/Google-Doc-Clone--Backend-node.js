

const express = require("express");
const auth = require("../middleware/auth");
const Document = require("../models/document");
const document = require("../models/document");
const documentRoute = express.Router();
// const auth = require("../middlewares/auth");

documentRoute.post('/doc/create', auth, async (req, res) => {
    try {
        
        const { createdAt } = req.body;
        let document = new Document({
            uid: req.user,
            title: "Untitled Document",
            createdAt: createdAt,
            
        })
        document = await document.save();
        res.json(document);

    } catch (e) {
        res.status(500).json({error:e.message})
     }
})



documentRoute.get('/doc/me', auth, async (req, res) => {
    try { 
        let documents = await Document.find({ uid: req.user });
        res.json(document);
    } catch (e) { 
        res.status(500).json({ error: e.message })
    }
})

module.exports = documentRoute;