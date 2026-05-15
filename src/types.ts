// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item

// TODO: Buat tipe untuk status To-Do (active/done)

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

/**
 * Interface ITodo mendefinisikan struktur data untuk satu item To-Do.
 * Interface ini digunakan sebagai kontrak di seluruh aplikasi.
 */
export interface ITodo {
  id: number; // ID angka urutan
  task: string; // Deskripsi pekerjaan
  completed: boolean; // Status penyelesaian
}

/**
 * Anda juga bisa menambahkan tipe tambahan jika nanti ingin
 * mengembangkan fitur kategori atau prioritas.
 */
// export type Priority = 'low' | 'medium' | 'high';
