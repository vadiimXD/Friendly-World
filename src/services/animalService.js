const Animal = require("../models/Animal")

exports.createAnimal = (body) => Animal.create(body) 