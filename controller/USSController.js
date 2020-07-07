module.exports.GetHastaHekimBirimBilgisi=function(req,res){
    const tc = JSON.parse(JSON.stringify(req.body)).tc;

    var Client = require('node-rest-client').Client;
 
    // direct way
    var client = new Client();
     
    var args = {
        path: { "tc": tc,},	
        headers: { "KullaniciAdi": "999996","Sifre":"Sbsgm2018.","UygulamaKodu":"C740D0288F1DC45FE0407C0A04162BDD"}
    };
     
    var url="https://usskurumsal.saglik.gov.tr/api/genel/GetHastaHekimBirimBilgisi?tcKimlikNo=${tc}";
    
    client.get(url, args,
        function (data, response) {
            // parsed response body as js object
            // raw response
            //console.log(response);
            res.json({hekimBilgileri:data});

    });
    

}
module.exports.GetHastaIletisimBilgileri=function(req,res){
    const tc = JSON.parse(JSON.stringify(req.body)).tc;

    var Client = require('node-rest-client').Client;
 
    // direct way
    var client = new Client();
     
    var args = {
        path: { "tc": tc,},	
        headers: { "KullaniciAdi": "999996","Sifre":"Sbsgm2018.","UygulamaKodu":"C740D0288F1DC45FE0407C0A04162BDD"}
    };
     
    var url="https://usskurumsal.saglik.gov.tr/api/hasta/GetHastaIletisimBilgileri?tcKimlikNo=${tc}";
    
    client.get(url, args,
        function (data, response) {
            // parsed response body as js object
            // raw response
            //console.log(response);
            res.json({hastaIletisimBilgileri:data});

    });
    

}
