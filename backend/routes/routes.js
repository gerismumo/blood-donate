const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const session = require('express-session');


const MemoryStore = require('memorystore')(session);
const store = new MemoryStore({
  checkPeriod: 86400000, // prune expired entries every 24h (in ms)
});

router.use(
    session({
      secret: 'your-secret-key', 
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie: { secure: false }, 
    })
  );

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
       
        const password = formData.password;
        console.log('pass',password);
        console.log(email, password);
        const Admin = await controller.loginAdmin(email);
        console.log(Admin);
        const login = await controller.loginUser(email);
        console.log(login);
        if(login.length > 0) {
            // if (login.length === 0) {
            //     res.json({ success: false, message: 'User does not exist' });
            //     console.log('User does not exist');
            //     return;
            // }
            if(!login) {
                res.json({success: false, message:'User does not exist'});
                console.log('User does not exist');
            }
            if (!req.session) {
                console.log('Session not initialized');
                res.json({ success: false, message: 'Session not initialized' });
                return;
              }
            const userPassword = login[0].password;
            console.log(userPassword);
            if (password !== userPassword) {
                res.json({success: false, message: 'Password does not match'});
            } else {
                res.json({success: true, data: login}); 
            }
        } else {
            if (Admin.length === 0) {
                res.json({ success: false, message: 'User does not exist' });
                console.log('User does not exist');
                return;
            }
            if(!Admin) {
                res.json({success: false, message:'User does not exist'});
                console.log('User does not exist');
            }
            
            const userPassword = Admin[0].password;
            console.log('admin pass',userPassword);
            if (password !== userPassword) {
                console.log('password mismatch')
                res.json({success: false, message: 'Password does not match'});
            } else {
                res.json({success: true, data: Admin}); 
                console.log('Password succesifully login in');
            }
        }
        
    }catch(error) {
        console.log(error.message);
    }
});



router.post('/loginType', async(req, res)=> {
    try {
        // console.log('Session', req.session);
        // if (!req.session.email) {
        //     console.log('Session not initialized or email not stored');
        //     res.json({ success: false, message: 'Session not initialized or email not stored' });
        //     return;
        //   }
    //     if (!req.session) {
    //   console.log('Session not initialized');
    //   res.json({ success: false, message: 'Session not initialized' });
    //   return;
    // }
        //   const email = req.session.email;
        //   console.log('Email: ' , email);
        // console.log('EmailOust', req.session.email );
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


router.get('/donorQuestions', async(req, res) => {
    try {
        const data = await controller.selectDonorQuestions();
        res.json({success: true, data: data});
    } catch(error) {
        res.json({success: false, error: error.message});
        console.log(error)
    }
});

router.get('/receiverQuestions', async(req, res) => {
    try {
        const data = await controller.selectReceiverQuestions();
        res.json({success: true, data: data});
    }catch (error) {
        res.json({success: false, error: error.message});
        console.log(error);
    }
});

router.delete('/deleteDonorQuestion/:userId', async(req, res) => {
    const {userId} = req.params;
    try {
        await controller.deleteDonorQuestion(userId);
        res.json({success: true});
    } catch(error) {
        res.json({success: false});
        console.log(error);
    }
});

router.delete('/deleteReceiverQuestion/:userId', async(req, res) => {
    const {userId} = req.params;
    try {
        await controller.deleteReceiverQuestion(userId);
        res.json({success: true});
    } catch(error) {
        res.json({success: false});
        console.log(error);
    }
})


module.exports = router;