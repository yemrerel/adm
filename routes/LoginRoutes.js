var express=require('express');

var router=express.Router();

var ctrlLogin=require('../controller/LoginController');

router.get('/',ctrlLogin.LoginPage);
router.post('/',ctrlLogin.LoginPost);
router.get('/logout',ctrlLogin.Logout);

router.get('/signup',ctrlLogin.signUpPage);

module.exports=router;