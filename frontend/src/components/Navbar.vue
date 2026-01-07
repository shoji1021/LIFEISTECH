<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">Security Keeper</router-link>
    </div>
    <ul class="nav-links">
      <li><router-link to="/">ホーム</router-link></li>
      <li><router-link to="/about">開発ストーリー</router-link></li>
      <li><router-link to="/guide">使い方</router-link></li>
      <li><router-link to="/app" class="btn-primary">アプリを起動</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  box-sizing: border-box; /* レイアウト崩れ防止 */
}

.logo a {
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
}

.nav-links a:hover {
  color: #42b983;
}

.btn-primary {
  background-color: #42b983;
  color: white !important;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s;
}

.btn-primary:hover {
  background-color: #3aa876;
}
</style>