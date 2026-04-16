const router = require("express").Router();
const Provider = require("../models/Provider");

router.post("/", async (req, res) => {
    const provider = new Provider(req.body);
    await provider.save();
    res.json(provider);
});

router.get("/", async (req, res) => {
    const providers = await Provider.find();
    res.json(providers);
});

module.exports = router;