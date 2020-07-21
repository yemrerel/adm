


module.exports.index=function(req,res){
      
       if(req.session.user==undefined){
               res.render('login',{layout: false});
       }
       else{
               res.render('home',{user:req.session.user});
       }
   }