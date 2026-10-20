"use strict";

/* ===================================================================
   1. Language + product data
   =================================================================== */

const LANGS = [
  { code:'en-IN', label:'English (India)', name:'English' },
  { code:'hi-IN', label:'हिन्दी Hindi',   name:'Hindi' },
  { code:'te-IN', label:'తెలుగు Telugu',  name:'Telugu' },
  { code:'ta-IN', label:'தமிழ் Tamil',    name:'Tamil' },
  { code:'kn-IN', label:'ಕನ್ನಡ Kannada',  name:'Kannada' },
  { code:'mr-IN', label:'मराठी Marathi',  name:'Marathi' },
  { code:'hinglish', label:'Hinglish (Hindi + English)', name:'Hinglish (conversational Hindi written in Roman script, mixed naturally with English business words)', speech:'hi-IN' }
];

const GREETINGS = {
  'en-IN': (a,c,p) => `Hi, this is ${a} calling from ${c}. Quick heads up — this call is being recorded for quality purposes. Do you have two minutes to hear how ${p} could help you?`,
  'hi-IN': (a,c,p) => `नमस्ते, मैं ${a} बोल रहा हूँ ${c} से। आपको बता दूँ, यह कॉल क्वालिटी के लिए रिकॉर्ड की जा रही है। क्या आपके पास दो मिनट हैं? मैं बताऊँ कि ${p} आपके काम कैसे आ सकता है?`,
  'te-IN': (a,c,p) => `నమస్తే, నేను ${c} నుండి ${a} మాట్లాడుతున్నాను. ఈ కాల్ క్వాలిటీ కోసం రికార్డ్ చేయబడుతోంది అని తెలియజేస్తున్నాను. ${p} మీకు ఎలా ఉపయోగపడుతుందో చెప్పడానికి మీకు రెండు నిమిషాలు ఉన్నాయా?`,
  'ta-IN': (a,c,p) => `வணக்கம், நான் ${c} நிறுவனத்திலிருந்து ${a} பேசுகிறேன். இந்த அழைப்பு தரத்திற்காகப் பதிவு செய்யப்படுகிறது என்பதைத் தெரிவித்துக்கொள்கிறேன். ${p} உங்களுக்கு எப்படி உதவும் என்று சொல்ல உங்களுக்கு இரண்டு நிமிடம் இருக்கிறதா?`,
  'kn-IN': (a,c,p) => `ನಮಸ್ಕಾರ, ನಾನು ${c} ಇಂದ ${a} ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ಈ ಕರೆಯನ್ನು ಗುಣಮಟ್ಟಕ್ಕಾಗಿ ರೆಕಾರ್ಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ ಎಂದು ತಿಳಿಸುತ್ತೇನೆ. ${p} ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ ಎಂದು ಹೇಳಲು ನಿಮಗೆ ಎರಡು ನಿಮಿಷ ಇದೆಯೇ?`,
  'mr-IN': (a,c,p) => `नमस्कार, मी ${c} मधून ${a} बोलत आहे. ही कॉल गुणवत्तेसाठी रेकॉर्ड केली जात आहे हे कळवतो. ${p} तुम्हाला कशी मदत करू शकते हे सांगायला तुमच्याकडे दोन मिनिटं आहेत का?`,
  'hinglish': (a,c,p) => `Hello, main ${a} bol raha hoon ${c} se. Aapko bata doon, yeh call quality ke liye record ho rahi hai. Kya aapke paas do minute hain? Main bataata hoon ${p} aapke kaam kaise aa sakta hai.`
};

const NUDGES = {
  'en-IN': ['Hello, are you still there?', 'I can wait a moment if you are busy — are you able to talk?'],
  'hi-IN': ['हैलो, क्या आप लाइन पर हैं?', 'कोई बात नहीं, मैं रुक सकता हूँ — क्या आप अभी बात कर सकते हैं?'],
  'te-IN': ['హలో, మీరు లైన్‌లో ఉన్నారా?', 'ఫరవాలేదు, నేను ఆగగలను — ఇప్పుడు మాట్లాడగలరా?'],
  'ta-IN': ['ஹலோ, நீங்கள் இணைப்பில் இருக்கிறீர்களா?', 'பரவாயில்லை, நான் காத்திருக்கலாம் — இப்போது பேச முடியுமா?'],
  'kn-IN': ['ಹಲೋ, ನೀವು ಲೈನ್‌ನಲ್ಲಿ ಇದ್ದೀರಾ?', 'ಪರವಾಗಿಲ್ಲ, ನಾನು ಕಾಯಬಲ್ಲೆ — ಈಗ ಮಾತನಾಡಬಹುದೇ?'],
  'mr-IN': ['हॅलो, तुम्ही लाइनवर आहात का?', 'हरकत नाही, मी थांबू शकतो — आता बोलणं शक्य आहे का?'],
  'hinglish': ['Hello, aap line par hain?', 'Koi baat nahi, main ruk sakta hoon — abhi baat kar sakte hain?']
};

const SIGNOFFS = {
  'en-IN': 'It looks like I have lost you. I will try again later. Thank you for your time.',
  'hi-IN': 'लगता है लाइन कट गई है। मैं बाद में फिर कोशिश करूँगा। आपका समय देने के लिए धन्यवाद।',
  'te-IN': 'లైన్ కట్ అయినట్టు ఉంది. నేను తరువాత మళ్ళీ ప్రయత్నిస్తాను. మీ సమయానికి ధన్యవాదాలు.',
  'ta-IN': 'இணைப்பு துண்டிக்கப்பட்டது போல் தெரிகிறது. பிறகு மீண்டும் முயற்சிக்கிறேன். உங்கள் நேரத்திற்கு நன்றி.',
  'kn-IN': 'ಸಂಪರ್ಕ ಕಡಿದುಹೋದಂತೆ ಕಾಣುತ್ತದೆ. ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸುತ್ತೇನೆ. ನಿಮ್ಮ ಸಮಯಕ್ಕೆ ಧನ್ಯವಾದಗಳು.',
  'mr-IN': 'कॉल कट झाल्यासारखं वाटतंय. मी नंतर पुन्हा प्रयत्न करेन. तुमच्या वेळेबद्दल धन्यवाद.',
  'hinglish': 'Lagta hai line cut ho gayi. Main baad mein try karta hoon. Aapke time ke liye thank you.'
};

const PRESETS = [
  {
    key:'ledgerlite',
    name:'LedgerLite',
    company:'LedgerLite Software',
    tagline:'GST-ready accounting that closes your books in a weekend, not a month.',
    desc:'Cloud accounting built for Indian small businesses. It pulls bank statements automatically, matches them to invoices, files GSTR-1 and GSTR-3B from the same screen, and gives the owner a live profit figure instead of a quarterly surprise.',
    features:'Auto bank reconciliation across 40+ Indian banks\nOne-click GSTR-1 and GSTR-3B filing\nE-invoice and e-way bill generation\nInventory and batch tracking\nCA collaboration with read-only access\nWhatsApp payment reminders to customers',
    pricing:'₹749 per month for a single user, ₹1,899 per month for up to 5 users with inventory. 14-day free trial, no card needed. 20% off on annual billing.',
    icp:'Owners and accountants at Indian businesses with 5–100 employees, especially trading, manufacturing and distribution.',
    objections:'"We already use Tally" — we import Tally data in one click and run alongside it for the first month, so nothing is lost.\n"Too expensive" — it replaces roughly 15 hours of manual reconciliation a month; most customers cover the cost in the first week.\n"Our CA handles it" — your CA gets free read-only access, so they work faster and bill you less.\n"Data security" — data sits in an Indian AWS region, encrypted, with daily backups.'
  },
  {
    key:'shiftpilot',
    name:'ShiftPilot',
    company:'ShiftPilot',
    tagline:'Staff rosters that build themselves and stop the no-show phone calls.',
    desc:'Workforce scheduling for shift-based teams. It drafts next week’s roster from demand history, honours leave and overtime rules, pushes shifts to staff on WhatsApp, and finds a replacement automatically when someone calls in sick.',
    features:'Auto-generated rosters from footfall or sales history\nSwap and leave requests approved from the phone\nBiometric and geo-fenced attendance\nOvertime and labour-law guardrails\nPayroll-ready timesheet export\nLive labour cost against revenue',
    pricing:'₹60 per employee per month, minimum 15 employees. Free for the first 30 days. Setup and data migration are included.',
    icp:'Operations and HR managers at retail chains, restaurants, clinics, warehouses and hotels with 20–500 shift workers.',
    objections:'"Excel works fine for us" — Excel does not tell you at 7am that two people have not clocked in. We do.\n"Staff will not use an app" — there is no app. Shifts arrive on WhatsApp and staff reply with a single word.\n"We have multiple locations" — each location gets its own roster and manager, with one group-level cost view.\n"Too costly" — one avoided over-staffed shift a week usually pays for the month.'
  },
  {
    key:'clinicq',
    name:'ClinicQ',
    company:'ClinicQ Health',
    tagline:'Cut the waiting room queue and the no-shows in the same week.',
    desc:'Patient flow software for clinics and small hospitals. Patients book and reschedule themselves, get WhatsApp reminders, and see a live token number, while the front desk gets one screen for queue, billing and follow-up recall.',
    features:'Self-booking page and live token display\nWhatsApp reminders and follow-up recall\nDigital prescriptions and lab report sharing\nBilling with insurance and package handling\nDoctor-wise utilisation and revenue reports\nABDM-compliant patient records',
    pricing:'₹1,499 per month per doctor, ₹4,999 per month for clinics with up to 5 doctors. Free pilot for 3 weeks including staff training.',
    icp:'Clinic owners, practice managers and consulting doctors running single or multi-doctor practices.',
    objections:'"Patients here just walk in" — walk-ins still work; the live token just stops them crowding the corridor.\n"Our staff is not technical" — the front desk screen has four buttons and we train the team on site.\n"We already have billing software" — we export to it, or replace it, whichever you prefer.\n"Patient data privacy" — records are ABDM-compliant and encrypted, with role-based access per staff member.'
  }
];

const STATUSES = ['Converted','Interested','Demo Requested','Follow-up Required','Not Interested','No Response'];
const STATUS_CLASS = {
  'Converted':'s-converted',
  'Interested':'s-interested',
  'Demo Requested':'s-demo',
  'Follow-up Required':'s-followup',
  'Not Interested':'s-notinterested',
  'No Response':'s-noresponse'
};

/* ===================================================================
   2. Small helpers
   =================================================================== */

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clock = (sec) => {
  sec = Math.max(0, Math.floor(sec));
  const m = String(Math.floor(sec/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return m+':'+s;
};
const nowTime = () => new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
const store = {
  get(k, fb){ try { const v = localStorage.getItem(k); return v === null ? fb : JSON.parse(v); } catch { return fb; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k){ try { localStorage.removeItem(k); } catch {} }
};
const langByCode = (c) => LANGS.find(l => l.code === c) || LANGS[0];
const speechCode = (c) => langByCode(c).speech || c;

/* ===================================================================
   3. IndexedDB call store
   =================================================================== */

const DB = (() => {
  let ready;
  function open(){
    if (ready) return ready;
    ready = new Promise((resolve, reject) => {
      const rq = indexedDB.open('vaanee-calls', 1);
      rq.onupgradeneeded = () => {
        const db = rq.result;
        if (!db.objectStoreNames.contains('calls')) {
          db.createObjectStore('calls', { keyPath:'id' }).createIndex('startedAt','startedAt');
        }
      };
      rq.onsuccess = () => resolve(rq.result);
      rq.onerror = () => reject(rq.error);
    });
    return ready;
  }
  const tx = async (mode, fn) => {
    const db = await open();
    return new Promise((resolve, reject) => {
      const t = db.transaction('calls', mode);
      const rq = fn(t.objectStore('calls'));
      t.oncomplete = () => resolve(rq && rq.result);
      t.onerror = () => reject(t.error);
    });
  };
  return {
    put: (rec) => tx('readwrite', (s) => s.put(rec)),
    all: () => tx('readonly', (s) => s.getAll()),
    remove: (id) => tx('readwrite', (s) => s.delete(id))
  };
})();

/* ===================================================================
   4. Text to speech
   =================================================================== */

const TTS = {
  voices: [],
  load(){
    this.voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    return this.voices;
  },
  pick(langCode){
    const chosen = $('aVoice').value;
    if (chosen) {
      const v = this.voices.find(v => v.voiceURI === chosen);
      if (v) return v;
    }
    const code = speechCode(langCode);
    const base = code.split('-')[0];
    return this.voices.find(v => v.lang && v.lang.replace('_','-') === code)
        || this.voices.find(v => v.lang && v.lang.toLowerCase().startsWith(base))
        || this.voices.find(v => v.default)
        || this.voices[0] || null;
  },
  // Chrome truncates long utterances, so speak sentence by sentence.
  chunk(text){
    const parts = String(text).replace(/\s+/g,' ').trim().split(/(?<=[.!?।])\s+/);
    const out = [];
    for (const p of parts) {
      if (!p) continue;
      if (out.length && (out[out.length-1].length + p.length) < 140) out[out.length-1] += ' ' + p;
      else out.push(p);
    }
    return out.length ? out : [String(text)];
  },
  speak(text, langCode, onProgress){
    return new Promise((resolve) => {
      if (!window.speechSynthesis) { resolve(); return; }
      window.speechSynthesis.cancel();
      const chunks = this.chunk(text);
      const voice = this.pick(langCode);
      const rate = parseFloat($('aRate').value) || 1.05;
      let spoken = 0;
      let i = 0;
      const next = () => {
        if (i >= chunks.length || !Call.ttsActive) {
          if (onProgress) onProgress(text.length);
          resolve();
          return;
        }
        const piece = chunks[i];
        const u = new SpeechSynthesisUtterance(piece);
        if (voice) u.voice = voice;
        u.lang = voice ? voice.lang : speechCode(langCode);
        u.rate = rate; u.pitch = 1;
        u.onboundary = (e) => { if (onProgress) onProgress(spoken + (e.charIndex || 0)); };
        u.onend = () => { spoken += piece.length + 1; i++; if (onProgress) onProgress(spoken); next(); };
        u.onerror = () => { spoken += piece.length + 1; i++; next(); };
        window.speechSynthesis.speak(u);
      };
      Call.ttsActive = true;
      next();
    });
  },
  stop(){
    Call.ttsActive = false;
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch {}
  }
};

/* ===================================================================
   5. Model calls
   =================================================================== */

async function askModel({ system, messages, json = false, maxTokens = 400 }) {
  const headers = { 'content-type':'application/json' };
  const key = store.get('vaanee.key', '');
  const provider = store.get('vaanee.provider', 'google');
  if (key) { headers['x-api-key'] = key; headers['x-provider'] = provider; }

  const r = await fetch('/api/chat', {
    method:'POST',
    headers,
    body: JSON.stringify({ system, messages, json, maxTokens })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const err = new Error(data.error || ('Request failed (' + r.status + ')'));
    err.code = data.code;
    throw err;
  }
  return data.text || '';
}

function parseJSON(text){
  if (!text) return null;
  let t = String(text).trim().replace(/^```(?:json)?/i,'').replace(/```$/,'').trim();
  try { return JSON.parse(t); } catch {}
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b+1)); } catch {} }
  return null;
}

function productBrief(){
  const p = Call.product;
  return [
    'PRODUCT BRIEF',
    'Product: ' + p.name,
    'Sold by: ' + p.company,
    'One-line pitch: ' + p.tagline,
    'What it does: ' + p.desc,
    'Key features:\n' + (p.features || '').split('\n').filter(Boolean).map(f => '  - ' + f.trim()).join('\n'),
    'Pricing: ' + p.pricing,
    'Ideal customer: ' + p.icp,
    'Known objections and how to answer them:\n' + (p.objections || '').split('\n').filter(Boolean).map(o => '  - ' + o.trim()).join('\n')
  ].join('\n');
}

const STYLE_NOTE = {
  warm:'Warm and consultative. Ask about their situation before pitching. Never pushy.',
  direct:'Direct and efficient. Get to the point fast, respect their time, ask for a clear decision.',
  energetic:'Upbeat and energetic, but never loud or salesy. Keep momentum and enthusiasm.'
};

function salesSystemPrompt(){
  const lang = langByCode(Call.lang);
  return [
    'You are ' + Call.agentName + ', an inside sales representative for ' + Call.product.company + '.',
    'You are on a LIVE VOICE CALL with a prospective customer. Every word you write is spoken aloud by a text-to-speech voice, so write only what should be heard.',
    '',
    productBrief(),
    '',
    'HOW TO SPEAK',
    '- Speak only in ' + lang.name + '. Keep product names, feature names and prices as they are written in the brief.',
    '- One to three short sentences per turn. Never more than about 45 spoken words.',
    '- No markdown, no bullet points, no emoji, no asterisks, no stage directions. Plain spoken sentences only.',
    '- End most turns with exactly one question, so the customer always has something easy to answer.',
    '- ' + (STYLE_NOTE[Call.style] || STYLE_NOTE.warm),
    '',
    'HOW TO SELL',
    '- First understand their situation: team size, how they handle this today, what it costs them.',
    '- Then connect one specific feature to the problem they just described. Do not list features.',
    '- When they object, acknowledge it honestly, answer it using the brief, then ask a question again.',
    '- Ask for a concrete next step: a free trial, a demo slot, or a follow-up call with a date.',
    '- If they clearly say yes, confirm the exact next step and what happens now.',
    '- If they are clearly not interested, thank them warmly, leave the door open and close the call.',
    '- Never invent facts, figures, customers or integrations that are not in the brief. If asked something outside it, say a specialist will confirm, and move on.',
    '- The speech-to-text may garble words. If a reply makes no sense, ask them to repeat it rather than guessing.',
    '',
    'Reply with only the words you will say next. Nothing else.'
  ].join('\n');
}

function summarySystemPrompt(){
  return [
    'You are a sales operations analyst. You are given the transcript of a voice sales call between an AI sales agent and a prospective customer.',
    'Analyse it and return a single JSON object. No markdown, no commentary, JSON only.',
    '',
    'Shape:',
    '{',
    '  "summary": "3 to 4 sentences in English describing what happened on the call",',
    '  "customerRequirements": ["what the customer said they need, in English"],',
    '  "objections": ["each objection the customer raised, in English"],',
    '  "nextSteps": ["concrete follow-up actions for the sales team"],',
    '  "status": "one of: Converted | Interested | Demo Requested | Follow-up Required | Not Interested | No Response",',
    '  "statusReason": "one sentence explaining the status",',
    '  "sentiment": "positive | neutral | negative",',
    '  "interestScore": 0,',
    '  "keyMoment": "the single most important thing the customer said, quoted in the original language"',
    '}',
    '',
    'STATUS RULES, applied in this order:',
    '1. "No Response" if the customer never spoke, or said nothing beyond a greeting or hang-up.',
    '2. "Converted" only if the customer explicitly agreed to buy, sign up, or start a paid or free trial.',
    '3. "Demo Requested" if they asked for a demo, a walkthrough, or a screen-share, and that is the furthest commitment.',
    '4. "Follow-up Required" if they asked to be contacted later, wanted to check with someone else, or asked for information first.',
    '5. "Not Interested" if they declined, said it is not relevant, or asked not to be contacted.',
    '6. "Interested" if they engaged positively and asked real questions but committed to nothing specific.',
    '',
    'interestScore is 0 to 100 and reflects how likely this prospect is to buy. Use empty arrays where nothing applies. Write all analysis fields in English even when the call was in another language.'
  ].join('\n');
}

/* ===================================================================
   6. Call engine
   =================================================================== */

const Call = {
  active:false,
  state:'idle',
  ttsActive:false,
  turns:[],
  startedAt:null,
  tick:null,
  silenceStrikes:0,
  recognition:null,
  recognizing:false,
  stream:null,
  recorder:null,
  chunks:[],
  audioCtx:null,
  analyser:null,
  rafId:null,
  product:null,
  lang:'en-IN',
  agentName:'Riya',
  style:'warm',
  micOK:false,
  id:null
};

function setState(s){
  Call.state = s;
  const label = {
    idle:'Idle', connecting:'Connecting', connected:'Connected',
    speaking:'Agent speaking', listening:'Listening', thinking:'Thinking',
    summarizing:'Writing summary', ended:'Call ended'
  }[s] || s;
  $('statusPill').dataset.s = s;
  $('statusText').textContent = label;
  $('interruptBtn').hidden = (s !== 'speaking');
}

function notice(msg, kind){
  const box = $('dockNotice');
  if (!msg) { box.innerHTML = ''; return; }
  box.innerHTML = '<div class="notice ' + (kind || '') + '">' + esc(msg) + '</div>';
}

function readProduct(){
  return {
    name: $('pName').value.trim() || 'our product',
    company: $('pCompany').value.trim() || 'our company',
    tagline: $('pTagline').value.trim(),
    desc: $('pDesc').value.trim(),
    features: $('pFeatures').value.trim(),
    pricing: $('pPricing').value.trim(),
    icp: $('pIcp').value.trim(),
    objections: $('pObjections').value.trim()
  };
}

/* ---------- chat rendering ---------- */

function clearChat(){
  $('chat').innerHTML = '';
}

function addMessage(role, text, opts){
  opts = opts || {};
  const chat = $('chat');
  const wrap = document.createElement('div');
  wrap.className = 'msg ' + role + (opts.interim ? ' interim' : '');
  if (opts.id) wrap.id = opts.id;
  const who = role === 'bot' ? Call.agentName + ' · agent'
            : role === 'customer' ? 'Customer'
            : 'Call log';
  const stamp = opts.interim ? '' : '<span class="stamp">' + esc(nowTime()) + '</span>';
  wrap.innerHTML =
    (role === 'system' ? '' : '<span class="who">' + esc(who) + '</span>') +
    '<div class="bubble"></div>' + stamp;
  wrap.querySelector('.bubble').textContent = text;
  chat.appendChild(wrap);
  chat.scrollTop = chat.scrollHeight;
  return wrap;
}

function removeInterim(){
  const el = document.getElementById('interim-bubble');
  if (el) el.remove();
}

function showInterim(text){
  let el = document.getElementById('interim-bubble');
  if (!el) el = addMessage('customer', text, { interim:true, id:'interim-bubble' });
  else {
    el.querySelector('.bubble').textContent = text;
    $('chat').scrollTop = $('chat').scrollHeight;
  }
}

/* ---------- microphone + recorder ---------- */

async function startMic(){
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('This browser does not expose a microphone to web pages.');
  }
  // echoCancellation is off on purpose: on speakers the mic then also captures
  // the agent's voice, so the saved recording has both sides of the call.
  const stream = await navigator.mediaDevices.getUserMedia({
    audio:{ echoCancellation:false, noiseSuppression:false, autoGainControl:true }
  });
  Call.stream = stream;

  // live input meter
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    Call.audioCtx = new Ctx();
    const src = Call.audioCtx.createMediaStreamSource(stream);
    Call.analyser = Call.audioCtx.createAnalyser();
    Call.analyser.fftSize = 512;
    src.connect(Call.analyser);
    const buf = new Uint8Array(Call.analyser.frequencyBinCount);
    const draw = () => {
      if (!Call.active) { $('meterBar').style.width = '0%'; return; }
      Call.analyser.getByteTimeDomainData(buf);
      let peak = 0;
      for (let i=0;i<buf.length;i++) peak = Math.max(peak, Math.abs(buf[i]-128));
      $('meterBar').style.width = Math.min(100, (peak/70)*100).toFixed(0) + '%';
      Call.rafId = requestAnimationFrame(draw);
    };
    draw();
  } catch {}

  // recorder
  const types = ['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'];
  const mime = types.find(t => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) || '';
  Call.chunks = [];
  try {
    Call.recorder = mime ? new MediaRecorder(stream, { mimeType:mime }) : new MediaRecorder(stream);
    Call.recorder.ondataavailable = (e) => { if (e.data && e.data.size) Call.chunks.push(e.data); };
    Call.recorder.start(1000);
    $('recFlag').hidden = false;
  } catch {
    Call.recorder = null;
  }
  Call.micOK = true;
}

function stopMic(){
  try { Call.recorder && Call.recorder.state !== 'inactive' && Call.recorder.stop(); } catch {}
  try { Call.stream && Call.stream.getTracks().forEach(t => t.stop()); } catch {}
  try { Call.audioCtx && Call.audioCtx.close(); } catch {}
  if (Call.rafId) cancelAnimationFrame(Call.rafId);
  Call.rafId = null;
  $('meterBar').style.width = '0%';
  $('recFlag').hidden = true;
}

function collectRecording(){
  return new Promise((resolve) => {
    const rec = Call.recorder;
    if (!rec || rec.state === 'inactive') {
      resolve(Call.chunks.length ? new Blob(Call.chunks, { type: Call.chunks[0].type || 'audio/webm' }) : null);
      return;
    }
    rec.onstop = () => {
      resolve(Call.chunks.length ? new Blob(Call.chunks, { type: rec.mimeType || 'audio/webm' }) : null);
    };
    try { rec.stop(); } catch { resolve(null); }
  });
}

/* ---------- speech recognition ---------- */

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

function listen(){
  if (!Call.active) return;
  if (!SR) { setState('connected'); return; }

  setState('listening');
  let heard = '';
  let settled = false;
  const rec = new SR();
  Call.recognition = rec;
  rec.lang = speechCode(Call.lang);
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;

  const guard = setTimeout(() => { try { rec.stop(); } catch {} }, 16000);

  rec.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) heard += t + ' ';
      else interim += t;
    }
    if (interim) showInterim(interim);
    else if (heard) showInterim(heard);
  };
  rec.onerror = (e) => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      settled = true;
      clearTimeout(guard);
      Call.recognizing = false;
      removeInterim();
      notice('Microphone access was blocked, so speech recognition is off. You can still type the customer’s replies below.', 'err');
      enableTyping(true);
      setState('connected');
    }
  };
  rec.onend = () => {
    clearTimeout(guard);
    Call.recognizing = false;
    if (settled || !Call.active) return;
    settled = true;
    removeInterim();
    const text = heard.trim();
    if (text) handleCustomer(text);
    else handleSilence();
  };

  try { rec.start(); Call.recognizing = true; }
  catch { setTimeout(() => { if (Call.active) listen(); }, 400); }
}

function stopListening(){
  try { Call.recognition && Call.recognition.abort(); } catch {}
  Call.recognizing = false;
  removeInterim();
}

async function handleSilence(){
  if (!Call.active) return;
  Call.silenceStrikes++;
  const nudges = NUDGES[Call.lang] || NUDGES['en-IN'];
  if (Call.silenceStrikes >= 3) {
    await botSays(SIGNOFFS[Call.lang] || SIGNOFFS['en-IN']);
    endCall();
    return;
  }
  await botSays(nudges[Math.min(Call.silenceStrikes-1, nudges.length-1)]);
  listen();
}

/* ---------- turn handling ---------- */

async function botSays(text){
  if (!Call.active) return;
  setState('speaking');
  const node = addMessage('bot', '');
  const bubble = node.querySelector('.bubble');
  bubble.innerHTML = '<span class="caret"></span>';
  let shown = 0;
  const reveal = (n) => {
    const upto = Math.max(shown, Math.min(text.length, n));
    shown = upto;
    bubble.textContent = text.slice(0, upto);
    if (upto < text.length) bubble.appendChild(Object.assign(document.createElement('span'), { className:'caret' }));
    $('chat').scrollTop = $('chat').scrollHeight;
  };
  Call.turns.push({ role:'bot', text, at:Date.now() });

  if (window.speechSynthesis) {
    await TTS.speak(text, Call.lang, reveal);
  } else {
    // No speech synthesis: type the line out instead so the screen still moves.
    await new Promise((res) => {
      const iv = setInterval(() => {
        shown += 3;
        reveal(shown);
        if (shown >= text.length) { clearInterval(iv); res(); }
      }, 28);
    });
  }
  bubble.textContent = text;
  if (Call.active) setState('connected');
}

async function handleCustomer(text){
  if (!Call.active) return;
  Call.silenceStrikes = 0;
  Call.turns.push({ role:'customer', text, at:Date.now() });
  addMessage('customer', text);
  setState('thinking');

  let reply;
  try {
    reply = await askModel({
      system: salesSystemPrompt(),
      messages: Call.turns.map(t => ({ role: t.role === 'bot' ? 'assistant' : 'user', content: t.text })),
      maxTokens: 220
    });
  } catch (err) {
    notice(err.code === 'no_key'
      ? 'No model key is configured yet. Add one in Vercel project settings, or paste a key under Campaign → Settings.'
      : 'The model could not be reached: ' + err.message, 'err');
    setState('connected');
    if (Call.active) listen();
    return;
  }
  if (!Call.active) return;
  reply = String(reply).replace(/\*\*?/g,'').replace(/^\s*[-•]\s*/gm,'').trim();
  if (!reply) { listen(); return; }
  await botSays(reply);
  listen();
}

/* ---------- lifecycle ---------- */

async function beginCall(){
  Call.product = readProduct();
  Call.lang = $('aLang').value;
  Call.agentName = $('aName').value.trim() || 'Riya';
  Call.style = $('aStyle').value;
  Call.turns = [];
  Call.silenceStrikes = 0;
  Call.id = 'call_' + Date.now().toString(36);
  Call.startedAt = Date.now();
  Call.active = true;

  clearChat();
  notice('');
  setState('connecting');
  $('startBtn').disabled = true;
  $('endBtn').disabled = false;
  $('callProduct').textContent = Call.product.name + ' · ' + langByCode(Call.lang).label;
  enableTyping(false);

  Call.tick = setInterval(() => {
    $('timer').textContent = clock((Date.now() - Call.startedAt) / 1000);
  }, 250);

  addMessage('system', 'Call started · recording on · ' + langByCode(Call.lang).label);

  try {
    await startMic();
  } catch (err) {
    notice('No microphone: ' + err.message + ' The call will run in typing mode instead.', 'err');
    enableTyping(true);
  }

  if (!SR && Call.micOK) {
    notice('This browser has no speech recognition. Chrome or Edge is needed for voice input — you can type replies below meanwhile.', 'err');
    enableTyping(true);
  }

  setState('connected');
  const g = GREETINGS[Call.lang] || GREETINGS['en-IN'];
  await botSays(g(Call.agentName, Call.product.company, Call.product.name));
  if (!Call.active) return;
  if (SR && Call.micOK) listen();
  else enableTyping(true);
}

async function endCall(){
  if (!Call.active) return;
  Call.active = false;
  TTS.stop();
  stopListening();
  clearInterval(Call.tick);
  enableTyping(false);
  $('endBtn').disabled = true;
  $('interruptBtn').hidden = true;

  const durationSec = Math.round((Date.now() - Call.startedAt) / 1000);
  const blob = await collectRecording();
  stopMic();

  addMessage('system', 'Call ended · ' + clock(durationSec) + ' · analysing');
  setState('summarizing');

  const record = {
    id: Call.id,
    startedAt: Call.startedAt,
    durationSec,
    language: Call.lang,
    languageLabel: langByCode(Call.lang).label,
    agentName: Call.agentName,
    productName: Call.product.name,
    company: Call.product.company,
    turns: Call.turns.slice(),
    audio: blob || null,
    audioType: blob ? blob.type : null,
    analysis: null
  };

  record.analysis = await analyseCall(record);
  try { await DB.put(record); } catch {}
  await renderHistory();
  setState('ended');
  $('startBtn').disabled = false;
  addMessage('system', 'Status: ' + record.analysis.status + ' · saved to call history');
  notice('Call saved. Open it in the history pane for the recording, summary and status.', 'ok');
  openDetail(record.id);
}

async function analyseCall(record){
  const customerTurns = record.turns.filter(t => t.role === 'customer');
  const fallback = {
    summary: customerTurns.length
      ? 'The agent pitched ' + record.productName + ' and the customer replied, but the automatic analysis could not be generated.'
      : 'The agent opened the call but the customer never responded.',
    customerRequirements: [],
    objections: [],
    nextSteps: customerTurns.length ? ['Review the transcript and follow up manually.'] : ['Try the number again at a different time.'],
    status: customerTurns.length ? 'Follow-up Required' : 'No Response',
    statusReason: customerTurns.length ? 'Analysis unavailable, defaulting to a manual follow-up.' : 'No customer speech was captured on the call.',
    sentiment: 'neutral',
    interestScore: customerTurns.length ? 40 : 0,
    keyMoment: ''
  };

  if (!customerTurns.length) return fallback;

  const transcript = record.turns
    .map(t => (t.role === 'bot' ? 'AGENT: ' : 'CUSTOMER: ') + t.text)
    .join('\n');

  try {
    const raw = await askModel({
      system: summarySystemPrompt(),
      messages: [{
        role:'user',
        content:
          'Product: ' + record.productName + ' by ' + record.company + '\n' +
          'Call language: ' + record.languageLabel + '\n' +
          'Call length: ' + clock(record.durationSec) + '\n' +
          'Customer turns: ' + customerTurns.length + '\n\n' +
          'TRANSCRIPT\n' + transcript
      }],
      json:true,
      maxTokens:900
    });
    const parsed = parseJSON(raw);
    if (!parsed) return fallback;
    const status = STATUSES.includes(parsed.status) ? parsed.status : fallback.status;
    return {
      summary: parsed.summary || fallback.summary,
      customerRequirements: Array.isArray(parsed.customerRequirements) ? parsed.customerRequirements : [],
      objections: Array.isArray(parsed.objections) ? parsed.objections : [],
      nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
      status,
      statusReason: parsed.statusReason || '',
      sentiment: parsed.sentiment || 'neutral',
      interestScore: Math.max(0, Math.min(100, Number(parsed.interestScore) || 0)),
      keyMoment: parsed.keyMoment || ''
    };
  } catch (err) {
    notice('Summary could not be generated: ' + err.message, 'err');
    return fallback;
  }
}

function enableTyping(on){
  $('typedInput').disabled = !on;
  $('sendTyped').disabled = !on;
}

/* ===================================================================
   7. History + detail
   =================================================================== */

let historyCache = [];

async function renderHistory(){
  let rows = [];
  try { rows = await DB.all(); } catch {}
  rows.sort((a,b) => b.startedAt - a.startedAt);
  historyCache = rows;
  const list = $('historyList');
  $('histCount').textContent = rows.length ? rows.length + (rows.length === 1 ? ' call' : ' calls') : '';
  if (!rows.length) {
    list.innerHTML = '<div class="empty-note">No calls yet. Finished calls appear here with their recording, transcript, AI summary and sales status.</div>';
    return;
  }
  list.innerHTML = rows.map(r => {
    const a = r.analysis || {};
    const d = new Date(r.startedAt);
    return '<button class="call-item" data-id="' + esc(r.id) + '" type="button">' +
      '<div class="top"><span class="prod">' + esc(r.productName) + '</span>' +
      '<span class="status-badge ' + (STATUS_CLASS[a.status] || 's-noresponse') + '">' + esc(a.status || 'No Response') + '</span></div>' +
      '<div class="meta"><span>' + esc(d.toLocaleDateString([], {day:'2-digit', month:'short'})) + ' ' + esc(d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})) + '</span>' +
      '<span>' + esc(clock(r.durationSec)) + '</span>' +
      '<span>' + esc(r.turns.filter(t => t.role === 'customer').length) + ' replies</span></div>' +
      '<div class="snip">' + esc(a.summary || 'No summary available.') + '</div>' +
      '</button>';
  }).join('');
  list.querySelectorAll('.call-item').forEach(b => {
    b.addEventListener('click', () => openDetail(b.dataset.id));
  });
}

let detailURL = null;

function openDetail(id){
  const r = historyCache.find(x => x.id === id);
  if (!r) return;
  const a = r.analysis || {};
  const d = new Date(r.startedAt);
  $('detailTitle').textContent = r.productName + ' · ' + d.toLocaleString([], {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'});

  if (detailURL) { URL.revokeObjectURL(detailURL); detailURL = null; }
  let audioHTML = '<p class="hint">No recording was captured for this call.</p>';
  if (r.audio) {
    detailURL = URL.createObjectURL(r.audio);
    audioHTML = '<audio controls preload="metadata" src="' + detailURL + '"></audio>' +
      '<a class="btn btn-sm btn-ghost" style="align-self:flex-start;text-decoration:none" download="' + esc(r.id) + '.webm" href="' + detailURL + '">Download recording</a>';
  }

  const list = (arr, empty) => (arr && arr.length)
    ? '<ul>' + arr.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>'
    : '<span class="hint">' + empty + '</span>';

  $('detailBody').innerHTML = [
    '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">',
    '<span class="status-badge ' + (STATUS_CLASS[a.status] || 's-noresponse') + '">' + esc(a.status || 'No Response') + '</span>',
    '<span class="pill">' + esc(clock(r.durationSec)) + '</span>',
    '<span class="pill">' + esc(r.languageLabel || r.language) + '</span>',
    '<span class="pill">' + esc(r.agentName) + '</span>',
    '</div>',
    a.statusReason ? '<p class="hint" style="font-size:13.5px">' + esc(a.statusReason) + '</p>' : '',

    '<div class="card"><h3>Recording</h3>' + audioHTML + '</div>',

    '<div class="card"><h3>AI summary</h3>',
    '<dl class="kv"><dd>' + esc(a.summary || '—') + '</dd></dl>',
    '<dl class="kv"><dt>Customer requirements</dt><dd>' + list(a.customerRequirements, 'None captured.') + '</dd></dl>',
    '<dl class="kv"><dt>Objections raised</dt><dd>' + list(a.objections, 'None raised.') + '</dd></dl>',
    '<dl class="kv"><dt>Next steps</dt><dd>' + list(a.nextSteps, 'None recorded.') + '</dd></dl>',
    a.keyMoment ? '<dl class="kv"><dt>Key moment</dt><dd>“' + esc(a.keyMoment) + '”</dd></dl>' : '',
    '<dl class="kv"><dt>Interest score · ' + esc(a.interestScore || 0) + '/100 · ' + esc(a.sentiment || 'neutral') + '</dt>',
    '<dd><div class="score"><i style="width:' + Math.max(2, Number(a.interestScore) || 0) + '%"></i></div></dd></dl>',
    '</div>',

    '<div class="card"><h3>Transcript</h3><div class="transcript-log">',
    r.turns.length
      ? r.turns.map(t => '<div class="tline ' + (t.role === 'bot' ? 'bot' : '') + '"><b>' +
          esc(t.role === 'bot' ? r.agentName + ' (agent)' : 'Customer') + '</b>' + esc(t.text) + '</div>').join('')
      : '<span class="hint">Nothing was said on this call.</span>',
    '</div></div>',

    '<div class="sheet-actions">',
    '<button class="btn btn-sm btn-ghost" id="exportCall" type="button">Export JSON</button>',
    '<button class="btn btn-sm btn-danger" id="deleteCall" type="button">Delete call</button>',
    '</div>'
  ].join('');

  $('exportCall').addEventListener('click', () => {
    const copy = { ...r };
    delete copy.audio;
    const blob = new Blob([JSON.stringify(copy, null, 2)], { type:'application/json' });
    const u = URL.createObjectURL(blob);
    const a2 = document.createElement('a');
    a2.href = u; a2.download = r.id + '.json'; a2.click();
    setTimeout(() => URL.revokeObjectURL(u), 2000);
  });
  $('deleteCall').addEventListener('click', async () => {
    await DB.remove(r.id);
    closeDetail();
    renderHistory();
  });

  $('detailScrim').hidden = false;
}

function closeDetail(){
  $('detailScrim').hidden = true;
  if (detailURL) { URL.revokeObjectURL(detailURL); detailURL = null; }
}

/* ===================================================================
   8. Wiring
   =================================================================== */

function applyPreset(p){
  $('pName').value = p.name;
  $('pCompany').value = p.company;
  $('pTagline').value = p.tagline;
  $('pDesc').value = p.desc;
  $('pFeatures').value = p.features;
  $('pPricing').value = p.pricing;
  $('pIcp').value = p.icp;
  $('pObjections').value = p.objections;
  saveCampaign();
}

function saveCampaign(){
  store.set('vaanee.campaign', {
    product: readProduct(),
    agentName: $('aName').value,
    lang: $('aLang').value,
    style: $('aStyle').value,
    rate: $('aRate').value,
    voice: $('aVoice').value
  });
  $('callProduct').textContent = ($('pName').value || 'No product') + ' · ' + langByCode($('aLang').value).label;
}

function populateVoices(){
  const voices = TTS.load();
  const sel = $('aVoice');
  const keep = sel.value;
  sel.innerHTML = '<option value="">Best match for the language</option>' +
    voices.map(v => '<option value="' + esc(v.voiceURI) + '">' + esc(v.name) + ' — ' + esc(v.lang) + '</option>').join('');
  if (keep) sel.value = keep;
  checkVoiceFor($('aLang').value);
}

function checkVoiceFor(code){
  const v = TTS.pick(code);
  const want = speechCode(code).split('-')[0];
  const hint = $('micHint');
  if (!window.speechSynthesis) { hint.textContent = 'No speech synthesis in this browser.'; return; }
  if (!v) { hint.textContent = 'No system voices found yet.'; return; }
  if (!v.lang || !v.lang.toLowerCase().startsWith(want)) {
    hint.textContent = 'No ' + langByCode(code).name + ' voice installed — the agent will speak with ' + v.lang + '.';
  } else {
    hint.textContent = 'Voice: ' + v.name;
  }
}

function switchTab(tab){
  ['setup','call','history'].forEach(t => {
    $('pane-' + t).classList.toggle('active', t === tab);
  });
  document.querySelectorAll('.tabbar button').forEach(b => {
    b.setAttribute('aria-selected', String(b.dataset.tab === tab));
  });
}

async function checkBackend(){
  const note = $('backendNote');
  try {
    const r = await fetch('/api/chat');
    const d = await r.json();
    if (d.configured) {
      note.innerHTML = '<span class="notice ok" style="display:block">Server key detected (' + esc(d.provider) + '). The site works for anyone who opens it.</span>';
    } else if (store.get('vaanee.key','')) {
      note.innerHTML = '<span class="notice" style="display:block">Using the key saved in this browser. Set one in Vercel project settings so other people can use the site too.</span>';
    } else {
      note.innerHTML = '<span class="notice err" style="display:block">No model key yet. Add GEMINI_API_KEY (or OPENAI_API_KEY / ANTHROPIC_API_KEY) in your Vercel project settings and redeploy, or paste one above to test now.</span>';
    }
  } catch {
    note.innerHTML = '<span class="notice err" style="display:block">The /api/chat route is not reachable. If you opened this file directly, serve it through Vercel or <code>vercel dev</code>.</span>';
  }
}

function init(){
  // presets
  $('preset').innerHTML = '<option value="">— choose a preset —</option>' +
    PRESETS.map(p => '<option value="' + p.key + '">' + esc(p.name) + ' — ' + esc(p.tagline.slice(0,42)) + '…</option>').join('');
  $('preset').addEventListener('change', (e) => {
    const p = PRESETS.find(x => x.key === e.target.value);
    if (p) applyPreset(p);
  });

  // languages
  $('aLang').innerHTML = LANGS.map(l => '<option value="' + l.code + '">' + esc(l.label) + '</option>').join('');

  // restore or seed
  const saved = store.get('vaanee.campaign', null);
  if (saved && saved.product && saved.product.name) {
    const p = saved.product;
    $('pName').value = p.name; $('pCompany').value = p.company; $('pTagline').value = p.tagline;
    $('pDesc').value = p.desc; $('pFeatures').value = p.features; $('pPricing').value = p.pricing;
    $('pIcp').value = p.icp; $('pObjections').value = p.objections;
    $('aName').value = saved.agentName || 'Riya';
    $('aLang').value = saved.lang || 'en-IN';
    $('aStyle').value = saved.style || 'warm';
    $('aRate').value = saved.rate || '1.05';
  } else {
    $('aName').value = 'Riya';
    applyPreset(PRESETS[0]);
  }
  $('aRateVal').textContent = '×' + $('aRate').value;
  $('preset').value = '';

  // settings
  $('keyProvider').value = store.get('vaanee.provider','google');
  if (store.get('vaanee.key','')) $('keyInput').placeholder = 'A key is saved in this browser';
  $('saveKey').addEventListener('click', () => {
    const v = $('keyInput').value.trim();
    if (!v) return;
    store.set('vaanee.key', v);
    store.set('vaanee.provider', $('keyProvider').value);
    $('keyInput').value = '';
    $('keyInput').placeholder = 'A key is saved in this browser';
    checkBackend();
  });
  $('clearKey').addEventListener('click', () => {
    store.del('vaanee.key');
    $('keyInput').placeholder = 'Leave empty if set on the server';
    checkBackend();
  });

  // campaign persistence
  ['pName','pCompany','pTagline','pDesc','pFeatures','pPricing','pIcp','pObjections','aName','aStyle']
    .forEach(id => $(id).addEventListener('input', saveCampaign));
  $('aLang').addEventListener('change', () => { saveCampaign(); checkVoiceFor($('aLang').value); });
  $('aVoice').addEventListener('change', () => { saveCampaign(); checkVoiceFor($('aLang').value); });
  $('aRate').addEventListener('input', () => { $('aRateVal').textContent = '×' + $('aRate').value; saveCampaign(); });

  $('testVoice').addEventListener('click', () => {
    const code = $('aLang').value;
    const g = GREETINGS[code] || GREETINGS['en-IN'];
    Call.ttsActive = true;
    TTS.speak(g($('aName').value || 'Riya', $('pCompany').value || 'our company', $('pName').value || 'our product'), code);
  });

  // theme
  const savedTheme = store.get('vaanee.theme', null);
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  $('themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme;
    const isDark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set('vaanee.theme', next);
  });

  // tabs
  document.querySelectorAll('.tabbar button').forEach(b => {
    b.addEventListener('click', () => switchTab(b.dataset.tab));
  });

  // consent gate
  $('startBtn').addEventListener('click', () => {
    $('consentCheck').checked = false;
    $('consentGo').disabled = true;
    $('consentScrim').hidden = false;
  });
  $('consentCheck').addEventListener('change', (e) => { $('consentGo').disabled = !e.target.checked; });
  $('consentCancel').addEventListener('click', () => { $('consentScrim').hidden = true; });
  $('consentGo').addEventListener('click', () => {
    $('consentScrim').hidden = true;
    switchTab('call');
    beginCall();
  });

  $('endBtn').addEventListener('click', endCall);
  $('interruptBtn').addEventListener('click', () => {
    TTS.stop();
    if (Call.active) listen();
  });

  // typed fallback
  const sendTyped = () => {
    const v = $('typedInput').value.trim();
    if (!v || !Call.active) return;
    $('typedInput').value = '';
    stopListening();
    handleCustomer(v);
  };
  $('sendTyped').addEventListener('click', sendTyped);
  $('typedInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') sendTyped(); });

  // detail modal
  $('detailClose').addEventListener('click', closeDetail);
  $('detailScrim').addEventListener('click', (e) => { if (e.target === $('detailScrim')) closeDetail(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDetail(); $('consentScrim').hidden = true; }
  });

  // voices load asynchronously in Chrome
  populateVoices();
  if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = populateVoices;

  if (!SR) {
    notice('Voice input needs Chrome, Edge or another Chromium browser. Everything else on this page works here, and you can type the customer replies.', 'err');
  }

  renderHistory();
  checkBackend();
  saveCampaign();
}

window.addEventListener('beforeunload', (e) => {
  if (Call.active) { e.preventDefault(); e.returnValue = ''; }
});

init();
