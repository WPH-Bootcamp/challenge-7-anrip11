import * as fs from 'fs';
import * as path from 'path';

// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)
import { ITodo } from './types';
import { isTodoArray } from './utils';

// Tentukan lokasi file penyimpanan
const DATA_DIR = path.join(__dirname, '../data');
const FILE_PATH = path.join(DATA_DIR, 'todos.json');

export class Storage {
  constructor() {
    this.ensureDirectoryExists();
  }

  /**
   * Memastikan folder 'data' tersedia. Jika belum ada, maka akan dibuat otomatis.
   */
  private ensureDirectoryExists(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    } catch (error) {
      console.error('Gagal membuat direktori data:', error);
    }
  }

  /**
   * Membaca data dari file JSON dan memvalidasinya menggunakan Type Guard.
   */
  readData(): ITodo[] {
    try {
      // Jika file belum ada, langsung kembalikan array kosong
      if (!fs.existsSync(FILE_PATH)) {
        return [];
      }

      const rawData = fs.readFileSync(FILE_PATH, 'utf-8');

      // Antisipasi file kosong agar tidak error saat JSON.parse
      if (!rawData.trim()) return [];

      const parsedData = JSON.parse(rawData);

      // Validasi data menggunakan Type Guard dari utils.ts
      if (isTodoArray(parsedData)) {
        return parsedData;
      } else {
        console.warn(
          'Data korup atau format salah, mereset data ke array kosong.'
        );
        return [];
      }
    } catch (error) {
      console.error('Gagal membaca file storage:', error);
      return [];
    }
  }

  /**
   * Menyimpan array of To-Do ke dalam file JSON.
   */
  writeData(todos: ITodo[]): void {
    try {
      const dataString = JSON.stringify(todos, null, 2); // Format rapi dengan indentasi 2 spasi
      fs.writeFileSync(FILE_PATH, dataString, 'utf-8');
    } catch (error) {
      console.error('Gagal menyimpan data ke file:', error);
    }
  }
}
