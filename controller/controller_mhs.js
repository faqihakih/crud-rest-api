const Mahasiswa = require('../model/model_mhs');


// get all data
exports.findAll = (req, res) => {
    Mahasiswa.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message : err.message || "ada yang error gan"
            });
        }else{
            res.send(data);
        }
    })
}

// get by id
exports.findOne = (req, res) => {
    Mahasiswa.getById(req.params.mahasiswaId, (err, data) => {
        if (err) {
            if (err.kind === "data ngga ada gan dengan id tersebut") {
                res.status(404).send({
                    message : `data dengan id ${req.params.mahasiswaId} tidak ada.`
                })
            } else {
                res.status(500).send({
                    message : `gagal menerima data dengan id `+req.params.mahasiswaId
                })
            }
        } else {
            res.send(data)
        }
    })
}

// create data
exports.create = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message : "Content cant be empty"
        })
    }

    // create a mahasiswa
    const mahasiswa = new Mahasiswa({ 
        nama_mhs : req.body.nama_mhs,
        dosen_wali : req.body.dosen_wali,
        kelas : req.body.kelas
    });

    // console.log(mahasiswa);
    // save data on db
    Mahasiswa.create(mahasiswa, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Some error occured while creating data"
            })
        }else{
            res.send(data)
        }
    })
}

// update data
exports.update = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({
            message : " Content cant be empey"
        });
    };

    console.log(req.body);

    Mahasiswa.updateById(req.params.mahasiswaId, new Mahasiswa(req.body), (err, data) => {
        if (err) {
            if (err.kind == "ngga ada") {
                res.status(400).send({
                    message : "data mahasiswa dengan id : "+req.params.mahasiswaId+" itu ngga ada"
                });
            } else {
                res.status(500).send({
                    message : "gagal menerima data mahasiswa dengan id : "+req.params.mahasiswaId
                });
            }
        } else {
            res.send(data);
        }
    })
}

// delete data by id
exports.delete = (req, res) => {
    Mahasiswa.deleteById(req.params.mahasiswaId, (err, data) => {
        if (err) {
            if (err.kind == "ngga ada") {
                res.status(400).send({
                    message : "data mahasiswa dengan id : "+req.params.mahasiswaId+" itu ngga ada"
                })
            } else {
                res.status(500).send({
                    message : "gagal bisa hapus data mahasiswa dengan id : "+req.params.mahasiswaId
                })
            }
        } else {
            res.send({
                message : "Berhasil menghapus data mahasiswa!"
            });
        }
    })
}

// delete all mahasiswa
exports.deleteAll = (req, res) => {
    Mahasiswa.deleteAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:  err.message || "ada yang tidak beres saat menghapus semua data mahasiswa"
            });
        }else{
            res.send({
                message : "Semua data mahasiswa berhasil dihapus"
            })
        }
    })
}