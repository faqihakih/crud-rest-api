const express = require('express');
const bodyParser = require('body-parser');
const mahasiswaController = require('./controller/controller_mhs');
const dosenController = require('./controller/controller_dsn');
const Dosen = require('./model/model_dsn');


const app = express();

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse requests of content-type: application/json
app.use(bodyParser.json());

const port = 3000;


app.get('/', (req, res) => {
    //    let sql = "SELECT nama_mhs, kelas, nama_dosen, kode_mk, nama_mk FROM mahasiswa as mhs JOIN dosen as dsn ON mhs.dosen_wali = dsn.id JOIN matakuliah as mk ON dsn.pengampuh = mk.id";
    //  let query = conn.query(sql, (err, result) => {
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
        "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
    })
    //    conn.end();
})


// endpoint for mahasiswa
app.get("/mahasiswa", mahasiswaController.findAll);
app.get("/mahasiswa/:mahasiswaId", mahasiswaController.findOne);
app.post("/mahasiswa", mahasiswaController.create)
app.put("/mahasiswa/:mahasiswaId", mahasiswaController.update)
app.delete("/mahasiswa/:mahasiswaId", mahasiswaController.delete)
app.delete("/mahasiswa", mahasiswaController.deleteAll)

// endpoint for dosen
app.get("/dosen", dosenController.findAll)
app.get("/dosen/:dosenId", dosenController.findOne)
app.post("/dosen", dosenController.create)
app.put("/dosen/:dosenId", dosenController.update)
app.delete("/dosen/:dosenId", dosenController.delete)
app.delete("/dosen", dosenController.deleteAll)

app.listen(port, () => {
    console.log("berjalan pada http://localhost:" + port);
})