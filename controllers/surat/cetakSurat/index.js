require('dotenv').config();
const db = require('../../../connection')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require('path')

const compile = async (templateName, data) => {
  const filePath = path.join(`templates/`, `${templateName}.hbs`)
  const html = await fs.readFile(filePath, 'utf-8')
  
  return hbs.compile(html)(data)
}

const getData = async (jenisSurat, id) => {
  if (jenisSurat === 'surat-keterangan') {
    return getDataSuratKeterangan(id)
  } else if (jenisSurat === 'surat-izin-pelayanan-ekaristi') {
    return getDataSuratIzinEkaristi(id)
  } else if (jenisSurat === 'surat-pelayanan-minyak-suci') {
    return getDataSuratPelayananMinyakSuci(id)
  } else if (jenisSurat === 'surat-keterangan-pindah') {
    return getDataSuratKeteranganPindah(id)
  } else if(jenisSurat === 'surat-keterangan-mati') {
    return getDataSuratKeteranganMati(id)
  } else if(jenisSurat === 'surat-keterangan-beasiswa') {
    return getDataSuratKeteranganBeasiswa(id)
  }
}

const getTemplateSurat = (jenisSurat) => {
  if (jenisSurat === 'surat-keterangan') return 'suratKeterangan'
  else if (jenisSurat === 'surat-izin-pelayanan-ekaristi') return 'suratIzinEkaristi'
  else if (jenisSurat === 'surat-pelayanan-minyak-suci') return 'suratMinyakSuci'
  else if (jenisSurat === 'surat-keterangan-pindah') return 'suratKeteranganPindah'
  else if (jenisSurat === 'surat-keterangan-mati') return 'suratKeteranganMati'
  else if (jenisSurat === 'surat-keterangan-beasiswa') return 'suratKeteranganBeasiswa'
} 

const cetakSurat = async (req, res) => {
  const { jenisSurat, id } = req.params

  try {
    const browser = await puppeteer.launch()
    const page =  await browser.newPage()
    
    const data = await getData(jenisSurat, id)

    console.log(data)

    if (data === 404) {
      return res.status(404).send({
        message: 'Data not found'
      });
    }

    const content = await compile(getTemplateSurat(jenisSurat), data)

    await page.setContent(content)
    await page.emulateMediaType('screen')

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
    })

    console.log('done generate pdf')

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename="${data.no_surat}.pdf"`);
    res.status(200).send(pdfBuffer);

    await browser.close()
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'error',
      error: error.message
    });
  }
}

// ==================================================================
// QUERIES ==========================================================
// ==================================================================


const getDataSuratKeterangan = async (id) => {
  try {
    let sql = 
    `SELECT S.id,
            S.no_surat,
            L.nama_lingkungan,
            S.ketua_lingkungan,
            U.nama,
            U.tempat_lahir,
            U.tgl_lahir,
            U.alamat,
            U.pekerjaan,
            S.pendidikan,
            O.nama AS nama_ortu,
            O.alamat AS alamat_ortu,
            S.keperluan,
            S.ketua_lingkungan_approval,
            Sekret.nama AS nama_sekretariat,
            S.sekretariat_approval,
            Romo.nama AS nama_romo_paroki,
            S.romo_approval,
            DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at
    FROM Surat_Keterangan S JOIN Umat U ON (S.id_umat=U.id) 
        JOIN (SELECT * FROM Umat) O ON (S.id_ortu=O.id) 
        JOIN Lingkungan L ON (S.id_lingkungan=L.id)
        JOIN Admin Sekret ON (S.id_sekretariat=Sekret.id)
        JOIN (SELECT id, nama, role FROM Admin) Romo ON (S.id_romo=Romo.id)
    WHERE S.id = ?`
    let result = await db(sql, [ id ])
    
    if(result.length === 0) {
      return 404
    } else {
      return result[0]
    }
  } catch (error) {
    console.log(error.message)
  }
}

const getDataSuratIzinEkaristi = async (id) => {
  try {
    let sql = 
    `SELECT S.id,
            S.no_surat,
            L.nama_lingkungan,
            K.nama_keluarga,
            K.nama_kepala_keluarga,
            K.no_telp_kepala_keluarga,
            S.id_lingkungan,
            L.nama_lingkungan,
            DATE_FORMAT(S.tgl_pelaksanaan, '%d-%m-%Y') AS tgl_pelaksanaan,
            S.waktu_mulai,
            S.waktu_selesai,
            S.intensi,
            S.lokasi_rumah,
            S.no_telp_lokasi,
            S.romo_pemimpin,
            S.alamat_komunitas,
            S.no_telp_komunitas,
            S.ketua_lingkungan,
            S.ketua_lingkungan_approval,
            Sekret.nama AS nama_sekretariat,
            S.sekretariat_approval,
            Romo.nama AS nama_romo_paroki,
            S.romo_approval,
            DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at
    FROM Surat_Izin_Pelayanan_Ekaristi S JOIN Keluarga K ON (S.id_keluarga=K.id)
        JOIN Lingkungan L ON (S.id_lingkungan=L.id)
        JOIN Admin Sekret ON (S.id_sekretariat=Sekret.id)
        JOIN (SELECT id, nama, role FROM Admin) Romo ON (S.id_romo=Romo.id)
    WHERE S.id = ?`
    let result = await db(sql, [ id ])
    
    if(result.length === 0) {
      return 404
    } else {
      result[0].waktu_mulai = result[0].waktu_mulai.substring(0,5)
      result[0].waktu_selesai = result[0].waktu_selesai.substring(0,5)
      return result[0]
    }
  } catch (error) {
    console.log(error.message)
  }
}

const getDataSuratPelayananMinyakSuci = async (id) => {
  try {
    let sql = 
    `SELECT S.id,
            S.no_surat,
            L.nama_lingkungan,
            S.id_keluarga,
            S.id_lingkungan,
            S.nama_keluarga_penanggung_jawab,
            S.alamat_keluarga_penanggung_jawab,
            S.no_telp_keluarga_penanggung_jawab,
            S.nama,
            S.nama_baptis,
            S.tempat_lahir,
            DATE_FORMAT(S.tgl_lahir, '%d-%m-%Y') AS tgl_lahir,
            S.alamat,
            S.nama_pasangan,
            S.cara_menikah,
            S.tahun_menikah,
            S.status_terima_minyak,
            DATE_FORMAT(S.tgl_terima_minyak, '%d-%m-%Y') AS tgl_terima_minyak,
            R.nama_pastor_pelayan,
            S.pastor_pelayan_approval,
            S.ketua_lingkungan,
            S.ketua_lingkungan_approval,
            S.sekretariat_approval,
            DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
            DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
            DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
        FROM Surat_Pelayanan_Minyak_Suci S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)
        JOIN Lingkungan L ON (S.id_lingkungan=L.id)
        JOIN Admin Sekret ON (S.id_sekretariat=Sekret.id)
    WHERE S.id = ?`
    let result = await db(sql, [ id ])
    
    if(result.length === 0) {
      return 404
    } else {
      if(result[0].nama_pasangan === null) {
        result[0].nama_pasangan = '-'
        result[0].cara_menikah = '-'
        result[0].tahun_menikah = '-'
      }
      if(result[0].status_terima_minyak === 'Belum pernah') {
        result[0].tgl_terima_minyak = '-'
      }
      return result[0]
    }
  } catch (error) {
    console.log(error.message)
  }
}

const getDataSuratKeteranganPindah = async (id) => {
  try {
    let sql = 
    `SELECT S.id,
            S.no_surat,
            S.id_keluarga,
            S.id_umat,
            U.nama,
            U.tempat_lahir,
            U.tgl_lahir,
            S.paroki_lama,
            S.id_lingkungan_lama,
            L.nama_lingkungan AS nama_lingkungan_lama,
            S.tgl_domisili_lama,
            S.alamat_lama,
            S.no_telp_lama,
            S.tgl_domisili_baru,
            S.alamat_baru,
            S.no_telp_baru,
            S.id_lingkungan_baru,
            S.nama_lingkungan_baru,
            S.paroki_baru,
            S.ketua_lingkungan,
            S.ketua_lingkungan_approval,
            Romo.nama AS nama_romo_paroki,
            S.romo_approval,
            DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
            DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
            DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
    FROM Surat_Keterangan_Pindah S JOIN Umat U ON (S.id_umat=U.id) 
        JOIN Lingkungan L ON (S.id_lingkungan_lama=L.id)
        JOIN (SELECT id, nama, role FROM Admin) Romo ON (S.id_romo=Romo.id)
    WHERE S.id = ?`
    let result = await db(sql, [ id ])
    
    if(result.length === 0) {
      return 404
    } else {
      const hariList = ['Minggu','Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

      //  GET nama hari utl tgl domisili lama
      let tempTgl = new Date(result[0].tgl_domisili_lama)
      result[0].hari_domisili_lama = hariList[tempTgl.getDay()]

      //  UBAH format YYYY-MM-DD jadi DD-MM-YYYY
      let date = tempTgl.getDate()
        , month = tempTgl.getMonth()
        , year = tempTgl.getFullYear()
      
      //  UBAH tgl dan bulan jadi 2 digit kalo cuma 1 digit
        date = date < 10 ? `0${date}` : date
      month = month < 10 ? `0${month}` : month

      result[0].tgl_domisili_lama = `${date}-${month}-${year}`

      //  GET nama hari utl tgl domisili baru
      tempTgl = new Date(result[0].tgl_domisili_baru)
      result[0].hari_domisili_baru = hariList[tempTgl.getDay()]

      //  UBAH format YYYY-MM-DD jadi DD-MM-YYYY
      date = tempTgl.getDate()
      month = tempTgl.getMonth()
      year = tempTgl.getFullYear()

      //  UBAH tgl dan bulan jadi 2 digit kalo cuma 1 digit
      date = date < 10 ? `0${date}` : date
      month = month < 10 ? `0${month}` : month
      
      result[0].tgl_domisili_baru = `${date}-${month}-${year}`

      return result[0]
    }
  } catch (error) {
    console.log(error.message)
  }
}

const getDataSuratKeteranganMati = async (id) => {
  try {
    let sql = 
    `SELECT S.id,
            S.no_surat,
            S.id_keluarga,
            S.id_lingkungan,
            L.nama_lingkungan,
            K.no_telp_kepala_keluarga AS no_hp_ketua_lingkungan,
            S.id_umat,
            U.nama,
            U.nama_baptis,
            U.tempat_lahir,
            DATE_FORMAT(U.tgl_lahir, '%d-%m-%Y') AS tgl_lahir,
            U.alamat,
            D.id_ayah,
            D.id_ibu,
            S.nama_pasangan,
            S.tempat_meninggal,
            DATE_FORMAT(S.tgl_meninggal, '%d-%m-%Y') AS tgl_meninggal,
            S.tempat_makam_kremasi,
            DATE_FORMAT(S.tgl_makam_kremasi, '%d-%m-%Y') AS tgl_makam_kremasi,
            DATE_FORMAT(S.tgl_komuni, '%d-%m-%Y') AS tgl_komuni,
            S.pelayan_komuni,
            DATE_FORMAT(S.tgl_pengampunan_dosa, '%d-%m-%Y') AS tgl_pengampunan_dosa,
            S.pelayan_pengampunan_dosa,
            DATE_FORMAT(S.tgl_perminyakan, '%d-%m-%Y') AS tgl_perminyakan,
            S.pelayan_perminyakan,
            DATE_FORMAT(S.tgl_baptis_darurat, '%d-%m-%Y') AS tgl_baptis_darurat,
            S.pelayan_baptis_darurat,
            S.id_imam_pemberkat,
            I.nama AS nama_imam,
            S.imam_pemberkat_approval,
            S.nama_pelapor,
            S.no_hp_pelapor,
            S.no_hp_penanggungjawab,
            S.ketua_lingkungan,
            S.ketua_lingkungan_approval,
            DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at
    FROM Surat_Keterangan_Mati S JOIN Umat U ON (S.id_umat=U.id)
        JOIN Detail_Umat D ON (U.id=D.id_umat) 
        JOIN Admin I ON (S.id_imam_pemberkat=I.id)
        JOIN Lingkungan L ON (S.id_lingkungan=L.id)
        JOIN (SELECT id, no_telp_kepala_keluarga FROM Keluarga) K ON (L.ketua_lingkungan_id=K.id)
    WHERE S.id = ?`
    let result = await db(sql, [ id ])
    
    if(result.length === 0) {
      return 404
    } else {
      sql = `SELECT nama FROM Umat WHERE id=?`
      let tempIdOrtu = result[0].id_ayah != null ? result[0].id_ayah : result[0].id_ibu
      let tempOrtu = await db(sql, [ tempIdOrtu ])

      console.log(tempOrtu)

      result[0].nama_ortu = tempOrtu[0].nama

      if (result[0].nama_pasangan == null) {
        result[0].nama_pasangan = '-'
      }

      return result[0]
    }
  } catch (error) {
    console.log(error.message)
  }
}

const getDataSuratKeteranganBeasiswa = async (id) => {
  try {
    let sql = 
    `SELECT S.id,
            S.no_surat,
            S.id_keluarga,
            S.id_lingkungan,
            L.nama_lingkungan,
            S.ketua_lingkungan,
            S.id_siswa,
            U.nama,
            U.tempat_lahir,
            U.tgl_lahir,
            U.alamat,
            U.no_telp,
            S.sekolah,
            S.kelas,
            Ayah.nama AS nama_ayah,
            Ibu.nama AS nama_ibu,
            Ayah.alamat AS alamat_ortu,
            Ayah.pekerjaan AS pekerjaan_ayah,
            Ibu.pekerjaan AS pekerjaan_ibu,
            S.status_beasiswa,
            S.permohonan,
            S.ketua_lingkungan_approval,
            S.id_romo,
            Romo.nama AS nama_romo_paroki,
            S.romo_approval,
            DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at
        FROM Surat_Keterangan_Beasiswa S JOIN Umat U on (S.id_siswa=U.id)
        JOIN Detail_Umat D ON (S.id_siswa=D.id_umat)
        JOIN (SELECT * FROM Umat) Ayah on (D.id_ayah=Ayah.id) 
        JOIN (SELECT * FROM Umat) Ibu on (D.id_ibu=Ibu.id) 
        JOIN Admin Romo ON (S.id_romo=Romo.id)
        JOIN Lingkungan L ON (S.id_lingkungan=L.id)
    WHERE S.id = ?`
    let result = await db(sql, [ id ])
    
    if(result.length === 0) {
      return 404
    } else {
      return result[0]
    }
  } catch (error) {
    console.log(error.message)
  }
}




module.exports = {
  cetakSurat,
}