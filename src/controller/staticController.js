const router = require("express").Router();

router.get("/", (req, res) => {
    console.log(new Date())
    res.render("home", { layout: false })
})

module.exports = router