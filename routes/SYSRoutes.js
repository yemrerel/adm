var express=require('express');

var router=express.Router();

var SYS=require('../controller/SYSController');

router.post('/sysHastaGonder',SYS.sysHastaGonder);


module.exports=router;