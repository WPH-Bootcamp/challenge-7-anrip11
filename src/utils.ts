// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid

import { ITodo } from './types';

/**
 * Type Guard untuk memeriksa apakah sebuah objek memenuhi interface ITodo.
 * Ini memastikan properti 'id', 'task', dan 'completed' ada dan bertipe benar.
 */
export const isTodo = (obj: any): obj is ITodo => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.task === 'string' &&
    typeof obj.completed === 'boolean'
  );
};

/**
 * Type Guard untuk memeriksa apakah data yang dibaca dari JSON adalah array of ITodo.
 */
export const isTodoArray = (data: any): data is ITodo[] => {
  return Array.isArray(data) && data.every(isTodo);
};

/**
 * Helper untuk menghasilkan ID unik singkat.
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Helper untuk membersihkan layar terminal (seperti yang Anda gunakan sebelumnya).
 */
export const clearScreen = (): void => {
  process.stdout.write('\x1Bc');
};
