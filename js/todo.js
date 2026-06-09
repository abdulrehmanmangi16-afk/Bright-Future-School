// =============================
// TODO APP WITH LOCAL STORAGE
// =============================

class TodoApp {
  constructor() {
    this.tasks = [];
    this.currentFilter = 'all';
    this.currentSort = 'newest';
    this.init();
  }

  init() {
    this.loadFromLocalStorage();
    this.attachEventListeners();
    this.render();
    this.updateStats();
  }

  attachEventListeners() {
    // Add task
    document.getElementById('addBtn').addEventListener('click', () => this.addTask());
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask();
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter || e.target.closest('button').dataset.filter));
    });

    // Sort select
    document.getElementById('sortSelect').addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.render();
    });

    // Action buttons
    document.getElementById('exportBtn').addEventListener('click', () => this.exportTasks());
    document.getElementById('clearBtn').addEventListener('click', () => this.clearCompleted());
    document.getElementById('deleteAllBtn').addEventListener('click', () => this.deleteAll());
  }

  addTask() {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('prioritySelect').value;
    const text = input.value.trim();

    if (text === '') {
      this.showToast('Please enter a task', 'error');
      return;
    }

    const task = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString(),
      dueDate: null
    };

    this.tasks.unshift(task);
    this.saveToLocalStorage();
    this.render();
    this.updateStats();
    input.value = '';
    this.showToast('Task added successfully!', 'success');
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToLocalStorage();
    this.render();
    this.updateStats();
    this.showToast('Task deleted', 'success');
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveToLocalStorage();
      this.render();
      this.updateStats();
    }
  }

  editTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt('Edit task:', task.text);
    if (newText && newText.trim() !== '') {
      task.text = newText.trim();
      this.saveToLocalStorage();
      this.render();
      this.showToast('Task updated', 'success');
    }
  }

  setFilter(filter) {
    this.currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === filter) btn.classList.add('active');
    });
    this.render();
  }

  getFilteredTasks() {
    let filtered = this.tasks;

    // Apply filter
    switch (this.currentFilter) {
      case 'pending':
        filtered = filtered.filter(t => !t.completed);
        break;
      case 'completed':
        filtered = filtered.filter(t => t.completed);
        break;
      case 'high':
        filtered = filtered.filter(t => t.priority === 'high');
        break;
      case 'today':
        const today = new Date().toDateString();
        filtered = filtered.filter(t => new Date(t.createdAt).toDateString() === today);
        break;
    }

    // Apply sort
    switch (this.currentSort) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }

  render() {
    const tasksList = document.getElementById('tasksList');
    const filtered = this.getFilteredTasks();

    if (filtered.length === 0) {
      tasksList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-inbox"></i>
          <p>No tasks match your filters</p>
        </div>
      `;
      return;
    }

    tasksList.innerHTML = filtered.map(task => `
      <div class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority}">
        <div class="task-checkbox">
          <input 
            type="checkbox" 
            ${task.completed ? 'checked' : ''}
            onchange="app.toggleTask(${task.id})"
          >
        </div>
        <div class="task-content">
          <div class="task-text">${this.escapeHtml(task.text)}</div>
          <div class="task-meta">
            <span class="task-priority priority-badge-${task.priority}">${task.priority}</span>
            <span class="task-date">${new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="action-icon edit-btn" onclick="app.editTask(${task.id})" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-icon delete-btn" onclick="app.deleteTask(${task.id})" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = this.tasks.filter(t => t.priority === 'high').length;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('highPriorityTasks').textContent = highPriority;
  }

  clearCompleted() {
    if (confirm('Clear all completed tasks?')) {
      this.tasks = this.tasks.filter(t => !t.completed);
      this.saveToLocalStorage();
      this.render();
      this.updateStats();
      this.showToast('Completed tasks cleared', 'success');
    }
  }

  deleteAll() {
    if (confirm('Delete ALL tasks? This cannot be undone.')) {
      this.tasks = [];
      this.saveToLocalStorage();
      this.render();
      this.updateStats();
      this.showToast('All tasks deleted', 'success');
    }
  }

  exportTasks() {
    const data = JSON.stringify(this.tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    this.showToast('Tasks exported successfully!', 'success');
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadFromLocalStorage() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        this.tasks = JSON.parse(stored);
      } catch (e) {
        console.error('Error loading tasks:', e);
        this.tasks = [];
      }
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : ''}
      ${type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : ''}
      ${message}
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new TodoApp();
});