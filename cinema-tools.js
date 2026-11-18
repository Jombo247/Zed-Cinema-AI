
// cinema-nav.js - FULL FILE - Delete old, paste this
// Home -> Home, Studio -> Studio, Edit -> Edit/Projects, Profile -> Profile, Back -> Back

window.addEventListener('load', () => {
  let nav = document.createElement('div');
  nav.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#111;border-top:2px solid #ffcc00;display:flex;justify-content:space-around;padding:14px 0 18px;z-index:9999';
  nav.innerHTML = `
    <a href="index.html" style="color:#fff;text-decoration:none;text-align:center;font-size:12px">🏠<br>Home</a>
    <a href="studio.html" style="color:#fff;text-decoration:none;text-align:center;font-size:12px">🎬<br>Studio</a>
    <a href="editor.html" style="color:#ffcc00;text-decoration:none;text-align:center;font-size:12px">✂️<br>Edit</a>
    <a href="profile.html" style="color:#fff;text-decoration:none;text-align:center;font-size:12px">👤<br>Profile</a>
    <a href="#" onclick="history.back();return false;" style="color:#fff;text-decoration:none;text-align:center;font-size:12px">←<br>Back</a>
  `;
  document.body.appendChild(nav);
  document.body.style.paddingBottom = '90px';
});


