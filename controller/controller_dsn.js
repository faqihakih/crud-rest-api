const { resume } = require('../config/connection');
const Dosen = require('../model/model_dsn');

exports.findAll = (req, res) => {
    Dosen.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message : err.message || "ada yang error gan"
            });
        }else{
            res.send(data);
        }
    })
}

exports.findOne = (req, res) => {
    Dosen.getById(req.params.dosenId, (err, data) => {
        if (err) {
            if (err.kind == "ngga ada data dengan id tersebut") {
                res.status(404).send({
                    message : `data dengan id ${req.params.dosenId} tidak ada`
                })
            } else {
                res.status(500).send({
                    message :  `gagal menerima data dengan id ${req.params.dosenId}`
                })
            }
        } else {
            res.send(data)
        }
    })
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message : "content cant be empety"
        })
    }

    const dosen = new Dosen({
        nama_dosen : req.body.nama_dosen,
        pengampuh : req.body.pengampuh
    })

    Dosen.create(dosen, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "some error occured"
            })
        }else{
            res.send(data)
        }
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        response.status(400).send({
            message : "Content cant be empety"
        })
    }

    console.log(req.body);

    Dosen.update(req.params.dosenId, new Dosen(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not found") {
                res.status(400).send({
                    message : `data mahasiswa dengan id : ${req.params.dosenId} tersebut tidak ada`
                })
            } else {
                res.status(500).send({
                    message : `gagal menerima data dosen dengan id ${req.params.dosenId}`
                })
            }
        }else{
            res.send(data);
        }
    })
}

exports.delete = (req, res) => {
    Dosen.delete(req.params.dosenId, (err, data) => {
        if (err) {
            if (err.kind == "not found") {
                console.log("error : ", err);
                res.status(400).send({
                message :  `data dengan id ${req.params.dosenId} tersebut tidak ada`
            })
            } else {
                res.status(500).send({
                    message : "gagal menerima data dari id "+req.params.dosenId
                })
            }
        }else{
            res.send({
                message : "berhasil menghapus data dosen!"
            })
        }
    })
}

exports.deleteAll = (req, res) => {
    Dosen.deleteAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "ada yang tidak beres saat menghapus semua data dosen"
            })
        }else{
            res.send({
                message : "semua data dosen berhasil dihapus"
            })
        }
    })
}