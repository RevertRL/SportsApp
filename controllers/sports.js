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

const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).send(players);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).send();
        res.status(200).send(player);
    } catch (err) {
        res.status(500).send(err);
    }
};




module.exports = {
    createPlayer,
    getPlayers,
    getPlayerById,

};