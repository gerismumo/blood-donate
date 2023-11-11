const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/countiesData', (req, res) => {
    try {
        const counties = require('../data/counties.json');
        res.json({success: true, counties});
    }catch(error) {
       console.error(error);
       res.json({success: false, error: error.message});
    }
});

router.post('/registerUser', async(req, res) => {
    try {
        const {requestData} = req.body;
        console.log(requestData);
        const data = await controller.registerUser(requestData);
        res.json({success: true});
    } catch (error) {
        res.json({success: false, error: error.message});
    }
});

let loginEmail;

router.post('/loginUser', async(req, res) => {
    try {
        const {formData} = req.body;
        const email = formData.email;
        loginEmail = email;
        const password = formData.password;
        console.log(email, password);
        const login = await controller.loginUser(email);
        if(!login) {
            res.json({success: false, message:'User does not exist'});
            console.log('User does not exist');
        }
        const userPassword = login[0].password;
        console.log(userPassword);
        if (password !== userPassword) {
            res.json({success: false, message: 'Password does not match'});
        } else {
            res.json({success: true, data: login}); 
        }
    }catch(error) {
        console.log(error.message);
    }
});

router.post('/loginType', async(req, res)=> {
    try {
        const {loginType} = req.body;
        const loginAs = loginType.loginAs;
        console.log(loginAs);
        console.log(loginEmail);
        await controller.updateLogin(loginAs, loginEmail);
        res.json({success: true, message:'Successifully selected'});
    } catch(error) {
        console.log(error.message);
    }
})

module.exports = router;