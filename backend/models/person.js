const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true
  },
  number: {
    type: String,
    minlength: 7,
    required: true
  }
})

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", contactSchema)