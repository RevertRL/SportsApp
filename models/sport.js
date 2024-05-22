const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    team: String,
    position: String,
    stats: Object
});

module.exports = mongoose.model('Player', playerSchema);