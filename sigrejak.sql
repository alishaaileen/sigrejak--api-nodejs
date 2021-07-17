-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sigrejak
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sigrejak
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sigrejak` DEFAULT CHARACTER SET utf8 ;
USE `sigrejak` ;

-- -----------------------------------------------------
-- Table `sigrejak`.`Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Admin` (
  `id` VARCHAR(36) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `no_telp` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` INT NOT NULL,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sigrejak`.`Paroki`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `sigrejak`.`Paroki` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `nama_paroki` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sigrejak`.`Keluarga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Keluarga` (
  `id` VARCHAR(36) NOT NULL,
  `nama_keluarga` VARCHAR(255) NOT NULL,
  `nama_kepala_keluarga` VARCHAR(255) NOT NULL,
  `no_telp_kepala_keluarga` VARCHAR(20) NOT NULL,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sigrejak`.`Lingkungan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Lingkungan` (
  `id` VARCHAR(36) NOT NULL,
  `kode` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nama_lingkungan` VARCHAR(255) NOT NULL,
  `ketua_lingkungan_id` VARCHAR(36) UNIQUE NOT NULL,
  -- `paroki_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  -- INDEX `fk_Lingkungan_Paroki1_idx` (`Paroki_id` ASC) VISIBLE,
  -- CONSTRAINT `fk_Lingkungan_Paroki1`
  --   FOREIGN KEY (`paroki_id`)
  --   REFERENCES `sigrejak`.`Paroki` (`id`),
  CONSTRAINT `fk_Lingkungan_Keluarga1`
    FOREIGN KEY (`ketua_lingkungan_id`)
    REFERENCES `sigrejak`.`Keluarga` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sigrejak`.`Umat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Umat` (
  `id` VARCHAR(36) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `tempat_lahir` VARCHAR(255) NOT NULL,
  `tgl_lahir` DATE NOT NULL,
  `jenis_kelamin` VARCHAR(10) NOT NULL,
  `nama_baptis` VARCHAR(255),
  `alamat` VARCHAR(255) NOT NULL,
  `no_telp` VARCHAR(20) NOT NULL,
  `pekerjaan` VARCHAR(255) NOT NULL,
  `is_dead` TINYINT NOT NULL,
  `is_umat_active` TINYINT NOT NULL,
  `keluarga_id` VARCHAR(36) NOT NULL,
  `lingkungan_id` VARCHAR(36) NOT NULL,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  -- INDEX `fk_Umat_keluarga_idx` (`keluarga_id` ASC) VISIBLE,
  CONSTRAINT `fk_anggota_keluarga`
    FOREIGN KEY (`keluarga_id`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_umat_lingkungan`
    FOREIGN KEY (`lingkungan_id`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sigrejak`.`Detail_Umat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Detail_Umat` (
  `id` VARCHAR(36) NOT NULL,
  `id_umat` VARCHAR(36) UNIQUE NOT NULL,
  `tgl_baptis` DATE,
  `tgl_komuni` DATE,
  `tgl_penguatan` DATE,
  `file_akta_lahir` VARCHAR(255),
  `file_ktp` VARCHAR(255),
  `id_ayah` VARCHAR(36),
  `id_ibu` VARCHAR(36),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_umat`
    FOREIGN KEY (`id_umat`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_umat_ayah`
    FOREIGN KEY (`id_ayah`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_umat_ibu`
    FOREIGN KEY (`id_ibu`)
    REFERENCES `sigrejak`.`Umat` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Keterangan_Pindah`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Keterangan_Pindah` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `ketua_lingkungan` VARCHAR(255),
  `id_umat` VARCHAR(36) NOT NULL,
  `id_lingkungan_lama` VARCHAR(36) NOT NULL,
  `tgl_domisili_lama` DATE NOT NULL,
  `paroki_lama` VARCHAR(255) NOT NULL,
  `alamat_lama` TEXT NOT NULL,
  `no_telp_lama` VARCHAR(255) NOT NULL,
  `tgl_domisili_baru` DATE NOT NULL,
  `alamat_baru` TEXT NOT NULL,
  `no_telp_baru` VARCHAR(255) NOT NULL,
  `id_lingkungan_baru` VARCHAR(36),
  `nama_lingkungan_baru` VARCHAR(255),
  `paroki_baru` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `id_romo` VARCHAR(36),
  `romo_approval` TINYINT,
  `romo_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_keterangan_pindah_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_keterangan_pindah_lingkungan_lama`
    FOREIGN KEY (`id_lingkungan_lama`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_keterangan_pindah_umat`
    FOREIGN KEY (`id_umat`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_keterangan_pindah_lingkungan_baru`
    FOREIGN KEY (`id_lingkungan_baru`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_keterangan_pindah_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_keterangan_pindah_romo`
    FOREIGN KEY (`id_romo`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Keterangan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Keterangan` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `ketua_lingkungan` VARCHAR(255),
  `id_umat` VARCHAR(36) NOT NULL,
  `pendidikan` VARCHAR(255) NOT NULL,
  `id_ortu` VARCHAR(36),
  `keperluan` TEXT NOT NULL,
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `id_romo` VARCHAR(36),
  `romo_approval` TINYINT,
  `romo_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_keterangan_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_keterangan_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_keterangan_umat`
    FOREIGN KEY (`id_umat`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_keterangan_ortu`
    FOREIGN KEY (`id_ortu`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_keterangan_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_keterangan_romo`
    FOREIGN KEY (`id_romo`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Izin_Pelayanan_Ekaristi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Izin_Pelayanan_Ekaristi` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `tgl_pelaksanaan` DATE NOT NULL,
  `waktu_mulai` TIME NOT NULL,
  `waktu_selesai` TIME NOT NULL,
  `intensi` TEXT NOT NULL,
  `lokasi_rumah` VARCHAR(255) NOT NULL,
  `no_telp_lokasi` VARCHAR(20) NOT NULL,
  `romo_pemimpin` VARCHAR(255) NOT NULL,
  `alamat_komunitas` VARCHAR(255) NOT NULL,
  `no_telp_komunitas` VARCHAR(20) NOT NULL,
  `ketua_lingkungan` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `id_romo` VARCHAR(36),
  `romo_approval` TINYINT,
  `romo_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_izin_pelayanan_ekaristi_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_izin_pelayanan_ekaristi_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_izin_pelayanan_ekaristi_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_izin_pelayanan_ekaristi_romo`
    FOREIGN KEY (`id_romo`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Keterangan_Beasiswa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Keterangan_Beasiswa` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `id_siswa` VARCHAR(36) NOT NULL,
  `sekolah` VARCHAR(255) NOT NULL,
  `kelas` VARCHAR(255) NOT NULL,
  `status_beasiswa` VARCHAR(20) NOT NULL,
  `permohonan` TEXT NOT NULL,
  `file_syarat_beasiswa` VARCHAR(255) NOT NULL,
  `ketua_lingkungan` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `id_romo` VARCHAR(36),
  `romo_approval` TINYINT,
  `romo_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_keterangan_beasiswa_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_keterangan_beasiswa_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_keterangan_beasiswa_siswa`
    FOREIGN KEY (`id_siswa`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_keterangan_beasiswa_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_keterangan_beasiswa_romo`
    FOREIGN KEY (`id_romo`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Baptis_Anak`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Baptis_Anak` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `id_anak` VARCHAR(36) NOT NULL,
  `nama_baptis` VARCHAR(255) NOT NULL,
  `cara_ortu_menikah` VARCHAR(150) NOT NULL,
  `tempat_ortu_menikah` VARCHAR(255) NOT NULL,
  `tgl_ortu_menikah` DATE NOT NULL,
  `nama_wali_baptis` VARCHAR(255) NOT NULL,
  `tgl_krisma_wali_baptis` DATE NOT NULL,
  `ketua_lingkungan` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `jadwal_baptis` DATETIME,
  `id_romo_pembaptis` VARCHAR(36),
  `file_syarat_baptis` VARCHAR(255) NOT NULL,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_baptis_anak_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_baptis_anak_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_baptis_anak_anak`
    FOREIGN KEY (`id_anak`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_baptis_anak_romo_pembaptis`
    FOREIGN KEY (`id_romo_pembaptis`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_baptis_anak_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Baptis_Dewasa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Baptis_Dewasa` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `id_umat` VARCHAR(36) NOT NULL,
  `nama_baptis` VARCHAR(255) NOT NULL,
  
  `status_perkawinan` VARCHAR(50) NOT NULL,
  `calon_pasangan` VARCHAR(255),
  `tgl_menikah_calon` DATE,
  `cara_menikah` VARCHAR(150),
  `tempat_menikah` VARCHAR(255),
  `tgl_menikah` DATE,
  `pembatalan_perkawinan` VARCHAR(150),
  
  `tgl_mulai_belajar_agama` DATE NOT NULL,
  `tgl_mulai_ikut_ekaristi` DATE NOT NULL,
  `tgl_mulai_kegiatan_lingkungan` DATE NOT NULL,
  
  `nama_guru` VARCHAR(255) NOT NULL,
  
  `nama_wali` VARCHAR(255) NOT NULL,
  `tgl_krisma_wali` DATE NOT NULL,
  `tempat_krisma_wali` VARCHAR(255) NOT NULL,
  
  `file_syarat_baptis` VARCHAR(255) NOT NULL,
  
  `tempat_tahap_satu` VARCHAR(255),
  `tgl_tahap_satu` DATE,
  `id_romo_tahap_satu` VARCHAR(36),
  `tempat_tahap_dua` VARCHAR(255),
  `tgl_tahap_dua` DATE,
  `id_romo_tahap_dua` VARCHAR(36),
  `tempat_baptis` VARCHAR(255),
  `jadwal_baptis` DATETIME,
  `id_romo_pembaptis` VARCHAR(36),
  
  `ketua_lingkungan` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,

  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_baptis_dewasa_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_baptis_dewasa_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_baptis_dewasa_umat`
    FOREIGN KEY (`id_umat`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_baptis_dewasa_romo_pembaptis`
    FOREIGN KEY (`id_romo_pembaptis`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_baptis_dewasa_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Komuni_Penguatan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Komuni_Penguatan` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `id_umat` VARCHAR(36) NOT NULL,
  `jenis_surat` TINYINT NOT NULL, -- 1 = Komuni I, 2 = Penguatan
  `paroki_baptis` VARCHAR(255) NOT NULL,
  `tgl_baptis` DATE NOT NULL,
  `no_surat_baptis` VARCHAR(50) NOT NULL,
  `sekolah` VARCHAR(255) NOT NULL,
  `kelas` VARCHAR(100) NOT NULL,
  `nama_pelindung` VARCHAR(255) NOT NULL,
  `nama_wali_penguatan` VARCHAR(255),
  `tgl_krisma_wali` DATE,
  `file_syarat` VARCHAR(255) NOT NULL,
  `ketua_lingkungan` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_komuni_penguatan_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_komuni_penguatan_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_komuni_penguatan_umat`
    FOREIGN KEY (`id_umat`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_komuni_penguatan_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Keterangan_Calon_Pengantin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Keterangan_Calon_Pengantin` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `id_umat` VARCHAR(36) NOT NULL,
  `nama_pasangan` VARCHAR(255) NOT NULL,
  `tempat_lahir_pasangan` VARCHAR(255) NOT NULL,
  `tgl_lahir_pasangan` DATE NOT NULL,
  `alamat_pasangan` VARCHAR(255) NOT NULL,
  `no_telp_pasangan` VARCHAR(20) NOT NULL,
  `pekerjaan_pasangan` VARCHAR(255) NOT NULL,
  `agama_pasangan` VARCHAR(255) NOT NULL,
  `nama_ayah_pasangan` VARCHAR(255) NOT NULL,
  `nama_ibu_pasangan` VARCHAR(255) NOT NULL,
  `file_syarat` VARCHAR(255) NOT NULL,
  `ketua_lingkungan` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `id_romo` VARCHAR(36),
  `romo_approval` TINYINT,
  `romo_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_keterangan_calon_pengantin_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_keterangan_calon_pengantin_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_keterangan_calon_pengantin_umat`
    FOREIGN KEY (`id_umat`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_keterangan_calon_pengantin_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_keterangan_calon_pengantin_romo_paroki`
    FOREIGN KEY (`id_romo`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Pelayanan_Minyak_Suci`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Pelayanan_Minyak_Suci` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36),
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `nama_keluarga_penanggung_jawab` VARCHAR(255),
  `alamat_keluarga_penanggung_jawab` VARCHAR(255),
  `no_telp_keluarga_penanggung_jawab` VARCHAR(20),
  -- `id_umat` INT,
  `nama` VARCHAR(255),
  `nama_baptis` VARCHAR(255),
  `tempat_lahir` TEXT,
  `tgl_lahir` DATE,
  `alamat` TEXT,
  `nama_pasangan` VARCHAR(255),
  `cara_menikah` VARCHAR(50),
  `tahun_menikah` INT,
  `status_terima_minyak` VARCHAR(50) NOT NULL,
  `tgl_terima_minyak` DATE,
  `id_pastor_pelayan` VARCHAR(36) NOT NULL,
  `pastor_pelayan_approval` TINYINT,
  `pastor_pelayan_approval_stamp` DATETIME,
  `ketua_lingkungan` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_minyak_suci_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_minyak_suci_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  -- CONSTRAINT `fk_surat_minyak_suci_umat`
  --   FOREIGN KEY (`id_umat`)
  --   REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_minyak_suci_pastor_pelayan`
    FOREIGN KEY (`id_pastor_pelayan`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_minyak_suci_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Surat_Keterangan_Mati`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Surat_Keterangan_Mati` (
  `id` VARCHAR(36) NOT NULL,
  `no_surat` VARCHAR(50) UNIQUE NOT NULL,
  `id_keluarga` VARCHAR(36) NOT NULL,
  `id_lingkungan` VARCHAR(36) NOT NULL,
  `id_umat` VARCHAR(36) NOT NULL,
  `nama_pasangan` VARCHAR(255),
  `tempat_meninggal` TEXT NOT NULL,
  `tgl_meninggal` DATE NOT NULL,
  `tempat_makam_kremasi` TEXT NOT NULL, -- makam atau kremasi
  `tgl_makam_kremasi` DATE NOT NULL,
  `tgl_komuni` DATE NOT NULL,
  `pelayan_komuni` VARCHAR(255) NOT NULL,
  `tgl_pengampunan_dosa` DATE NOT NULL,
  `pelayan_pengampunan_dosa` VARCHAR(255) NOT NULL,
  `tgl_perminyakan` DATE NOT NULL,
  `pelayan_perminyakan` VARCHAR(255) NOT NULL,
  `tgl_baptis_darurat` DATE NOT NULL,
  `pelayan_baptis_darurat` VARCHAR(255) NOT NULL,
  `nama_pelapor` VARCHAR(255) NOT NULL,
  `no_hp_pelapor` VARCHAR(20) NOT NULL,
  `no_hp_penanggungjawab` VARCHAR(20) NOT NULL,
  `id_imam_pemberkat` VARCHAR(36) NOT NULL,
  `imam_pemberkat_approval` TINYINT,
  `imam_pemberkat_approval_stamp` DATETIME,
  `ketua_lingkungan` VARCHAR(255),
  `ketua_lingkungan_approval` TINYINT,
  `ketua_lingkungan_approval_stamp` DATETIME,
  `id_sekretariat` VARCHAR(36),
  `sekretariat_approval` TINYINT,
  `sekretariat_approval_stamp` DATETIME,
  `created_at` DATE,
  `updated_at` DATE,
  `deleted_at` DATE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_surat_keterangan_mati_keluarga`
    FOREIGN KEY (`id_keluarga`)
    REFERENCES `sigrejak`.`Keluarga` (`id`),
  CONSTRAINT `fk_surat_keterangan_mati_lingkungan`
    FOREIGN KEY (`id_lingkungan`)
    REFERENCES `sigrejak`.`Lingkungan` (`id`),
  CONSTRAINT `fk_surat_keterangan_mati_umat`
    FOREIGN KEY (`id_umat`)
    REFERENCES `sigrejak`.`Umat` (`id`),
  CONSTRAINT `fk_surat_keterangan_mati_imam`
    FOREIGN KEY (`id_imam_pemberkat`)
    REFERENCES `sigrejak`.`Admin` (`id`),
  CONSTRAINT `fk_surat_keterangan_mati_sekretariat`
    FOREIGN KEY (`id_sekretariat`)
    REFERENCES `sigrejak`.`Admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Chat` (
  `id` VARCHAR(36) NOT NULL,
  `id_surat` VARCHAR(36) NOT NULL,
  `pengirim` TINYINT NOT NULL, -- 0 = ketua lingkungan; 1 = keluarga
  `teks` TEXT NOT NULL,
  `waktu_kirim` DATETIME NOT NULL,
  `read` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `sigrejak`.`Log_Surat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigrejak`.`Log_Surat` (
  `id` VARCHAR(36) NOT NULL,
  `id_surat` VARCHAR(36) NOT NULL,
  `role_pelaku` VARCHAR(255) NOT NULL,
  `kejadian` VARCHAR(255) NOT NULL,
  `waktu` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
