const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');




//   app.use(function (req, res, next) {
//     if (!req.session) {
//       req.session = {
//         email: null,
//       };
//     }
//     next();
//   });

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
        // console.log(requestData);
        const email = requestData.email;
        console.log(email);
        const databaseEmail = await controller.loginUser(email);
        if(databaseEmail.length > 0){
            // console.log('Email already exists');
            res.json({success: false, message: 'Email already exists'});
            
        }else {
             await controller.registerUser(requestData);
            res.json({success: true});
        }
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
        // req.session.save();
        // req.session.email = email;
        // console.log('Email', req.session.email );
        const password = formData.password;
        console.log('pass',password);
        console.log(email, password);
        const login = await controller.loginUser(email);
        if (login.length === 0) {
            res.json({ success: false, message: 'User does not exist' });
            console.log('User does not exist');
            return;
        }
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
        // if (!req.session.email) {
        //     console.log('Session not initialized or email not stored');
        //     res.json({ success: false, message: 'Session not initialized or email not stored' });
        //     return;
        //   }
        const {loginType} = req.body;
        const loginAs = loginType.loginAs;
        const bloodType = loginType.bloodType;

        console.log(loginAs);
        console.log(bloodType);
        // const loginEmail = req.session.email;
        // console.log('storedEmail', loginEmail);
        const data = await controller.updateLogin(loginAs,bloodType, loginEmail);
        res.json({success: true, data: data});
    } catch(error) {
        console.log(error.message);
    }
});

router.post('/insertDonorQuestions', async (req, res) => {
    const {donorQuizes} = req.body;
    console.log(donorQuizes);
    try {
        const user = await controller.loginUser(loginEmail);
        const userId = user[0].user_id;

        const data = await controller.donorQuestions(userId, donorQuizes);
        res.json({success: true, data: data});
    } catch(error) {
        console.log(error);
        res.json({success: false});
    }
    
});

router.post('/insertReceiverQuestions', async(req, res) => {
    const {receiverQuizes} = req.body;
    console.log(receiverQuizes);
    try {
        const user = await controller.loginUser(loginEmail);
        const userId = user[0].user_id;
        console.log(userId);

        const data = await controller.receiverQuestions(userId, receiverQuizes);
        res.json({success: true, data:  data});
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error});
    }
    

});

router.get('/usersList', async(req, res) => {
    try {
        const data = await controller.selectUsers();
        res.json({success: true, data: data});
    }catch(error) {
        res.json({success: false, error: error.message});
        console.log(error)
    }
});

router.delete('/deleteUser/:userId', async(req, res) => {
    try {
        const {userId} = req.params;
        await controller.deleteUser(userId);
        res.json({success: true});
    }catch(error) {
        res.json({success: false, error: error.message});
        console.log(error)
    }
});



module.exports = router;