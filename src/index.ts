// TODO: Import readline untuk membaca input dari command line

// TODO: Import fungsi-fungsi dari todoService

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

import * as readline from 'readline';
import { TodoService } from './todoService';
import { clearScreen } from './utils';

const todoService = new TodoService();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const formatDisplay = (todos: any[]): void => {
  if (todos.length === 0) {
    console.log('No tasks found!');
  } else {
    todos.forEach((todo, index) => {
      const statusLabel = todo.completed ? '[DONE]   ' : '[ACTIVE] ';
      // User akan melihat angka mulai dari 1, 2, 3...
      console.log(`${statusLabel} ${index + 1}. ${todo.task}`);
    });
  }
  console.log('--------------------\n');
};

const showTodoList = (): void => {
  console.log('\n--- LIST OF ALL TO-DO ---');
  const todos = todoService.listTodos();
  formatDisplay(todos);
};

const displayMenu = (): void => {
  console.log('=== TODO APP TYPESCRIPT ===');
  console.log('1. Add new todo');
  console.log('2. Mark todo as complete');
  console.log('3. Delete todo');
  console.log('4. List all todos');
  console.log('5. Search todos');
  console.log('6. Exit');
  console.log('===========================');
};

const mainMenu = async (): Promise<void> => {
  let running = true;

  while (running) {
    displayMenu();
    const choice = await askQuestion('Select the menu (1-6): ');

    switch (choice) {
      case '1':
        const taskName = await askQuestion('Add new to-do: ');
        if (taskName.trim()) {
          todoService.addTodo(taskName);
          clearScreen();
          console.log('✅ The to-do item was successfully added!');
          showTodoList();
        } else {
          console.log('❌ The to-do field cannot be left blank!');
        }
        break;

      case '2':
        clearScreen();
        showTodoList();
        const idToToggle = await askQuestion(
          'Enter the number to change status: '
        );

        const toggleIdx = parseInt(idToToggle) - 1;

        if (!isNaN(toggleIdx) && todoService.toggleComplete(toggleIdx)) {
          clearScreen();
          console.log('✅ Status successfully updated!');
          showTodoList();
        } else {
          console.log('❌ Invalid number!');
        }
        break;

      case '3':
        clearScreen();
        showTodoList();
        const idToDelete = await askQuestion('Enter the number to delete: ');
        // REVISI: Kurangi 1 agar sinkron dengan index array internal (0-based)
        const deleteIdx = parseInt(idToDelete) - 1;

        if (!isNaN(deleteIdx) && todoService.deleteTodo(deleteIdx)) {
          clearScreen();
          console.log('🗑️ The to-do item was successfully deleted!');
          showTodoList();
        } else {
          console.log('❌ Invalid number!');
        }
        break;

      case '4':
        clearScreen();
        showTodoList();
        break;

      case '5':
        const keyword = await askQuestion('Enter a search keyword: ');
        clearScreen();
        console.log(`\n--- SEARCH RESULTS: "${keyword}" ---`);
        const results = todoService
          .listTodos()
          .filter((t) => t.task.toLowerCase().includes(keyword.toLowerCase()));
        formatDisplay(results);
        break;

      case '6':
        console.log('Exit the app... See you later!');
        running = false;
        rl.close();
        break;

      default:
        clearScreen();
        console.log('❌ Invalid selection (1–6).');
        break;
    }
  }
};

clearScreen();
mainMenu();
