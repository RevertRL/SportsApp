const Player = require('../models/sport');
const axios = require('axios');

const createPlayer = async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).send(player);
    } catch (err) {
        res.status(400).send(err);
    }
};








module.exports = {
    createPlayer
};