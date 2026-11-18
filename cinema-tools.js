-nav.js - FULL FILE - Delete old, paste this
// EVERY PAGE HAS ALL BUTTONS

window.addEventListener('load', () => {
  let bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#111;border-bottom:2px solid #ffcc00;z-index:9999;padding:10px 8px';
  bar.innerHTML = `
    <div style="display:flex;justify-content:space-around;margin-bottom:8px">
      <a href="index.html" style="color:#fff;text-decoration:none;text-align:center;font-size:12px">🏠<br>Home</a>
      <a href="studio.html" style="color:#fff;text-decoration:none;text-align:center;font-size:12px">🎬<br>Studio</a>
      <a href="editor.html" style="color:#ffcc00;text-decoration:none;text-align:center;font-size:12px">✂️<br>Edit</a>
      <a href="profile.html" style="color:#fff;text-decoration:none;text-align:center;font-size:12px">👤<br>Profile</a>
      <a href="#" onclick="history.back();return false;" style="color:#fff;text-decoration:none;text-align:center;font-size:12px">←<br>Back</a>
    </div>
    <div style="display:flex;gap:6px;overflow-x:auto;white-space:nowrap;padding-bottom:4px">
      <a href="studio.html" style="background:#222;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">💡 Idea</a>
      <a href="studio.html" style="background:#d32f2f;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">💾 Save Movie To Cloud</a>
      <a href="studio.html" style="background:#222;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">📖 Character Bible</a>
      <a href="editor.html" style="background:#222;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">✂️ Split</a>
      <a href="editor.html" style="background:#222;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">🔤 Add Text</a>
      <a href="editor.html" style="background:#222;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">⬛ B&W</a>
      <a href="editor.html" style="background:#222;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">🎞️ Vintage</a>
      <a href="editor.html" style="background:#222;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">💬 Subtitles</a>
      <a href="editor.html" style="background:#ffcc00;color:#000;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px;font-weight:900">🎬 Export</a>
      <a href="admin.html" style="background:#222;color:#fff;padding:8px 12px;border-radius:20px;text-decoration:none;font-size:12px">⚙️ Admin</a>
    </div>
  `;
  document.body.prepend(bar);
  document.body.style.paddingTop = '110px';
  document.body.style.paddingBottom = '20px';
});


