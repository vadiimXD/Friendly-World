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

router.get("/details/:animalId", async (req, res) => {
    try {
        const animal = await animalService.getAnimalById(req.params.animalId).lean()
        const hasOwner = req.user?.userId == animal.owner
        const isDonated = animalService.checkIsDonated(animal.donations, req.user?.userId)
        res.render("details", { layout: false, animal, hasOwner, isDonated })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.get("/donate/:animalId", isAuth, async (req, res) => {
    try {
        await animalService.donateForAnimal(req.params.animalId, req.user.userId)
        res.redirect(`/details/${req.params.animalId}`)
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})


module.exports = router