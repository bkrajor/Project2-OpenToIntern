const collegeModel = require("../models/collegeModel")
const collegeController = require("../models/collegeModel")

const keyValid = function (key) {
    if (typeof (key) === "undefined" || typeof (key) === null) return true
    if (typeof (key) === "string" && key.trim().length === 0) return true
    return false
}

const createCollege = async function (req, res) {
    try {
        let data = req.body
        const { name, fullName, logoLink } = data

        if (!Object.keys(data).length > 0) return res.status(400).send({ status: false, Message: "Please provide college details" })

        if (keyValid(name)) return res.status(400).send({ status: false, Message: "Name should be valid" })
        if (keyValid(fullName)) return res.status(400).send({ status: false, Message: "Full Name should be valid" })
        if (keyValid(logoLink)) return res.status(400).send({ status: false, Message: "Logo Link should be valid" })

        const existingName = await collegeModel.findOne({name:name})
        if (existingName) return res.status(400).send({ status: false, Message: "College name is already exists" })

        const existingFullName = await collegeModel.findOne({fullName:fullName})
        if (existingFullName) return res.status(400).send({ status: false, Message: "College fullName is already exists" })

        const collageData = await collegeModel.create(data)
        res.status(201).send({ status: true, Message: "College entry created successfully", data: collageData })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}

module.exports = { createCollege }