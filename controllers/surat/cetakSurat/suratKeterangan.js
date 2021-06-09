const db = require('../../../connection')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require('path')

const compile = async (templateName, data) => {
  let pathToTemplate = `templates/`
  const filePath = path.join(pathToTemplate, `${templateName}.hbs`)
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
              S.sekretariat_approval,
              S.id_romo,
              S.romo_approval,
              S.created_at,
              S.updated_at,
              S.deleted_at
      FROM Surat_Keterangan S JOIN Umat U on (S.id_umat=U.id) 
          JOIN (SELECT * FROM Umat) O ON (S.id_ortu=O.id) 
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
    console.log(data.no_surat)

    const content = await compile('suratKeterangan', data)

    await page.setContent(content)
    await page.emulateMediaType('screen')
    await page.pdf({
      path: 'a.pdf',
      format: 'A4',
      printBackground: true
    })

    console.log('done generate pdf')
    res.status(200).send({
      message: "Success retrieving data",
      result: 'a',
  })

    await browser.close()
    // process.exit()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  cetakSuratKeterangan,
}