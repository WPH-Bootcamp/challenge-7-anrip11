// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

// TODO: Import fungsi storage untuk baca/tulis file

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword

import { ITodo } from './types';
import { Storage } from './storage';
import { generateId } from './utils';

export class TodoService {
  private storage: Storage;
  private todos: ITodo[];

  constructor() {
    this.storage = new Storage();
    // Memuat data saat service pertama kali dijalankan
    this.todos = this.storage.readData();
  }

  /**
   * Menambahkan tugas baru dan langsung menyimpannya ke storage.
   */
  addTodo(task: string): void {
    const newTodo: ITodo = {
      // ID otomatis mengikuti urutan angka
      id: this.todos.length,
      task,
      completed: false,
    };
    this.todos.push(newTodo);
    this.save();
  }

  // Gunakan perbandingan angka untuk mencari data
  toggleComplete(id: number): boolean {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      return true;
    }
    return false;
  }

  deleteTodo(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((t) => t.id !== id);

    // Opsional: Re-indexing agar ID tetap urut 0, 1, 2 setelah dihapus
    this.todos = this.todos.map((todo, index) => ({ ...todo, id: index }));

    if (this.todos.length !== initialLength) {
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Mengambil semua daftar To-Do.
   */
  listTodos(): ITodo[] {
    return this.todos;
  }

  /**
   * Method internal untuk menyinkronkan data array ke file JSON.
   */
  private save(): void {
    this.storage.writeData(this.todos);
  }
}
