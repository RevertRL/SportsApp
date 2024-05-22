const express = require('express');
const router = express.Router();
const playersController = require('../controllers/sports');


router.post('/', playersController.createPlayer);
router.get('/', playersController.getPlayers);
router.get('/:id', playersController.getPlayerById);
router.put('/:id', playersController.updatePlayer);
router.delete('/:id', playersController.deletePlayer);
router.get('/fetch/:playerName', playersController.fetchPlayerStats);

module.exports = router;
