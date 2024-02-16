const Animal = require("../models/Animal")

exports.createAnimal = (body) => Animal.create(body)

exports.getLastAnimals = () => Animal.find().sort({createdAt: -1 }).limit(3) 