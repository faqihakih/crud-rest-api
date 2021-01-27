const { resume } = require('../config/connection');
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

Dosen.create = (newDosen, result) => {
    conn.query("INSERT INTO dosen SET ?", newDosen, (err , res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("create dosen : ", {id : res.insertId, ...newDosen});
        result(null, {id : res.insertId, ...newDosen});
    })
}

Dosen.update = (dosenId, dataDosen, result) => {
    conn.query("UPDATE dosen SET nama_dosen = ?, pengampuh = ? WHERE id = ?", [dataDosen.nama_dosen, dataDosen.pengampuh, dosenId], (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind : "not found" }, null)
            return;
        }

        console.log("update dosen : ", ({id : dosenId, ...dataDosen}));
        result(null, {id : dosenId, ...dataDosen})
    })
}

Dosen.delete = (dosenId, result) => {
    conn.query("DELETE FROM dosen WHERE id = ?", dosenId, (err, res) =>{
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind : "not found"}, null);
            return;
        }

        console.log("delete data dosen dengan id : ", dosenId);;
        result(null, res);
    })
}

Dosen.deleteAll = (result) => {
    conn.query("DELETE FROM dosen", (err, res) => {
        if (err) {
            console.log("error ", err);
            result(err, null);
            return;
        }

        console.log("delete "+res.affectedRows+" dosen");
        result(null, res);
    })
}
module.exports = Dosen;