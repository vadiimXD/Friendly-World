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

router.get("/dashboard", async (req, res) => {
    try {
        const animals = await animalService.getAllAnimals().lean()
        res.render("dashboard", { layout: false, animals })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

module.exports = router