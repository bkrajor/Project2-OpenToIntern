// const Intern = require('../models/internModel');
// const Collage = require('../models/collageModel');
// const validators = require('../');

// const createIntern  = async function (req, res) 
// {
//     try 
//     {
//       const requestBody = req.body;
  
//       if (!validators.isValidRequestBody(requestBody)) {
//         res.status(400).send({ status: false, message: 'Invalid request body. Please provide intern details' })
//         return
//       }
//       if (!validators.isValid(requestBody.name)) {
//         res.status(400).send({ status: false, message: 'Intern name is required' })
//         return
//       }
  
//       if (!validators.isValid(requestBody.modile)) {
//         res.status(400).send({ status: false, message: 'mobile number is required' })
//         return
//       }
  
//       if (!validators.isValid(requestBody.email)) {
//         res.status(400).send({ status: false, message: 'email id is required' })
//         return
//       }
  
//       if (!validators.isValid(requestBody.collageName)) {
//         return res.status(400).send({ status: false, message: 'collage name is required' })
//       }
  
     
  
//       let createIntern = await Intern .create(requestBody);
//       res.status(201).send({ status: true, message: ' Requiest for intern created successfully', data: createIntern });
//     } 
//     catch (error) 
//     {
//       res.status(500).send({ status: false, msg: error.message });
//     }
// };



// module.exports={createIntern}