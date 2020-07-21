var routeLogin =require('./LoginRoutes');
var routeHome =require('./HomeRoutes');



module.exports=function(app){

    app.use('/login',routeLogin);

    app.use('/',routeHome);
    app.use('/home',routeHome);
    


}

