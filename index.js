const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./config/connection');
const mahasiswaController = require('./controller/controller_mhs')

const app = express();

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));
// parse requests of content-type: application/json
app.use(bodyParser.json());

const port = 3000;


app.get('/', (req, res) => {
    let sql = "SELECT nama_mhs, kelas, nama_dosen, kode_mk, nama_mk FROM mahasiswa as mhs JOIN dosen as dsn ON mhs.dosen_wali = dsn.id JOIN matakuliah as mk ON dsn.pengampuh = mk.id";
    let query = conn.query(sql, (err, result) => {
        // !err ? result.forEach(element => {
        //     res.json({
        //         nama : element.nama_mhs,
        //         kelas: element.kelas,
        //         nama_dosen : element.nama_dosen,
        //         kode_mk : element.kode_mk,
        //         nama_mk : element.nama_mk
        //     })
        // }) : console.log("Query error");
        res.json({
            "message" : "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
        })
        conn.end();
    })
})

app.get("/mahasiswa", mahasiswaController.findAll);
app.get("/mahasiswa/:mahasiswaId", mahasiswaController.findOne);
app.post("/mahasiswa", mahasiswaController.create)

app.listen(port, ()=>{
    console.log("berjalan pada http://localhost:"+port);
})