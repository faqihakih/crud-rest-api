const conn = require('../config/connection');

//Constructor
const Mahasiswa = function(mahasiswa){
    this.nama_mhs = mahasiswa.nama_mhs;
    this.dosen_wali = mahasiswa.dosen_wali;
    this.kelas = mahasiswa.kelas;
};

Mahasiswa.getAll = (result) => {
    conn.query("SELECT mahasiswa.id, nama_mhs, nama_dosen as dosen_wali, kelas FROM mahasiswa join dosen on mahasiswa.dosen_wali = dosen.id", (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        console.log("Mahasiswa : ", res);
        result(null, res);
    })
}

Mahasiswa.getById = (mahasiswaId, result) => {
    conn.query(`SELECT mahasiswa.id, nama_mhs, nama_dosen as dosen_wali, kelas FROM mahasiswa join dosen on mahasiswa.dosen_wali = dosen.id where mahasiswa.id=${mahasiswaId}`, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Mahasiswa :", res);
            result(null, res[0]);
            return;
        }

        result({kind : "data ngga ada gan dengan id tersebut"}, null);
    });
};

Mahasiswa.create = (newMahasiswa, result) => {
    conn.query("INSERT INTO mahasiswa SET ?", newMahasiswa, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
        
        console.log("created mahasiswa: ", {id : res.insertId, ...newMahasiswa});
        result(null, {id: res.insertId, ...newMahasiswa});
    });
};

Mahasiswa.updateById = (mahasiswaId, mahasiswa, result) => {
    conn.query("UPDATE mahasiswa SET nama_mhs = ?, dosen_wali = ?, kelas = ? WHERE id = ?",
    [mahasiswa.nama_mhs, mahasiswa.dosen_wali, mahasiswa.kelas, mahasiswaId],
    (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // mahasiswa dengan id tersebut ngga ada
            result({kind : "ngga ada"}, null);
            return;
        }

        console.log("update mahasiswa : ", {id:mahasiswaId, ...mahasiswa});
        result(null, {id:mahasiswaId, ...mahasiswa})
    })
}

Mahasiswa.deleteById = (mahasiswaId, result) => {
    conn.query("DELETE FROM mahasiswa WHERE id = ?", mahasiswaId, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // mahasiswa dengan id tersebut ngga ada
            result({kind : "ngga ada"}, null);
            return;
        }

        console.log("delete mahasiswa dengan id : ", mahasiswaId);
        result(null, res);
    })
}

Mahasiswa.deleteAll = (result) => {
    conn.query("DELETE FROM mahasiswa", (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("delete "+res.affectedRows+" mahasiswa");
        result(null, res);
    })
}
module.exports = Mahasiswa;