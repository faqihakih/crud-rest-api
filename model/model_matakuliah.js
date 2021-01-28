const conn  = require('../config/connection');

const Matakuliah = function(matakuliah){
    this.kode_mk = matakuliah.kode_mk;
    this.nama_mk = matakuliah.nama_mk;
};

Matakuliah.getAll = (result) => {
    conn.query("SELECT * FROM matakuliah", (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("Matakuliah : ", res);
        result(null, res)
    })
}

Matakuliah.getById = (matakuliahId, result) => {
    conn.query(`SELECT * FROM matakuliah WHERE id = ${matakuliahId}`, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(res);
            result(null, res[0])
            return;
        }

        result({messagge : "data ngga ada dengan id tersebut"}, null)
    })
}

Matakuliah.create = (newMatakuliah, result) => {
    conn.query("INSERT INTO matakuliah SET ?", newMatakuliah, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
        
        console.log("created matakuliah: ", {id : res.insertId, ...newMatakuliah});
        result(null, {id: res.insertId, ...newMatakuliah});
    });
};

Matakuliah.update = (matakuliahId, matakuliah, result) => {
    conn.query("UPDATE matakuliah SET kode_mk = ?, nama_mk = ? WHERE id = ?", [matakuliah.kode_mk, matakuliah.nama_mk, matakuliahId], (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind : "ngga ada"}, null);
            return;
        }

        console.log("update matajuliah", {id : matakuliah, ...matakuliah});
        result(null, {id : matakuliahId, ...matakuliah})
    })
}

Matakuliah.delete = (matakuliahId,result) => {
    conn.query("DELETE FROM matakuliah WHERE id = ?", matakuliahId, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return
        }

        if (res.affectedRows == 0) {
            result({kind : "ngga ada"}, null);
            return;
        }

        console.log("delete matakuliah dengan id : "+matakuliahId);
        result(null, res);
    })
}
module.exports = Matakuliah;