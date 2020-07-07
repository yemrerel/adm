var ejs = require('ejs');
var fs =require('fs');
var pdf = require('html-pdf');
var path=require('path');  
var appDir = path.dirname(require.main.filename);
var options = {};
module.exports.babaPsikolojisi=function(){

    var html = fs.readFileSync('/forms/BabaPsikolojisi.ejs', 'utf8');
    
    var babaPsikolojisi={
        ASB,
        elemanAdSoyad,
        babaAdSoyad,
        babaTC,
        anneAdSoyad,
        çocukAdSoyad,
        adres,
        s1,
        s2,
        s3,
        s4,
        s5a,
        s5b,
        sbc,
    };
    var str = ejs.render(html, {babaPsikolojisi: babaPsikolojisi});
    
    
    
    pdf.create(str, options).toFile('./output.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
      
}

module.exports.hastaIslem=function(){

  var html = fs.readFileSync('/forms/HastaIslem.ejs', 'utf8');
  var str = ejs.render(html);
 
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
    
}

// module.exports.annePsikolojisi=function(){

//   var html = fs.readFileSync('app_server/forms/HastaIslem.ejs', 'utf8');
//   var str = ejs.render(html);
  
//   pdf.create(str, options).toFile('./output.pdf', function(err, res) {
//     if (err) return console.log(err);
//     console.log(res); // { filename: '/app/businesscard.pdf' }
//   });
    
// }

module.exports.aşıKartı=function(){


  var html = fs.readFileSync('app_server/forms/AşıKartı.ejs', 'utf8');
  var str = ejs.render(html);
  var options = {format:"A3",
  orientation: "landscape"};

  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
    
}

module.exports.bebekÇocukHastalık=function(){

  
  var html = fs.readFileSync('app_server/forms/BebekÇocukHastalık.ejs', 'utf8');
  var str = ejs.render(html);


  
  var options = {format:"a4",
  orientation: ""};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
    
}


module.exports.bebekÇocukİzlemFişi=function(){


  var html = fs.readFileSync('app_server/forms/BebekÇocukIzlemFisi.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"a4",
                orientation: "portrait",
                footer: {   
                           "contents": {
                                         default: '<div style="margin-left:10%;"><table style="border-collapse: collapse;width: 15%;float: left;" border="1"> <tbody> <tr style=""> <td style="width: 94.7454%;/* padding: 0; */font-size: 1px;padding: 5px;" colspan="2">&nbsp;</td> </tr> <tr> <td style="width: 38.1317%;padding: 0;font-size: 1px;"> <div class="p1" style="text-align: center;"><span style="font-size: 6pt;"><strong>ADI SOYADI</strong></span></div> </td> <td style="width: 56.6137%;padding: 0;font-size: 1px;padding: 0;font-size: 1px;"></td> </tr> <tr> <td style="width: 38.1317%;padding: 0;font-size: 1px;"> <div class="p1" style="text-align: center;"><span style="font-size: 6pt;"><strong>ÜNVAN</strong></span></div> </td> <td style="width: 56.6137%;padding: 0;font-size: 1px;">&nbsp;</td> </tr> <tr> <td style="width: 38.1317%;padding: 0;font-size: 1px;"> <div class="" style="text-align: center;"><span style="font-size: 6pt;"><strong>TARİH</strong></span></div> </td> <td style="width: 56.6137%;padding: 0;font-size: 1px;">&nbsp;</td> </tr> <tr> <td style="width: 38.1317%;padding: 0;font-size: 1px;"> <div class="p1" style="text-align: center;"><span style="font-size: 6pt;"><strong>İMZA</strong></span></div> </td> <td style="width: 56.6137%;padding: 0;font-size: 1px;">&nbsp;</td> </tr> </tbody> </table> <table style="border-collapse: collapse;width: 68.9714%;float: left;margin-left: 2%;" border="1"> <tbody> <tr> <td style="width: 519px;padding: 0;font-size: 1px;"> <span style="text-align: left;font-size: 6pt;"><strong>1.) Hekimin Adı Soyadı :</strong></span> </td> <td style="width: 26.4635%;padding: 0;font-size: 1px;"> <span style="font-size: 6pt;text-align: left"><strong>Tarih :</strong></span> </td> <td style="width: 22.3381%;padding: 0;font-size: 1px;"> <span style="text-align: left;font-size: 6pt;"><strong>İmza :</strong></span> </td> </tr> </tbody> </table></div>'
                                        }
                        }
  }


  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.çalışabilirKağıdı=function(){


  var html = fs.readFileSync('app_server/forms/çalışabilirKağıdı.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"letter",
  orientation: "landscape"};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.bilgilendirilmişOnayFormu=function(){


  var html = fs.readFileSync('app_server/forms/bilgilendirilmişOnayFormu.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"",
  orientation: ""};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}
module.exports.bulaşıcıHastalık=function(){


  var html = fs.readFileSync('app_server/forms/bulaşıcıHastalık.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"",
  orientation: "landscape"};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.durumBildirirTHSR=function(){


  var html = fs.readFileSync('app_server/forms/durumBildirirTHSR.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"a4",
  orientation: "portrait",
  "base": "file:////Users/apple/Desktop/NodeDeneme/app_server/forms/"

};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.ekSürücüBelgesi=function(){


  var html = fs.readFileSync('app_server/forms/ekSürücüBelgesi.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"A4",
  orientation: "portrait",
  "height": "19.5in",        // allowed units: mm, cm, in, px
  "width": "13in",    
  "base": "file:////Users/apple/Desktop/NodeDeneme/app_server/forms/",
   
};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.evlilikRaporu=function(){


  var html = fs.readFileSync('app_server/forms/evlilikRaporu.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"a4",
  orientation: "landscape",
  "base": "file:////Users/apple/Desktop/NodeDeneme/app_server/forms/"

};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.kanGrubu=function(){


  var html = fs.readFileSync('app_server/forms/kanGrubu.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"a4",
  orientation: "landscape",
  
};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}


module.exports.sevkRaporu=function(){


  var html = fs.readFileSync('app_server/forms/sevkRaporu.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"a4",
  orientation: "portrait",

};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.işYeriKazaveMeslek=function(){


  var html = fs.readFileSync('app_server/forms/işYeriKazaveMeslek.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"",
  orientation: "",
  "height": "22.5in",        // allowed units: mm, cm, in, px
  "width": "13in", 

};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.yüksekRiskGebeSevk=function(){


  var html = fs.readFileSync('app_server/forms/yüksekRiskGebeSevk.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"",
  orientation: "",
  "base": "file:////Users/apple/Desktop/NodeDeneme/app_server/forms/",
  "width": "10in",
  "height": "13.5in"
};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.yüksekRiskGebeSevk=function(){


  var html = fs.readFileSync('app_server/forms/yüksekRiskGebeSevk.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"",
  orientation: "",
  "base": "file:////Users/apple/Desktop/NodeDeneme/app_server/forms/",
  "width": "10in",
  "height": "13.5in"
};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.okulSağlığıMuayene=function(){


  var html = fs.readFileSync('app_server/forms/okulSağlığıMuayene.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"",
  orientation: "",
  "width": "15in",
  "height": "18.5in"
  
};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}


module.exports.oralGlikoz=function(){


  var html = fs.readFileSync('app_server/forms/oralGlikoz.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"a4",
  orientation: "portrait",

  
};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.röntgenTetkikFişi=function(){


  var html = fs.readFileSync('app_server/forms/röntgenTetkikFişi.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"a4",
  orientation: "landscape",

  
};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}

module.exports.poliklinikDefteri=function(){


  var html = fs.readFileSync('app_server/forms/poliklinikDefteri.ejs', 'utf8');
  var str = ejs.render(html);
  
  var options = {format:"a4",
  orientation: "landscape",

  
};
  pdf.create(str, options).toFile('./output.pdf', function(err, res) {
    if (err) return console.log(err);
  });
    
}




module.exports.recete2=function(recete){
    
  
      var path=require('path');  
      var appDir = path.dirname(require.main.filename);
  // var html = fs.readFileSync(path.join(appDir,'forms/recete.ejs'),'utf8');
     var html = fs.readFileSync(path.join(appDir,'forms/recete.ejs'), 'utf8');

   var str = ejs.render(html,recete);

  var pdf = require('html-pdf');
  var options = { format: 'Letter' };

  pdf.create(str, options).toFile(path.resolve(process.cwd(),'/recete.pdf'), function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
 
    
  });   




}

