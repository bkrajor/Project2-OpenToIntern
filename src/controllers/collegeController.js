const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

const keyValid = function (key) {
    if (typeof (key) === "undefined" || typeof (key) === null) return true
    if (typeof (key) === "string" && key.trim().length === 0) return true
    return false
}

const createCollege = async function (req, res) {
    try {
        let data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Message: "Please provide college details" })

        const { name, fullName, logoLink } = data

        if (keyValid(name)) return res.status(400).send({ status: false, Message: "Name should be valid" })
        if (keyValid(fullName)) return res.status(400).send({ status: false, Message: "Full Name should be valid" })
        if (keyValid(logoLink)) return res.status(400).send({ status: false, Message: "Logo Link should be valid" })

        const existingName = await collegeModel.findOne({ name: name })
        if (existingName) return res.status(400).send({ status: false, Message: "College name is already exists" })

        const existingFullName = await collegeModel.findOne({ fullName: fullName })
        if (existingFullName) return res.status(400).send({ status: false, Message: "College fullName is already exists" })

        const collageData = await collegeModel.create(data)
        res.status(201).send({ status: true, Message: "College entry created successfully", data: collageData })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}

const getCollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!collegeName) return res.status(400).send({ status: false, Message: "Please provide college name" })
        if (keyValid(collegeName)) return res.status(400).send({ status: false, Message: "College name should be valid" })

        let isCollegePresent = await collegeModel.findOne({ name: collegeName })
        if (!isCollegePresent) return res.status(400).send({ status: false, Message: "No college found with this name" })

        const collegeId = isCollegePresent._id

        let allInterns = await internModel.find({ collegeId: collegeId }).select({ _id: 1, email: 1, name: 1, mobile: 1 })
        if (!allInterns) return res.status(400).send({ status: false, Message: "No interns are found with this college" })

        isCollegePresent = {
            name: isCollegePresent.name,
            fullName: isCollegePresent.fullName,
            logoLink: isCollegePresent.logoLink,
            interests: allInterns
        }

        res.status(200).send({ status: true, Data: isCollegePresent })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}

module.exports = { createCollege, getCollegeDetails }