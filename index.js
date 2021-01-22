const express = require('express');
const conn = require('./config/connection')

const app = express();

const port = 3000;


app.get('/', (req, res) => {
    let sql = "SELECT nama_mhs, kelas, nama_dosen, kode_mk, nama_mk FROM mahasiswa as mhs JOIN dosen as dsn ON mhs.dosen_wali = dsn.id JOIN matakuliah as mk ON dsn.pengampuh = mk.id";
    let query = conn.query(sql, (err, result) => {
        !err ? result.forEach(element => {
            res.json({
                nama : element.nama_mhs,
                kelas: element.kelas,
                nama_dosen : element.nama_dosen,
                kode_mk : element.kode_mk,
                nama_mk : element.nama_mk
            })
        }) : console.log("Query error");
        conn.end();
    })
})

app.listen(port, ()=>{
    console.log("berjalan pada http://localhost:"+port);
})