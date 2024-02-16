const router = require("express").Router();
const animalService = require("../services/animalService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/", async (req, res) => {
    try {
        const animals = await animalService.getLastAnimals().lean()
        res.render("home", { layout: false, animals })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

module.exports = router