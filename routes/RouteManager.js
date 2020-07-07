var routeLogin =require('./LoginRoutes');
var routeHome =require('./HomeRoutes');
var routeAbout =require('./AboutRoutes');

var routeHasta =require('./HastaRoutes');
var routeİzlemler =require('./İzlemlerRoutes');
var routeAyarlar =require('./AyarlarRoutes');
var routePDF=require('./PDFRoutes');
var routeAlis=require('./AlisRoutes');
var routeUSS=require('./USSRoutes');
var routeSYS=require('./SYSRoutes');

var routeKanser=require('./KanserRoutes');


module.exports=function(app){

  



    app.use('/login',routeLogin);

    app.use('/',routeHome);
    app.use('/home',routeHome);
    app.use('/about',routeAbout);


    app.use('/hasta',routeHasta);
    app.use('/izlemler',routeİzlemler);
    app.use('/ayarlar',routeAyarlar);
    app.use('/pdf',routePDF);
    app.use('/Alis',routeAlis);
    app.use('/USS',routeUSS);
    app.use('/SYS',routeSYS);
    app.use('/kanser',routeKanser);



}

