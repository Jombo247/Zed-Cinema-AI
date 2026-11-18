
// cinema-gemini.js - FULL FILE - FREE GOOGLE GEMINI AI
// Model: gemini-2.5-flash - Free tier, best for long screenplay
// Key stored ONLY in browser localStorage, never in GitHub

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
  if(!key) return null;
  try{
    let fullPrompt = (systemPrompt || 'You are a professional Zambian movie writer for Cinema. Keep characters consistent: Themba 16, short fade, white school shirt, blue trousers, Lusaka accent. Mama 42, braids, Chitenge. Coach Chanda 55, glasses, brown jacket. Locations: Lusaka Market, School, Zed Gambit Cup Hall. Props: Wooden Chess Board, Gold Trophy.') + '\n\nUser: ' + prompt;
    let res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + key, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        contents: [{parts: [{text: fullPrompt}]}]
      })
    });
    let data = await res.json();
    if(data.error){
      console.log('Gemini Error:', data.error.message);
      return null;
    }
    return data.candidates[0].content.parts[0].text;
  }catch(e){
    console.log('Gemini Connection Error:', e.message);
    return null;
  }
}

// SMART FALLBACK - Try Groq first, then Gemini
async function callAI(prompt, systemPrompt){
  // 1. Try Groq
  if(typeof callGroq === 'function' && getGroqKey()){
    let r = await callGroq(prompt, systemPrompt);
    if(r) return {text: r, source: 'Groq'};
  }
  // 2. Try Gemini
  if(hasGeminiKey()){
    let r2 = await callGemini(prompt, systemPrompt);
    if(r2) return {text: r2, source: 'Gemini'};
  }
  // 3. No key
  alert('No AI Key yet. Save Groq Key OR Gemini Key in the boxes at top, then try again.');
  return null;
}

async function aiScreenplay(prompt){
  let res = await callAI('Create a screenplay with 5 scenes for this movie idea: ' + prompt + '. For each scene give: Title, Shot Type (Wide / Close-Up / Montage), Location, Action, Dialogue. Keep Themba same face, age, clothes, voice in every scene.', 'You are a screenplay writer. Return clear numbered scenes.');
  return res;
}

// Show Gemini box on every page that loads this file
window.addEventListener('load', () => {
  if(document.getElementById('geminiKeyBox')) return;
  let box = document.createElement('div');
  box.id = 'geminiKeyBox';
  box.style.cssText = 'background:#0a2a1a;border:1px solid #00d26a;border-radius:12px;padding:14px;margin:12px 0';
  box.innerHTML = `
    <b>✨ GEMINI AI - Free - Backup + Long Screenplay</b><br>
    <span style="font-size:12px;color:#aaa">Status: <span id="geminiStatus">${hasGeminiKey() ? '✅ Connected - Key Saved' : '❌ No Key Yet - Get free key from aistudio.google.com'}</span></span><br>
    <span style="font-size:11px;color:#aaa">If Groq hits 1,000 / day, Gemini auto takes over.</span><br>
    <input id="geminiKeyInput" type="password" placeholder="Paste Gemini Key here - AIza..." value="${getGeminiKey()}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #333;background:#222;color:#fff;margin:8px 0;box-sizing:border-box">
    <button onclick="saveGeminiKey(document.getElementById('geminiKeyInput').value); document.getElementById('geminiStatus').innerText='✅ Connected - Key Saved'; alert('Gemini Key Saved - In your phone only, not in GitHub')" style="background:#00d26a;color:#000;padding:10px 14px;border-radius:20px;border:none;font-weight:900">💾 Save Gemini Key</button>
    <button onclick="window.open('https://aistudio.google.com/app/apikey','_blank')" style="background:#222;color:#fff;padding:10px 14px;border-radius:20px;border:1px solid #444;margin-left:6px">🔑 Get Free Gemini Key</button>
    <p style="font-size:11px;color:#aaa;margin:6px 0 0">How: Open aistudio.google.com > Get API Key > Create > Copy > Paste here. Never share your key, never put it in GitHub.</p>
  `;
  document.body.insertBefore(box, document.body.children[2] || null);
});


