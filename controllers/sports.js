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
        res.render('player', { player });
    } catch (err) {
        res.status(500).send(err);
    }
};

const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).send();
        res.render('player', { player });
    } catch (err) {
        res.status(500).send(err);
    }
};

const updatePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!player) return res.status(404).send();
        res.status(200).send(player);
    } catch (err) {
        res.status(400).send(err);
    }
};

const deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) return res.status(404).send();
        res.status(200).send(player);
    } catch (err) {
        res.status(500).send(err);
    }
};
const fetchPlayerStats = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://thesportsdb.p.rapidapi.com/searchplayers.php',
        params: { t: req.params.teamName },  // Use the team name from the request params
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'thesportsdb.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const players = response.data.player;
        if (!players) return res.status(404).send();
        res.status(200).send(players);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


const fetchTeams = async (req, res) => {
    try {
        const response = await axios.get('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League', {
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'thesportsdb.p.rapidapi.com'
            }
        });
        const teams = response.data.teams;
        res.render('sports/index', { teams });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching team data');
    }
};

module.exports = {
    createPlayer,
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    fetchPlayerStats,
    fetchTeams,
};