const internModel = require('../models/internModel')
const collageModel = require('../models/collegeModel')

const keyValid = function (key) {
    if (typeof (key) === "undefined" || typeof (key) === null) return true
    if (typeof (key) === "string" && key.trim().length === 0) return true
    return false
}

const createIntern = async function (req, res) {
    try {
        const data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: 'Invalid request body. Please provide intern details' })

        const { name, email, mobile, collegeName } = data

        if (keyValid(name)) return res.status(400).send({ status: false, message: 'Intern name is required' })

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, message: "Email format is invalid" })
        const existingEmail = await internModel.findOne({ email: email })
        if (existingEmail) return res.status(400).send({ status: false, Message: "Email is already exists" })

        if (!/^[6-9]\d{9}$/.test(mobile)) return res.status(400).send({ status: false, message: "Enter a valid mobile number." })
        const existingMobile = await internModel.findOne({ mobile: mobile })
        if (existingMobile) return res.status(400).send({ status: false, Message: "Mobile number is already exists" })

        const isCollegePresent = await collageModel.findOne({ name: collegeName })
        if (!isCollegePresent) return res.status(400).send({ status: false, Message: "No college is present with this name" })
        const collegeId = isCollegePresent._id
        
        data.collegeId=collegeId

        let createIntern = await internModel.create(data)
        res.status(201).send({ status: true, message: ' Request for intern created successfully', data: createIntern })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { createIntern }