const Animal = require("../models/Animal")

exports.createAnimal = (body) => Animal.create(body);

exports.getLastAnimals = () => Animal.find().sort({ createdAt: -1 }).limit(3);

exports.getAllAnimals = () => Animal.find();

exports.getAnimalById = (animalId) => Animal.findById(animalId)

exports.donateForAnimal = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } })

exports.checkIsDonated = (donateList, userId) => donateList.filter(x => x._id == userId)

