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

module.exports = Mahasiswa;