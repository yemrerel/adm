var express=require('express');

var router=express.Router();

var ctrlAbout=require('../controller/AboutController');

router.get('/',ctrlAbout.index);

module.exports=router;