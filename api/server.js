/**
 * Initiation de Express
 */

let express = require('express')
let app = express()


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let bcrypt = require('bcrypt');
let nodemailer = require('nodemailer');

app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'hK34B23B4HJ', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(cors());
logger('tiny')
app.use(helmet());


/**
 * Bonus: Nodemailer configuration
 */
var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "eccfcf64a912f3",
        pass: "7bef7b105b4c7b"
    }
});

/**
 * Module RethinkDb
 */
let r = require('rethinkdb');


let Upload = require('upload-file');


/**
 * Erreur 500 sortie en JSON
 */
app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});

/**
 *
Un JWT est un objet JSON encodé qu'un serveur (Node par exemple) encode en utilisant une clé privée. 

L'objet JSON encodé est un token que vous enverrez à un client qui s'est authentifié avec succès.

 Ledit client l'enverra ensuite au serveur à chaque requête faite à ce même serveur. 
Si en utilisant sa clé privée le serveur parvient à décoder le token, le serveur sait que le client qui a joint ce token est bien celui qu'il est censé être.
 Le serveur pourra alors authoriser le client à accéder aux resources demandées par le client.
 * 
 */
let secret = 'q5f6ds465sdfg4v6466f15sdf56sd1f56s165f1sd65f156s16sfdfdf4d6f4s6$5ndjwk';

//app.use('/', expressJwt({ secret: secret }));


let connection = r.connect({
    db: "test" //your database
}).then((connection) => { // une fois qu'il a effectuer une connexion



    app.post('/update', (req, res) => {

        let now = new Date();
        r.table('users').filter({ email: req.body.email }).update({
            name: req.body.name,
            email: req.body.email,
            updated: now
        }).run(connection, (err, result) => {

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Julien Boyer" <julien@meetserious.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Modification de votre compte ✔', // Subject line
                text: 'Awesome long paragraph about inscription...', // plain text body
                html: `<h1>Hello! ${req.body.name}</h1>
                        <p>Awesome long paragraph about inscription...</p>
                        <p>Modifié le ${now}</p>`
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.json(true);
            });


        })
    });

    app.post('/signup', (req, res) => {

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {

                let now = new Date();
                r.table('users').insert({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    created: now
                }).run(connection, (err, result) => {

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Julien Boyer" <julien@meetserious.com>', // sender address
                        to: req.body.email, // list of receivers
                        subject: 'Bienvenue , vous etes inscris ✔', // Subject line
                        text: 'Awesome long paragraph about inscription...', // plain text body
                        html: `<h1>Hello! ${req.body.name}</h1>
                        <p>Awesome long paragraph about inscription...</p>
                        <p> Inscris le ${now}</p>`
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                        res.json(true);
                    });


                })
            });
        });

    });


    app.post('/upload', expressJwt({ secret: secret }), (req, res) => {

        var upload = new Upload({
            dest: 'uploads/users',
            maxFileSize: 100 * 2048, // en Byte
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            rename: function (name, file) {
                console.log(this.fields);
                return file.filename;
            }
        });

        upload.on('end', function (fields, files) {
            // console.log(files.avatar.filename)
            r.table('users').filter({ email: req.user.email }).update({ picture: files.avatar.filename }).run(connection, (err, result) => {
                if (err) throw err;
                res.json(true)
            });
        });

        upload.on('error', function (err) {
            console.log(err)
            res.send(err);
        });

        upload.parse(req);

    });

    app.post('/regenerate', (req, res) => {

        /**
         * 1. vérifier son email si il existe en bdd (RethinkDB: isEmpty())
         * 2. Génerer un mot de pass avec BCrypt de façon aléatoire (Math.random())
         * 3. Metre à jour l'utlisateur en Base de Données
         * 4. Envoyé un email à l'utilisateur concerné en lui précisant que cet email est temporaire 
         */

        res.json(true)


    });

    app.post('/signin', (req, res) => {

        let user = null;
        // authentification basic user et password avec bcrypt
        r.table('users').filter({ "email": req.body.email }).run(connection, (err, cursor) => {

            if (err) throw err;
            cursor.toArray((err, result) => {
                if (err) throw err;
                bcrypt.compare(req.body.password, result[0].password, function (err, resultat) {
                    if (!resultat) { res.statusCode = 500; return res.json(err); }
                    user = result[0];

                    // création d'un jetton (token) avec la clef secret + clef publique
                    let token = jwt.sign({
                        email: user.email, // L'objet passé en premier paramètre à sign() va être encodé.
                    }, secret, { expiresIn: 18000 }); // // 60*5 minutes

                    res.json({
                        id_token: token,
                        user: user,
                    });

                });
            });
        });


    });



    app.post('/exist', (req, res) => {
        r.table('users').filter({ email: req.body.email }).isEmpty().run(connection, (err, result) => {
            if (err) throw err;
            res.json(result);
        });

    });


    app.get('/private', expressJwt({ secret: secret }), (req, res) => {
        res.json("Chacun a pour enemis les gens de sa maison");
    });


    app.post('/quote', (req, res) => {

        res.json("Chacun a pour enemis les gens de sa maison");
    });

});

app.listen(3000, function () {
    console.log('Listened on port 3000!')
})