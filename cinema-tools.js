
// cinema-tools.js
// NEW FILE - Handles Undo / Redo / Export ONLY
// This file does NOT delete your editor. It just adds power to it.

let undoStack = [];
let redoStack = [];
let isExporting = false;
let exportRecorder = null;
let exportChunks = [];

// Call this every time you change a slot
function toolsSaveState(slots, subtitles) {
  undoStack.push(JSON.stringify({ slots: slots.map(s => s ? s.name : null), subtitles: [...subtitles] }));
  if (undoStack.length > 50) undoStack.shift();
  redoStack = []; // new change clears redo
  updateToolsButtons();
  localStorage.setItem('cinema_backup_slots', JSON.stringify(slots.map(s => s ? s.name : null)));
  localStorage.setItem('cinema_backup_subs', JSON.stringify(subtitles));
  console.log('✅ Saved - Undo available:', undoStack.length);
}

function toolsUndo() {
  if (undoStack.length === 0) { alert('Nothing to undo yet'); return null; }
  let last = undoStack.pop();
  redoStack.push(last);
  updateToolsButtons();
  alert('↩️ Undo done. ' + undoStack.length + ' steps left to undo.');
  return JSON.parse(last);
}

function toolsRedo() {
  if (redoStack.length === 0) { alert('Nothing to redo - you are at the latest version'); return null; }
  let next = redoStack.pop();
  undoStack.push(next);
  updateToolsButtons();
  alert('↪️ Redo done.');
  return JSON.parse(next);
}

function toolsClearHistory() {
  if (confirm('Clear all Undo history? Your slots will stay, only history clears.')) {
    undoStack = []; redoStack = [];
    updateToolsButtons();
  }
}

function updateToolsButtons() {
  let u = document.getElementById('toolsUndoBtn');
  let r = document.getElementById('toolsRedoBtn');
  let info = document.getElementById('toolsInfo');
  if (u) u.innerText = '↩️ Undo (' + undoStack.length + ')';
  if (r) r.innerText = '↪️ Redo (' + redoStack.length + ')';
  if (info) info.innerText = 'Saved steps: ' + undoStack.length + ' | Redo steps: ' + redoStack.length + ' | Your work is auto-backed up';
}

// --- EXPORT - Real File, No Delete ---
function toolsStartExport() {
  try {
    let wrap = document.getElementById('previewWrap');
    let video = document.getElementById('video');
    let stream = wrap.captureStream ? wrap.captureStream(30) : video.captureStream(30);
    exportChunks = [];
    exportRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    exportRecorder.ondataavailable = e => { if (e.data.size > 0) exportChunks.push(e.data); };
    exportRecorder.onstop = () => {
      let blob = new Blob(exportChunks, { type: 'video/webm' });
      let url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'zed-gambit-export-' + Date.now() + '.webm';
      a.click();
      document.getElementById('toolsExportStatus').innerText = '✅ Exported! File downloaded. Your editor was NOT changed.';
    };
    exportRecorder.start();
    isExporting = true;
    document.getElementById('toolsExportStatus').innerText = '🔴 RECORDING... Play video now, then tap Stop Export';
    if (video.src) video.play();
  } catch (err) {
    alert('Export needs Chrome / Edge. Use phone screen-record as backup. Error: ' + err.message);
  }
}

function toolsStopExport() {
  if (exportRecorder && isExporting) {
    exportRecorder.stop();
    isExporting = false;
    document.getElementById('toolsExportStatus').innerText = 'Processing download...';
  } else {
    alert('Tap Start Export first');
  }
}

function toolsExportList(slots, subtitles) {
  let text = slots.map((s, i) => 'Slot ' + (i + 1) + ': ' + (s ? s.name : 'EMPTY') + ' | Sub: ' + (subtitles[i] || 'none')).join('\n');
  let blob = new Blob([text], { type: 'text/plain' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url; a.download = 'zed-gambit-project.txt'; a.click();
  alert('Project list downloaded - no files deleted');
}

// Make buttons appear automatically at bottom of page
window.addEventListener('load', () => {
  let div = document.createElement('div');
  div.style.cssText = 'background:#111;padding:14px;border-radius:12px;margin:14px 0;position:sticky;bottom:10px';
  div.innerHTML = `
    <b>🧰 CINEMA TOOLS - New File (Undo / Redo / Export)</b>
    <p id="toolsInfo" style="font-size:12px;color:#aaa">Saved steps: 0</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button id="toolsUndoBtn" onclick="toolsUndo()" style="padding:10px 14px;border-radius:20px;background:#222;color:#fff;border:1px solid #444">↩️ Undo (0)</button>
      <button id="toolsRedoBtn" onclick="toolsRedo()" style="padding:10px 14px;border-radius:20px;background:#222;color:#fff;border:1px solid #444">↪️ Redo (0)</button>
      <button onclick="toolsClearHistory()" style="padding:10px 14px;border-radius:20px;background:#222;color:#fff;border:1px solid #444">Clear History</button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
      <button onclick="toolsStartExport()" style="padding:10px 14px;border-radius:20px;background:#ffcc00;color:#000;font-weight:900;border:none">🎬 Start Export</button>
      <button onclick="toolsStopExport()" style="padding:10px 14px;border-radius:20px;background:#222;color:#fff;border:1px solid #444">⏹️ Stop & Download</button>
    </div>
    <p id="toolsExportStatus" style="font-size:12px;color:#00d26a"></p>
  `;
  document.body.appendChild(div);
  updateToolsButtons();
});


