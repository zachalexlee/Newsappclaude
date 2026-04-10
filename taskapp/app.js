(() => {
  const STORAGE_KEY = 'taskapp.tasks.v1';

  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  const count = document.getElementById('task-count');
  const clearBtn = document.getElementById('clear-completed');
  const filtersEl = document.getElementById('filters');

  let tasks = loadTasks();
  let filter = 'all';

  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function uid() {
    if (crypto && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    tasks.unshift({
      id: uid(),
      text: trimmed,
      done: false,
      createdAt: Date.now(),
    });
    saveTasks();
    render();
  }

  function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    task.done = !task.done;
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter((t) => !t.done);
    saveTasks();
    render();
  }

  function getVisibleTasks() {
    if (filter === 'active') return tasks.filter((t) => !t.done);
    if (filter === 'completed') return tasks.filter((t) => t.done);
    return tasks;
  }

  function render() {
    const visible = getVisibleTasks();
    list.innerHTML = '';

    if (visible.length === 0) {
      const li = document.createElement('li');
      li.className = 'taskapp__empty';
      li.textContent =
        tasks.length === 0 ? 'No tasks yet. Add one above.' : 'Nothing here.';
      list.appendChild(li);
    } else {
      for (const task of visible) {
        list.appendChild(renderItem(task));
      }
    }

    const remaining = tasks.filter((t) => !t.done).length;
    count.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} remaining`;
    clearBtn.hidden = !tasks.some((t) => t.done);
  }

  function renderItem(task) {
    const li = document.createElement('li');
    li.className = 'taskapp__item' + (task.done ? ' taskapp__item--done' : '');

    const label = document.createElement('label');
    label.className = 'taskapp__label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'taskapp__text';
    span.textContent = task.text;

    label.appendChild(checkbox);
    label.appendChild(span);

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'taskapp__delete';
    del.setAttribute('aria-label', `Delete task: ${task.text}`);
    del.textContent = '\u00d7';
    del.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(label);
    li.appendChild(del);
    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(input.value);
    input.value = '';
    input.focus();
  });

  clearBtn.addEventListener('click', clearCompleted);

  filtersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    filter = btn.dataset.filter;
    for (const el of filtersEl.querySelectorAll('.taskapp__filter')) {
      el.classList.toggle('taskapp__filter--active', el === btn);
    }
    render();
  });

  render();
})();
