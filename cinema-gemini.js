
// cinema-gemini.js - GEMINI ONLY - No Groq
// Model: gemini-2.5-flash - Free tier
// Key stored ONLY in browser localStorage, never in GitHub / Cloudflare

function getGeminiKey(){
  return localStorage.getItem('cinema_gemini_key') || '';
}
function saveGeminiKey(key){
  localStorage.setItem('cinema_gemini_key', key.trim());
}
function hasGeminiKey(){
  return getGeminiKey().length > 10;
}

async function callGemini(prompt, systemPrompt){
  let key = getGeminiKey();
  if(!key){ alert('No Gemini Key yet. Paste your key in the GREEN box at top, then Save.'); return null; }
  try{
    let fullPrompt = (systemPrompt || 'You are a professional Zambian movie writer for Cinema. Keep characters consistent: Themba 16, short fade, white school shirt, blue trousers, Lusaka accent. Mama 42, braids, Chitenge. Coach Chanda 55, glasses, brown jacket. Locations: Lusaka Market, School, Zed Gambit Cup Hall. Props: Wooden Chess Board, Gold Trophy.') + '\n\nUser: ' + prompt;
    let res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + key, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ contents: [{parts: [{text: fullPrompt}]}] })
    });
    let data = await res.json();
    if(data.error){ alert('Gemini Error: ' + data.error.message); console.log(data.error); return null; }
    return data.candidates[0].content.parts[0].text;
  }catch(e){ alert('Gemini Connection Error: ' + e.message); return null; }
}

// MAIN AI - Now Gemini Only, so old pages still work
async function callAI(prompt, systemPrompt){
  let r = await callGemini(prompt, systemPrompt);
  if(r) return {text: r, source: 'Gemini'};
  return null;
}

async function aiScreenplay(prompt){
  let res = await callAI('Create a screenplay with 5 scenes for this movie idea: ' + prompt + '. For each scene give: Title, Shot Type (Wide / Close-Up / Montage), Location, Action, Dialogue. Keep Themba same face, age, clothes, voice in every scene.', 'You are a screenplay writer. Return clear numbered scenes.');
  return res;
}

// Show Gemini box only - No Groq box
window.addEventListener('load', () => {
  if(document.getElementById('geminiKeyBox')) return;
  let box = document.createElement('div');
  box.id = 'geminiKeyBox';
  box.style.cssText = 'background:#0a2a1a;border:1px solid #00d26a;border-radius:12px;padding:14px;margin:12px 0';
  box.innerHTML = `
    <b>✨ GEMINI AI - Free - Your Only AI</b><br>
    <span style="font-size:12px;color:#aaa">Status: <span id="geminiStatus">${hasGeminiKey() ? '✅ Connected - Key Saved' : '❌ No Key Yet - Get free key from aistudio.google.com'}</span></span><br>
    <input id="geminiKeyInput" type="password" placeholder="Paste Gemini Key here - AIza..." value="${getGeminiKey()}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #333;background:#222;color:#fff;margin:8px 0;box-sizing:border-box">
    <button onclick="saveGeminiKey(document.getElementById('geminiKeyInput').value); document.getElementById('geminiStatus').innerText='✅ Connected - Key Saved'; alert('Gemini Key Saved - In your phone only')" style="background:#00d26a;color:#000;padding:10px 14px;border-radius:20px;border:none;font-weight:900">💾 Save Gemini Key</button>
    <button onclick="window.open('https://aistudio.google.com/app/apikey','_blank')" style="background:#222;color:#fff;padding:10px 14px;border-radius:20px;border:1px solid #444;margin-left:6px">🔑 Get Free Gemini Key</button>
  `;
  document.body.insertBefore(box, document.body.children[1] || null);
});


Step 3 - Delete and Paste NEW screenplay.html - Gemini Only

html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cinema - 2 Screenplay</title>
<style>
body{background:#0a0a0a;color:#fff;font-family:Arial;padding:16px;margin:0}
.card{background:#1a1a1a;border-radius:12px;padding:16px;margin:12px 0}
.btn{display:block;background:#ffcc00;color:#000;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:900;margin-top:10px;border:none;width:100%;cursor:pointer}
.btn-gray{display:block;background:#222;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;margin-top:10px}
textarea{width:100%;padding:12px;border-radius:8px;border:1px solid #333;background:#222;color:#fff;margin:6px 0;box-sizing:border-box}
.scene{background:#222;border-radius:10px;padding:12px;margin:8px 0;white-space:pre-wrap}
.small{font-size:12px;color:#aaa}
</style>
</head>
<body>
<h1>2 - SCREENPLAY</h1>
<p class="small">Shots and Scenes from Prompt - Gemini Only - Free</p>
<div class="card">
<textarea id="prompt" rows="3" placeholder="Prompt: Themba in Lusaka Market, morning, finds chess board..."></textarea>
<button class="btn" onclick="generateReal()">🤖 Generate Shots & Scenes - Gemini</button>
<p class="small" id="loading"></p>
<p class="small" id="source"></p>
<div id="list"></div>
<a href="scenes.html" class="btn-gray">Next → 3 - Scenes</a>
<a href="idea.html" class="btn-gray">← Back To 1 - Idea</a>
</div>
<script src="cinema-nav.js"></script>
<script src="cinema-gemini.js"></script>
<script>
async function generateReal(){
  let p = document.getElementById('prompt').value || localStorage.getItem('cinema_idea') || 'Themba in Lusaka';
  document.getElementById('loading').innerText = '🤖 Gemini is writing...';
  let res = await aiScreenplay(p);
  document.getElementById('loading').innerText = '';
  if(res){
    document.getElementById('source').innerText = '✅ Generated by: ' + res.source;
    localStorage.setItem('cinema_screenplay', res.text);
    document.getElementById('list').innerHTML = `<div class="scene">${res.text}</div><button class="btn" onclick="alert('Screenplay Saved')">💾 Save Screenplay</button>`;
  }
}
let saved = localStorage.getItem('cinema_screenplay');
if(saved) document.getElementById('list').innerHTML = `<div class="scene">${saved}</div>`;
</script>
</body>
</html>


