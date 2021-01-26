const conn = require('../config/connection');

// Construktor
let Dosen = function(dosen){
    this.nama_dosen = dosen.nama_dosen;
    this.pengampuh = dosen.pengampuh;
}

Dosen.getAll = (result) => {
    conn.query("SELECT nama_dosen, mk.nama_mk FROM dosen as d JOIN matakuliah as mk ON d.pengampuh = mk.id", (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Dosen : ", res);
        result(null, res);
    })
}

Dosen.getById = (dosenId, result) => {
    conn.query(`SELECT d.id, nama_dosen, mk.nama_mk FROM dosen as d JOIN matakuliah as mk ON d.pengampuh = mk.id WHERE d.id=${dosenId}`, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Dosen : ', res);
            result(null, res[0])
            return;
        }

        result({kind : "ngga ada data dengan id tersebut"}, null)
    })
}

module.exports = Dosen;