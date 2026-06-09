// =============================
// JOKE GENERATOR WITH API
// =============================

class JokeGenerator {
  constructor() {
    this.currentJoke = null;
    this.favorites = [];
    this.history = [];
    this.stats = {
      totalGenerated: 0,
      categoryCount: {}
    };
    this.sessionStartTime = Date.now();
    this.selectedCategory = 'any';
    this.init();
  }

  async init() {
    this.loadFromLocalStorage();
    this.attachEventListeners();
    this.updateUI();
    this.startSessionTimer();
  }

  attachEventListeners() {
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.selectCategory(e.target));
    });

    // Action buttons
    document.getElementById('nextBtn').addEventListener('click', () => this.fetchJoke());
    document.getElementById('copyBtn').addEventListener('click', () => this.copyJoke());
    document.getElementById('shareBtn').addEventListener('click', () => this.shareJoke());
    document.getElementById('favoriteBtn').addEventListener('click', () => this.toggleFavorite());
    document.getElementById('clearFavoritesBtn').addEventListener('click', () => this.clearFavorites());
    document.getElementById('clearHistoryBtn').addEventListener('click', () => this.clearHistory());

    // Load initial joke
    this.fetchJoke();
  }

  selectCategory(btn) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.selectedCategory = btn.dataset.category;
    this.fetchJoke();
  }

  async fetchJoke() {
    const loading = document.getElementById('loading');
    const jokeContent = document.getElementById('jokeContent');

    loading.style.display = 'flex';
    jokeContent.style.display = 'none';

    try {
      let url = 'https://official-joke-api.appspot.com/jokes';

      if (this.selectedCategory === 'any') {
        url += '/random';
      } else if (this.selectedCategory === 'knock-knock') {
        url += '/knock-knock/random';
      } else {
        url += `/${this.selectedCategory}/random`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch joke');

      const data = await response.json();
      this.currentJoke = {
        ...data,
        fetched_at: new Date().toISOString()
      };

      // Update stats
      this.stats.totalGenerated++;
      this.stats.categoryCount[this.selectedCategory] = (this.stats.categoryCount[this.selectedCategory] || 0) + 1;
      this.addToHistory(this.currentJoke);
      this.saveToLocalStorage();

      this.displayJoke();
      this.updateUI();
    } catch (error) {
      console.error('Error fetching joke:', error);
      this.showToast('Failed to load joke. Please try again.', 'error');
      jokeContent.innerHTML = '<p>Error loading joke. Please try again.</p>';
      jokeContent.style.display = 'block';
    } finally {
      loading.style.display = 'none';
    }
  }

  displayJoke() {
    const jokeType = document.getElementById('jokeType');
    const jokeText = document.getElementById('jokeText');
    const jokeSetup = document.getElementById('jokeSetup');
    const jokeDelivery = document.getElementById('jokeDelivery');
    const jokeContent = document.getElementById('jokeContent');

    if (!this.currentJoke) return;

    // Display joke type
    jokeType.innerHTML = `<span class="badge">${this.currentJoke.type}</span>`;

    // Check if it's a setup/delivery joke or single joke
    if (this.currentJoke.setup && this.currentJoke.delivery) {
      jokeText.style.display = 'none';
      jokeSetup.style.display = 'block';
      jokeDelivery.style.display = 'block';
      jokeSetup.innerHTML = `<p>${this.escapeHtml(this.currentJoke.setup)}</p>`;
      jokeDelivery.innerHTML = `<p class="delivery">👉 ${this.escapeHtml(this.currentJoke.delivery)}</p>`;
    } else {
      jokeText.style.display = 'block';
      jokeSetup.style.display = 'none';
      jokeDelivery.style.display = 'none';
      jokeText.innerHTML = `<p>${this.escapeHtml(this.currentJoke.joke)}</p>`;
    }

    jokeContent.style.display = 'block';
  }

  copyJoke() {
    if (!this.currentJoke) return;

    let jokeText = '';
    if (this.currentJoke.setup && this.currentJoke.delivery) {
      jokeText = `${this.currentJoke.setup}\n\n${this.currentJoke.delivery}`;
    } else {
      jokeText = this.currentJoke.joke;
    }

    navigator.clipboard.writeText(jokeText).then(() => {
      this.showToast('Joke copied to clipboard!', 'success');
    }).catch(err => {
      console.error('Failed to copy:', err);
      this.showToast('Failed to copy', 'error');
    });
  }

  shareJoke() {
    if (!this.currentJoke) return;

    let jokeText = '';
    if (this.currentJoke.setup && this.currentJoke.delivery) {
      jokeText = `${this.currentJoke.setup} ${this.currentJoke.delivery}`;
    } else {
      jokeText = this.currentJoke.joke;
    }

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeText + ' 😂')}%20%23JokeGenerator`;
    window.open(shareUrl, '_blank');
    this.showToast('Opening Twitter...', 'info');
  }

  toggleFavorite() {
    if (!this.currentJoke) return;

    const isFavorited = this.favorites.some(j => j.id === this.currentJoke.id);

    if (isFavorited) {
      this.favorites = this.favorites.filter(j => j.id !== this.currentJoke.id);
      this.showToast('Removed from favorites', 'info');
    } else {
      this.favorites.push(this.currentJoke);
      this.showToast('Added to favorites!', 'success');
    }

    this.saveToLocalStorage();
    this.updateUI();
  }

  addToHistory(joke) {
    this.history.unshift(joke);
    if (this.history.length > 20) {
      this.history.pop();
    }
  }

  clearFavorites() {
    if (confirm('Clear all favorite jokes?')) {
      this.favorites = [];
      this.saveToLocalStorage();
      this.updateUI();
      this.showToast('Favorites cleared', 'success');
    }
  }

  clearHistory() {
    if (confirm('Clear joke history?')) {
      this.history = [];
      this.saveToLocalStorage();
      this.updateUI();
      this.showToast('History cleared', 'success');
    }
  }

  updateUI() {
    this.updateFavorites();
    this.updateHistory();
    this.updateStats();
  }

  updateFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const count = this.favorites.length;
    document.getElementById('favoriteCount').textContent = count;

    if (this.currentJoke) {
      const isFavorited = this.favorites.some(j => j.id === this.currentJoke.id);
      favoriteBtn.classList.toggle('active', isFavorited);
    }

    if (this.favorites.length === 0) {
      favoritesList.innerHTML = '<div class="empty-message"><p>No favorite jokes yet. Add some!</p></div>';
      return;
    }

    favoritesList.innerHTML = this.favorites.map(joke => `
      <div class="favorite-item">
        <div class="joke-text">${this.escapeHtml(joke.joke || joke.setup)}</div>
        <div class="joke-type">${joke.type}</div>
        <button class="remove-btn" onclick="app.removeFavorite(${joke.id})" title="Remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
  }

  updateHistory() {
    const historyList = document.getElementById('historyList');

    if (this.history.length === 0) {
      historyList.innerHTML = '<div class="empty-message"><p>No recent jokes. Start generating!</p></div>';
      return;
    }

    historyList.innerHTML = this.history.slice(0, 10).map(joke => `
      <div class="history-item">
        <div class="joke-text">${this.escapeHtml(joke.joke || joke.setup)}</div>
        <div class="joke-meta">
          <span class="joke-type">${joke.type}</span>
          <span class="joke-time">${new Date(joke.fetched_at).toLocaleDateString()}</span>
        </div>
      </div>
    `).join('');
  }

  updateStats() {
    document.getElementById('totalGenerated').textContent = this.stats.totalGenerated;
    document.getElementById('totalFavorites').textContent = this.favorites.length;

    // Find most used category
    let mostUsed = '-';
    let maxCount = 0;
    for (const [category, count] of Object.entries(this.stats.categoryCount)) {
      if (count > maxCount) {
        maxCount = count;
        mostUsed = category;
      }
    }
    document.getElementById('mostUsedCategory').textContent = mostUsed;

    // Session time
    const elapsedSeconds = Math.floor((Date.now() - this.sessionStartTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    document.getElementById('sessionTime').textContent = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  }

  startSessionTimer() {
    setInterval(() => this.updateStats(), 1000);
  }

  removeFavorite(id) {
    this.favorites = this.favorites.filter(j => j.id !== id);
    this.saveToLocalStorage();
    this.updateUI();
    this.showToast('Removed from favorites', 'info');
  }

  saveToLocalStorage() {
    localStorage.setItem('jokes_favorites', JSON.stringify(this.favorites));
    localStorage.setItem('jokes_history', JSON.stringify(this.history));
    localStorage.setItem('jokes_stats', JSON.stringify(this.stats));
  }

  loadFromLocalStorage() {
    const favorites = localStorage.getItem('jokes_favorites');
    const history = localStorage.getItem('jokes_history');
    const stats = localStorage.getItem('jokes_stats');

    if (favorites) this.favorites = JSON.parse(favorites);
    if (history) this.history = JSON.parse(history);
    if (stats) this.stats = JSON.parse(stats);
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast-${type} show`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new JokeGenerator();
});