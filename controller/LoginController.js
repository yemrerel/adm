const mysql = require('mysql2/promise');
  // create the connection




var moment = require('moment'); // require
// sql = "SELECT * FROM user WHERE status='"+1+"';"//
// users = await pool.query(sql);
// users = JSON.parse(JSON.stringify(users[0]))
// for (let index = 0; index < users.length; index++) {
//     const e = users[index];
    
//     var userDay = moment(e.krediAyGuncellemeTar, 'YYYY-MM-DD').format('D')
//     var nowDay = moment().format('D')
//     if(userDay==nowDay){
//         if(e.kredi<100){
//             sql = "update user set status=0 where id="+e.id//
//             await pool.query(sql);
//         }
//         else{
//             sql = "update user set kredi="+(e.kredi-100)+" where id="+e.id
//             await pool.query(sql);
//         }
//     }        
    
// }



module.exports.LoginPage=function(req,res){
    console.log('login')
    res.render('login',{layout: false});
}

module.exports.LoginPost=async function(req,res){

    const form = JSON.parse(JSON.stringify(req.body))
    console.log(form)    
    
    // query database
    const connection = await mysql.createConnection({host:'localhost', user: 'root',password:'', database: 'okutkazan_okut',port:3306});

    const [rows, fields]= await connection.execute('SELECT 1 + 1 AS solution');
  
console.log(rows)

    // if(user==undefined){
    //     res.json({msg:'Giriş Hatalı!',result:false});
    // }
    // else{    
        
 
    //     // macaddress.one(async function (err, mac) {
    //     //     var opt = {
    //     //         uri:'http://localhost:8000/getKrediBilgisi',
    //     //         method: 'post',
    //     //         json:{mail:user.mail,mac:mac}
    //     //     };
    //     //     response=await request(opt)
    //     //     console.log(response)
    //     //     // req.session.user=user
    //     //     // res.json({msg:'Giriş Başarılı!',result:true});

    //     // });
    //  req.session.user=user
    //         res.json({msg:'Giriş Başarılı!',result:true});


       
     
    // }

}

module.exports.signUpPage=function(req,res){
     
    res.render('signUp',{layout: false});
}
module.exports.Logout=function(req,res){
    req.session.user=undefined 
    res.render('login',{layout: false});

}
