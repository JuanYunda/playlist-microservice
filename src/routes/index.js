const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": "DSIII",
        "website": "campusvirtual.com"
    }
    res.json(data);
});

module.exports = router;