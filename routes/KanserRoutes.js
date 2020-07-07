var express=require('express');

var router=express.Router();

var kanser=require('../controller/KanserController');

router.post('/t4Kaydet',kanser.t4Kaydet);
router.post('/t1Kaydet',kanser.t1Kaydet);
router.post('/t2Kaydet',kanser.t2Kaydet);
router.post('/t3Kaydet',kanser.t3Kaydet);

router.get('/krs',kanser.krs);

router.get('/hedefListeAl',kanser.hedefListeAl);



module.exports=router;