const Matakuliah = require('../model/model_matakuliah');

exports.findAll = (req, res) => {
    Matakuliah.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                messagge : err.messagge || "ada yang error nih"
            })
        }else{
            res.send(data);
        }
    })
}

exports.findOne = (req, res) => {
    Matakuliah.getById(req.params.matakuliahId, (err, data) => {
        if (err) {
            if (err.messagge == "data ngga ada dengan id tersebut") {
                res.status(400).send({
                    messagge : `data dengan id : ${req.params.matakuliahId} tersebut ngga ada`
                })
            } else {
                res.status(500).send({
                    messagge : "gagal menerima data dari id : "+req.params.matakuliahId
                })
            }
        }else{
            res.send(data)
        }
    })
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message : "Content cant be empty"
        })
    }

    // create a mahasiswa
    const matakuliah = new Matakuliah({ 
        kode_mk : req.body.kode_mk,
        nama_mk : req.body.nama_mk
    });

    // save data on db
    Matakuliah.create(matakuliah, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Some error occured while creating data"
            })
        }else{
            res.send(data)
        }
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message : "Content cant be empety"
        })
    }

    console.log(req.body);

    Matakuliah.update(req.params.matakuliahId, new Matakuliah(req.body), (err, data) => {
        if (err) {
            if (err.kind == "ngga ada") {
                res.status(400).send({
                    message : `data dengan id ${req.params.matakuliahId} tersebut tidak ada`
                })
            } else {
                res.status(500).send({
                    message : "gagal menerima data dari id "+req.params.matakuliahId
                })
            }
        }else{
            res.status(200).send(data)
        }
    })
}

exports.delete = (req, res) => {
    Matakuliah.delete(req.params.matakuliahId, (err, data) => {
        if (err) {
            if (err.kind == "ngaa ada") {
                res.status(400).send({
                    message : "data dengan id tersebut tidak ada"
                })
            } else {
                res.status(500).send({
                    message : "gagal menghapus data dari id tesebut"
                })
            }
        } else {
            res.status(200).send({
                message : "Berhasil menghapus data matakuliah"
            })
        }
    })
}