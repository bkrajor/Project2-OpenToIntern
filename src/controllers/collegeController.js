const collegeController = require("../models/collegeModel")

const keyValid = function (key) {
    if (typeof (key) === "undefined" || typeof (key) === null) return true
    if (typeof (key) === "string" && key.trim().length===0) return true
    return false
}


const createCollege = async function (req, res) {
    const { name, fullName, logoLink } = req.body

    if (keyValid(name)) return res.status(400).send({ status: false, Message: "Name should be valid" })
    if (keyValid(fullName)) return res.status(400).send({ status: false, Message: "Full Name should be valid" })
    if (keyValid(logoLink)) return res.status(400).send({ status: false, Message: "Logo Link should be valid" })
}

module.exports = { createCollege }