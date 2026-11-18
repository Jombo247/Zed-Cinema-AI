
// cinema-groq.js - FULL FILE - FREE GROQ AI API
// Model: llama-3.3-70b-versatile - Free tier
// Key is stored ONLY in your browser localStorage, never in GitHub

function getGroqKey(){
  return localStorage.getItem('cinema_groq_key') || '';
}
function saveGroqKey(key){
  localStorage.setItem('cinema_groq_key', key.trim());
}
function hasGroqKey(){
  return getGroqKey().length > 10;
}

async function callGroq(prompt, systemPrompt){
  let key = getGroqKey();
  if(!key){
    alert('No Groq Key yet. Tap "Set Groq Key" below, paste your key from console.groq.com, then try again.');
    return null;
  }
  try{
    let res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {role: 'system', content: systemPrompt || 'You are a professional Zambian movie writer for Cinema. Keep characters consistent: Themba 16, short fade, white school shirt, blue trousers, Lusaka accent. Mama 42, braids, Chitenge. Coach Chanda 55, glasses, brown jacket. Locations: Lusaka Market, School, Zed Gambit Cup Hall. Props: Wooden Chess Board, Gold Trophy.'},
          {role: 'user', content: prompt}
        ],
        temperature: 0.7
      })
    });
    let data = await res.json();
    if(data.error){
      alert('Groq Error: ' + data.error.message);
      return null;
    }
    return data.choices[0].message.content;
  }catch(e){
    alert('Groq Connection Error: ' + e.message + ' - Check internet.');
    return null;
  }
}

// Helpers for each stage
async function groqScreenplay(prompt){
  return await callGroq(
    'Create a screenplay with 5 scenes for this movie idea: ' + prompt + '. For each scene give: Title, Shot Type (Wide / Close-Up / Montage), Location, Action, Dialogue. Keep Themba same face, age, clothes, voice in every scene.',
    'You are a screenplay writer. Return clear numbered scenes.'
  );
}
async function groqCaptions(sceneText){
  return await callGroq('Write short subtitles / captions for this scene, 1 line per 3 seconds: ' + sceneText);
}
async function groqScriptToScene(prompt){
  return await callGroq('Turn this prompt into 1 full scene: Shot, Action, Dialogue, Camera. Use SAME character lock for Themba, Mama, Coach: ' + prompt);
}

// Show key box on every page that loads this file
window.addEventListener('load', () => {
  if(document.getElementById('groqKeyBox')) return;
  let box = document.createElement('div');
  box.id = 'groqKeyBox';
  box.style.cssText = 'background:#1a1a2e;border:1px solid #4a4aff;border-radius:12px;padding:14px;margin:12px 0';
  box.innerHTML = `
    <b>🤖 GROQ AI - Free</b><br>
    <span style="font-size:12px;color:#aaa">Status: <span id="groqStatus">${hasGroqKey() ? '✅ Connected - Key Saved' : '❌ No Key Yet - Get free key from console.groq.com'}</span></span><br>
    <input id="groqKeyInput" type="password" placeholder="Paste Groq Key here - gsk_..." value="${getGroqKey()}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #333;background:#222;color:#fff;margin:8px 0;box-sizing:border-box">
    <button onclick="saveGroqKey(document.getElementById('groqKeyInput').value); document.getElementById('groqStatus').innerText='✅ Connected - Key Saved'; alert('Groq Key Saved - In your phone only, not in GitHub')" style="background:#ffcc00;color:#000;padding:10px 14px;border-radius:20px;border:none;font-weight:900">💾 Save Groq Key</button>
    <button onclick="window.open('https://console.groq.com/keys','_blank')" style="background:#222;color:#fff;padding:10px 14px;border-radius:20px;border:1px solid #444;margin-left:6px">🔑 Get Free Key</button>
    <p style="font-size:11px;color:#aaa;margin:6px 0 0">How: Open console.groq.com > API Keys > Create > Copy > Paste here. Never share your key, never put it in GitHub.</p>
  `;
  document.body.insertBefore(box, document.body.children[1] || null);
});


Step 2 - Delete and Paste NEW screenplay.html - Stage 2 - Now Real Groq

In GitHub: Open screenplay.html > Pencil > Select All - Delete > Paste > Commit

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
<p class="small">Shots and Scenes from Prompt - Powered by Groq AI - Free</p>
<div class="card">
<textarea id="prompt" rows="3" placeholder="Prompt: Themba in Lusaka Market, morning, finds chess board..."></textarea>
<button class="btn" onclick="generateReal()">🤖 Generate Shots & Scenes From Prompt - Groq AI</button>
<p class="small" id="loading"></p>
<div id="list"></div>
<a href="scenes.html" class="btn-gray">Next → 3 - Scenes</a>
<a href="idea.html" class="btn-gray">← Back To 1 - Idea</a>
</div>
<script src="cinema-nav.js"></script>
<script src="cinema-groq.js"></script>
<script>
async function generateReal(){
  let p = document.getElementById('prompt').value || localStorage.getItem('cinema_idea') || 'Themba in Lusaka';
  document.getElementById('loading').innerText = '🤖 Groq is writing... Please wait...';
  let result = await groqScreenplay(p);
  document.getElementById('loading').innerText = '';
  if(result){
    localStorage.setItem('cinema_screenplay', result);
    document.getElementById('list').innerHTML = `<div class="scene">${result}</div><button class="btn" onclick="alert('Screenplay Saved')">💾 Save Screenplay</button>`;
  }
}
let saved = localStorage.getItem('cinema_screenplay');
if(saved) document.getElementById('list').innerHTML = `<div class="scene">${saved}</div>`;
</script>
</body>
</html>


