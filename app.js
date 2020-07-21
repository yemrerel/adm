#!/usr/bin/env
var fs =require('fs');
var express=require('express');

 
var path=require('path');
var app =express();
var ejsLayouts=require('express-ejs-layouts');
var bodypARSER=require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.set('views', path.join(__dirname, '.','views')); 

app.set('view engine','ejs');


app.use(bodypARSER.urlencoded({extended:false}));
app.use(bodypARSER.json());

app.use(ejsLayouts);
app.set("layout extractScripts", true)


app.use('/public',express.static(path.join(__dirname,'public')));

app.use(cookieParser());
app.use(session({cookie:{maxAge:60000000},secret:"adm", saveUninitialized : true, resave : true}));

var moment = require('moment');

require('./routes/RouteManager')(app);


app.listen(8000);


