require('dotenv').config();
const { generateRandomString } = require('../../../utils')
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

const getData = async (id) => {
  try {
    let sql = 
      `SELECT S.id,
              S.no_surat,
              S.id_keluarga,
              S.id_lingkungan,
              L.nama_lingkungan,
              S.ketua_lingkungan,
              S.id_umat,
              U.nama,
              U.tempat_lahir,
              U.tgl_lahir,
              U.alamat,
              U.pekerjaan,
              S.pendidikan,
              S.id_ortu,
              O.nama AS nama_ortu,
              O.alamat AS alamat_ortu,
              S.keperluan,
              S.ketua_lingkungan_approval,
              S.id_sekretariat,
              Sekret.nama AS nama_sekretariat,
              S.sekretariat_approval,
              S.id_romo,
              S.romo_approval,
              S.created_at,
              S.updated_at,
              S.deleted_at
      FROM Surat_Keterangan S JOIN Umat U on (S.id_umat=U.id) 
          JOIN (SELECT * FROM Umat) O ON (S.id_ortu=O.id) 
          JOIN Lingkungan L ON (S.id_lingkungan=L.id)
          JOIN Admin Sekret ON (S.id_sekretariat=Sekret.id)
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

const cetakSuratKeterangan = async (req, res) => {
  const { id } = req.params

  try {
    const browser = await puppeteer.launch()
    const page =  await browser.newPage()
    
    const data = await getData(id)

    const content = await compile('suratKeterangan', data)

    await page.setContent(content)
    await page.emulateMediaType('screen')

    // const fileName = `${generateRandomString(10)}.pdf`

    const pdfBuffer = await page.pdf({
      // path: `/tmp/${fileName}`,
      format: 'A4',
      printBackground: true
    })

    console.log('done generate pdf')

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename="surat.pdf"');
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

module.exports = {
  cetakSuratKeterangan,
}