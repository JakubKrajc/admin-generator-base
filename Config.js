var config = {
    db:{
       host:"127.0.0.1",
       port:"5432",
       dbname:"nathanael_new",
       user:"nathan",
       pass:"363512"
    },
    auth:{
        salt: "sddf8956asffdSw6d7IUnTA7NNPK9p6gy564duhas4f6s",
        algo:'sha256'
    },
    passport:{
        jwt:{
            secret: 'SJ6LSw6d7IUnTA7NNPK9p6EOJChJSVHVaydk2bOL',
            session: false
        }
    },
    apiUrl: "https://alex-dev.creanet.sk/api/v1/",
    mediaUrl: "https://alex-dev.creanet.sk/",
    parsedImageRegex: /^https:\/\/alex\-dev\.creanet\.sk\/api\/v1\/images\/([a-z0-9]*)/i,
    localImageRegex: /^https:\/\/alex\-dev\.creanet\.sk\/public\/media\/([a-z0-9\/]*)([\.a-z]*)/i
}
module.exports = config;
