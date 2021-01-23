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