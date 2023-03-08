const peopleRouter = require("express").Router()
const Person = require("../models/person")
const logger = require("../utils/logger")

peopleRouter.get("/", (req, res) => {
  Person.find({})
    .then(result => {
      res.json(result)
    })
})

peopleRouter.get("/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

peopleRouter.post("/", (req, res, next) => {
  const body = req.body

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson)
      logger.info(newPerson.name, newPerson.number)
    })
    .catch(error => next(error))
})

peopleRouter.delete("/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = peopleRouter