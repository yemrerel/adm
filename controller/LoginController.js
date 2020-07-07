const Database = require('better-sqlite3');
var path=require('path');

var appDir = path.dirname(require.main.filename);

const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });

module.exports.LoginPage=function(req,res){
    console.log()
    res.render('login',{layout: false});
}

module.exports.LoginPost=function(req,res){

    const form = JSON.parse(JSON.stringify(req.body))
    stmt = dbMelissa.prepare("SELECT * FROM User where Username='"+form.username+"' and Pass='"+form.pass+"'");
    
    user=stmt.get();
    if(user==undefined){
        res.render('login',{msg:'Giriş Hatalı!'});
    }
    else{
        req.session.user=user
        res.render('home',{user:user});
    }

}

module.exports.signUpPage=function(req,res){
     
    res.render('signUp',{layout: false});
}
module.exports.Logout=function(req,res){
    req.session.user=undefined 
    res.render('login',{layout: false});

}
