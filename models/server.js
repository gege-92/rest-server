const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.authPath           = '/api/auth';
        this.buscarPath         = '/api/buscar';
        this.categoriasPath     = '/api/categorias';
        this.productosPath      = '/api/productos';
        this.usuariosPath       = '/api/usuarios';
        this.uploadsPath        = '/api/uploads';
        
        //Conectar DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
       
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );

        //fileUpload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }) );

    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth.routes')); //                '/api/auth'
        this.app.use(this.buscarPath, require('../routes/buscar.routes')); //            '/api/buscar'
        this.app.use(this.categoriasPath, require('../routes/categorias.routes')); //    '/api/categorias'
        this.app.use(this.productosPath, require('../routes/productos.routes')); //      '/api/productos'
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes')); //        '/api/usuarios'
        this.app.use(this.uploadsPath, require('../routes/uploads.routes')); //          '/api/uploads'
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`);
          })
    }

}


module.exports = Server;