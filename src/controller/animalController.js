const router = require("express").Router();

const { isAuth } = require("../middlewares/authMiddlewares");
const animalService = require("../services/animalService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", isAuth, (req, res) => {
    res.render("create", { layout: false })
})

router.post("/create", isAuth, async (req, res) => {
    req.body.owner = req.user.userId;
    req.body.createdAt = Date.now()
    try {
        await animalService.createAnimal(req.body)
        res.redirect("/dashboard")
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("create", { layout: false, error: errorMess, body: req.body })
    }
})

module.exports = router