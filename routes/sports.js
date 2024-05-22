const express = require('express');
const router = express.Router();
const sportsCtrl = require('../controllers/sports');


router.post('/', sportsCtrl.createPlayer);
router.get('/', sportsCtrl.getPlayers);
router.get('/:id', sportsCtrl.getPlayerById);
router.put('/:id', sportsCtrl.updatePlayer);
router.delete('/:id', sportsCtrl.deletePlayer);
router.get('/fetch/:playerName', sportsCtrl.fetchPlayerStats);

module.exports = router;
