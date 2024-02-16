const router = require("express").Router();

//here need to be controllers for routing 
//EXAMPLE
const staticController = require("./controller/staticController")
const animalController = require("./controller/animalController")
const thirdController = require("./controller/test3Controller")
const authController = require("./controller/authController")


//app use routes

//EXAMPLE
router.use(staticController)
router.use(animalController)
router.use(thirdController)
router.use(authController)


//for other all
router.all("*", (req, res) => {
    res.render("404", { layout: false })
})

module.exports = router