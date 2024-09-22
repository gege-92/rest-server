const { response } = require("express")


const validarArchivoSubir = ( req, res = response, next) => {

    //Verifico que haya un archivo en req.files
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({ msg: 'No hay archivos para subir - validarArchivoSubir'});
    }

    next();

}


module.exports = {
    validarArchivoSubir
}