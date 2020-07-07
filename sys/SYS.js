const uuidv1 = require('uuid/v1');
const ejs = require('ejs');
const fs =require('fs');
var request = require('request-promise');
var parser = require('fast-xml-parser');
const Database = require('better-sqlite3');
const dbSkrs = new Database('skrs.db', { });
const dbMelissa = new Database('melissa.db', { });
//a = dbMelissa.prepare("SELECT * FROM User where ProfilTipi='Doktor'").get().KpsKullaniciAdi
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();




var username=999996
var Password='Test123456.'
var healthcareProviderCode=999900
var healthcareProviderValue='TEST AİLE HEKİMLİĞİ'
var firmaKodu='C740D0288F1DC45FE0407C0A04162BDD'
const url= 'https://systest.sagliknet.saglik.gov.tr/SYS/SYSWS.svc?wsdl';
var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5) 
var requestHeaders = {
    'content-type': 'text/xml;charset=UTF-8',
    'SOAPAction':"https://sys.sagliknet.saglik.gov.tr/SYS/ISYSWS/SYSSendMessage"
 };

async function PaketKayıt(params){
   console.log(params)
   c="','";
   sql="INSERT INTO SYS_VeriPaketi(Id,VeriPaketi,SYSTakipNo,Date) ";
   sql+="VALUES('";
   sql+=params.Id+c+params.VeriPaketi+c+params.SYSTakipNo+c+params.date
   sql+="')";
   stmt=dbMelissa.prepare(sql).run()
}

module.exports.SYSTakipNoSorgulama=function(sysNo){

    var xml = fs.readFileSync('./sys/SYSTakipNoSorgulama.xml', 'utf8');
   
    ejsParams={
        messageGuid:uuidv1().toString(),
        username:username,
        Password:Password,
        documentGenerationTime:documentGenerationTime,
        healthcareProviderCode:healthcareProviderCode,
        healthcareProviderValue:healthcareProviderValue,
        firmaKodu:firmaKodu,
        sysNo:sysNo
    }
    var xml = ejs.render(xml, ejsParams);

   
     var requestOptions = {
         method: 'POST',
         url: url,
         headers: requestHeaders,
         body: xml,
          rejectUnauthorized: false,   
     };
  
    var options = {ignoreComment: true, alwaysChildren: true};

    request(requestOptions, function (error, response, body) {        
            // resXml=body.split("&lt;").join("<");
            // resXml=resXml.split("&gt;").join(">");
            // resXml=resXml.split("&#xD;").join("");
            // resXml=resXml.split('<?xml version="1.0" encoding="utf-8" ?>').join("");
            // var jsonResult =JSON.parse( parser.toJson(resXml)); //xml to json
            // var newXml=jsonResult['s:Envelope']['s:Body']['SYSSendMessageResponse']['SYSSendMessageResult'];// parsing object
            // HASTA_KIMLIK_BILGILERI=newXml.SYSMessage.recordData.KayitCevabi.HASTA_SAGLIK_KAYITLARI.recordData.HASTA_KIMLIK_BILGILERI
            // HASTA_BASVURU_BILGILERI=newXml.SYSMessage.recordData.KayitCevabi.HASTA_SAGLIK_KAYITLARI.recordData.HASTA_BASVURU_BILGILERI
            body=entities.decode(body)
    });


};
module.exports.KadinIzlemVeriSeti=async function(form){
    var xml = fs.readFileSync('./sys/202.ejs', 'utf8');
    var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
        form.messageGuid=uuidv1().toString(),
        form.username=username
        form.Password=Password
        form.documentGenerationTime=documentGenerationTime
        form.healthcareProviderCode=healthcareProviderCode
        form.healthcareProviderValue=healthcareProviderValue
        form.firmaKodu=firmaKodu
    xml = ejs.render(xml, form);
     var requestOptions = {
         method: 'POST',
         url: url,
         headers: requestHeaders,
         body: xml,
          rejectUnauthorized: false,   
     };
    body=await request(requestOptions)   
    body=await entities.decode(body)
    console.log(body)
    if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
    else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
    
    params={}
    params.date=documentGenerationTime
    params.SYSTakipNo=form.SYSTakipNo
    params.Id=form.messageGuid
    params.VeriPaketi='KADIN_IZLEM_15_49_YAS'
    await PaketKayıt(params)
    return  SYSTakipNo
};
module.exports.HizmetIlacMalzemeKayit=async function(form){
    console.log(form)
    var xml = fs.readFileSync('./sys/102.ejs', 'utf8');
    var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
        form.messageGuid=uuidv1().toString(),
        form.username=username
        form.Password=Password
        form.documentGenerationTime=documentGenerationTime
        form.healthcareProviderCode=healthcareProviderCode
        form.healthcareProviderValue=healthcareProviderValue
        form.firmaKodu=firmaKodu
    xml = ejs.render(xml, form);
     var requestOptions = {
         method: 'POST',
         url: url,
         headers: requestHeaders,
         body: xml,
          rejectUnauthorized: false,   
     };
    body=await request(requestOptions)   
    body=await entities.decode(body)
    console.log(body)
    // if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
    // else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]


    return  SYSTakipNo
};
module.exports.MuayeneKayit=async function(form){
    console.log(form)
    var xml = fs.readFileSync('./sys/103.ejs', 'utf8');
    var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
        form.messageGuid=uuidv1().toString(),
        form.username=username
        form.Password=Password
        form.documentGenerationTime=documentGenerationTime
        form.healthcareProviderCode=healthcareProviderCode
        form.healthcareProviderValue=healthcareProviderValue
        form.firmaKodu=firmaKodu
    xml = ejs.render(xml, form);
     var requestOptions = {
         method: 'POST',
         url: url,
         headers: requestHeaders,
         body: xml,
          rejectUnauthorized: false,   
     };
    body=await request(requestOptions)   
    body=await entities.decode(body)
    console.log(body)
    if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
    else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
    
    params={}
    params.date=documentGenerationTime
    params.SYSTakipNo=form.SYSTakipNo
    params.Id=form.messageGuid
    params.VeriPaketi='Muayene_Bilgisi_Kayıt'
    await PaketKayıt(params)


    return  SYSTakipNo
};
module.exports.HastaKayıt=async function(form){

        var xml = fs.readFileSync('./sys/HastaKayıt.xml', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml,
              rejectUnauthorized: false,   
         };
        body=await request(requestOptions)   
        body=await entities.decode(body)
        SYSTakipNo=''
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        return  SYSTakipNo
    };


    module.exports.VatandaşKayıt=function(form){

        var xml = fs.readFileSync('./sys/266.ejs', 'utf8');
       
        form.messageGuid=uuidv1().toString(),
        form.username=username
        form.Password=Password
        form.documentGenerationTime=documentGenerationTime
        form.healthcareProviderCode=healthcareProviderCode
        form.healthcareProviderValue=healthcareProviderValue
        form.firmaKodu=firmaKodu

        var xml = ejs.render(xml, form);
        
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml,
              rejectUnauthorized: false,   
         };
         console.log(xml)
        request(requestOptions, function (error, response, body) {
             
                console.log(body)

                // resXml=body.split("&lt;").join("<");
                // resXml=resXml.split("&gt;").join(">");
                // resXml=resXml.split("&#xD;").join("");
                // resXml=resXml.split('<?xml version="1.0" encoding="utf-8" ?>').join("");

                // var jsonResult =JSON.parse( parser.toJson(resXml)); //xml to json
                // var newXml=jsonResult['s:Envelope']['s:Body']['SYSSendMessageResponse']['SYSSendMessageResult'];// parsing object
              
               // console.log(HASTA_KIMLIK_BILGILERI);
    
        });
    
    
    };



    module.exports.GebeBildirimVeriSeti=async function(form){
        var xml = fs.readFileSync('./sys/223.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml,
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        

        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='GEBELIK_BILDIRIM_VERI_SETI'
        await PaketKayıt(params)


        return  SYSTakipNo
    };


    module.exports.GebeIzlemVeriSetiPaketi=async function(form){
        var xml = fs.readFileSync('./sys/221.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
        body=await request(requestOptions)   
        body=await entities.decode(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        


        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='GEBE_IZLEM'
        await PaketKayıt(params)
        return  SYSTakipNo
    };
    module.exports.GebelikSonucuVeriSetiPaketi=async function(form){
        var xml = fs.readFileSync('./sys/224.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)

        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        


        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='GEBELIK_SONUCU_VERI_SETI'
        await PaketKayıt(params)
        return  SYSTakipNo
    };
    module.exports.GebePsikososyalIzlem=async function(form){
        var xml = fs.readFileSync('./sys/222.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        

        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='GEBE_PSIKOSOSYAL_IZLEM'
        await PaketKayıt(params)
        return  SYSTakipNo
    };
    module.exports.LohusaIzlemVeriSetiPaketi=async function(form){
        var xml = fs.readFileSync('./sys/238.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        

        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='LOHUSA_IZLEM'
        await PaketKayıt(params)
        return  SYSTakipNo
    };
    module.exports.BebekIzlemVeriSetiPaketi=async function(form){
        var xml = fs.readFileSync('./sys/209.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='BEBEK_COCUK_IZLEM_VERI_SETI'
        await PaketKayıt(params)

        return  SYSTakipNo
    };
    module.exports.BebekCocukPsikososyalIzlem=async function(form){
        var xml = fs.readFileSync('./sys/212.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='BEBEK_COCUK_IZLEM_PSIKOSOSYAL_IZLEM'
        await PaketKayıt(params)

        return  SYSTakipNo
    };
    module.exports.ÖZELLİKLİİZLEMVERİSETİ=async function(form){
        var xml = fs.readFileSync('./sys/243.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='OZELLIKLI_IZLEM_BILGILERI'
        await PaketKayıt(params)

        return  SYSTakipNo
    };

    module.exports.LaboratuvarSonucKayit=async function(form){
        var xml = fs.readFileSync('./sys/105.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        return  SYSTakipNo
    };


    module.exports.TütünKullanimiVeriSeti=async function(form){
        var xml = fs.readFileSync('./sys/248.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='TUTUN_KULLANIMI'
        await PaketKayıt(params)

        return  SYSTakipNo
    };


    module.exports.VeriPaketiSilmePaketi=async function(form){
        console.log(form)
        var xml = fs.readFileSync('./sys/200.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        return  SYSTakipNo
    };

    module.exports.HastaKayıtSilmePaketi=async function(form){
        console.log(form)
        var xml = fs.readFileSync('./sys/301.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        return  SYSTakipNo
    };


    module.exports.MeslekiMaruziyetPaketi=async function(form){
        var xml = fs.readFileSync('./sys/269.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='MESLEKI_MARUZIYET'
        await PaketKayıt(params)

        return  SYSTakipNo
    };

    module.exports.BulasiciHastalikBildirimVeriSetiPaketi=async function(form){
        var xml = fs.readFileSync('./sys/214.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='BULASICI_HASTALIK_BILDIRIM'
        await PaketKayıt(params)

        return  SYSTakipNo
    };


    module.exports.AsiVeriSeti=async function(form){
        var xml = fs.readFileSync('./sys/207.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='ASI_VERI_SETI'
        await PaketKayıt(params)

        return  SYSTakipNo
    };


    module.exports.AsiErtelemeVeriSeti=async function(form){
        var xml = fs.readFileSync('./sys/205.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='ASI_ERTELEME_IPTAL'
        await PaketKayıt(params)

        return  SYSTakipNo
    };


    module.exports.AsiSonrasiIstenmeyenEtkiVeriSeti=async function(form){
        var xml = fs.readFileSync('./sys/206.ejs', 'utf8');
        var documentGenerationTime =new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -5)       
            form.messageGuid=uuidv1().toString(),
            form.username=username
            form.Password=Password
            form.documentGenerationTime=documentGenerationTime
            form.healthcareProviderCode=healthcareProviderCode
            form.healthcareProviderValue=healthcareProviderValue
            form.firmaKodu=firmaKodu
        xml = ejs.render(xml, form);
         var requestOptions = {
             method: 'POST',
             url: url,
             headers: requestHeaders,
             body: xml, 
              rejectUnauthorized: false,   
         };
         console.log(xml)
        body=await request(requestOptions)   
        body=await entities.decode(body)
        console.log(body)
        if(body.includes("İşlem Başarı ile Sonuçlandı.")) SYSTakipNo= await body.split('<SYSTakipNo value="')[1].split('"/>')[0]
        else SYSTakipNo= await body.split("SYSTakipNo=")[1].split('"/>')[0]
        
        params={}
        params.date=documentGenerationTime
        params.SYSTakipNo=form.SYSTakipNo
        params.Id=form.messageGuid
        params.VeriPaketi='ASI_SONRASI_ISTENMEYEN_ETKI'
        await PaketKayıt(params)

        return  SYSTakipNo
    };