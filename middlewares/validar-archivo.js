const validarEntradaArchivo = async(req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(401).json({
            msg: 'No hay archivo en la peticion'
        })
    }

    next();

}


module.exports = {
    validarEntradaArchivo
}