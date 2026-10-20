# Vaanee — AI Voice Sales Agent

A web app where an AI agent runs a real, two-way voice sales call for any SaaS product,
shows the conversation as live text, records the call, and files an AI summary with a
sales status afterwards.

**Live:** https://vaanee-voice-sales-bot-blog-posts-projects.vercel.app

---

## One thing to do before the demo

The app needs a language-model key. It is read on the server, so visitors never see it.

1. Vercel dashboard → project `vaanee-voice-sales-bot` → **Settings → Environment Variables**
2. Add **one** of these (Production):

   | Variable | Provider | Where to get it |
   |---|---|---|
   | `GEMINI_API_KEY` | Google Gemini | aistudio.google.com — free tier, easiest |
   | `OPENAI_API_KEY` | OpenAI | platform.openai.com |
   | `ANTHROPIC_API_KEY` | Anthropic | console.anthropic.com |

3. **Deployments → ⋯ → Redeploy** on the latest production deployment.

The Campaign → Settings panel in the app turns green once the server key is live.

To test before setting the env var, paste a key into **Campaign → Settings** in the app.
It stays in that browser's local storage only and is sent per-request — fine for your own
testing, not for the submitted link.

---

## Using it

1. **Campaign** pane — pick one of the three sample SaaS products or type your own
   (name, pitch, features, pricing, ideal customer, objections). The agent sells whatever
   is in these boxes, so this is how it handles "any SaaS product".
2. Choose a language — English, Hindi, Telugu, Tamil, Kannada, Marathi or Hinglish —
   an agent name, voice and selling style.
3. **Start call** → consent dialog → the agent dials, greets you out loud, states that the
   call is recorded, and starts listening.
4. Talk. Your words appear live as you speak; the agent's reply types out in sync with its voice.
5. **End call** → the recording is saved, the summary and status are generated, and the call
   drops into **Call history**.

Use **speakers, not headphones**. Echo cancellation is deliberately off, so the microphone
also picks up the agent's voice and the saved recording contains both sides of the call.

Voice input needs Chrome or Edge. If the mic is blocked or the browser has no speech
recognition, the call continues in typing mode — the text box under the call controls.

---

## How it works

```
Browser                                    Vercel
───────                                    ──────
SpeechRecognition  ──► transcript ──┐
                                    ├──►  POST /api/chat  ──►  Gemini / OpenAI / Claude
speechSynthesis    ◄── reply text ──┘      (key lives here)

MediaRecorder ──► audio Blob ──► IndexedDB (stays on the device)
```

**The call loop.** The agent speaks a scripted opening (which carries the recording
disclosure, so consent is spoken in the call language), then listens. Each final
transcript is appended to the turn list, the whole conversation is sent to the model with
a system prompt built from the product brief, and the reply is spoken and typed out
together using the utterance's `onboundary` events. Then it listens again. Three silent
turns and the agent politely closes the call.

**The summary.** On End Call, the transcript goes back to the model with a strict JSON
schema and an ordered set of status rules. It returns the summary, customer requirements,
objections, next steps, status, a one-line reason, sentiment and an interest score.
Zero customer turns short-circuits to **No Response** without a model call.

**Sales statuses** — Converted · Interested · Demo Requested · Follow-up Required ·
Not Interested · No Response. Assigned by the model against explicit rules, with a
deterministic fallback if the model is unreachable.

**Storage.** Calls, transcripts and audio live in IndexedDB on the device. Nothing is
uploaded. Each call can be played back, exported as JSON or deleted.

---

## Files

```
index.html     markup and layout
styles.css     design tokens, light + dark themes, responsive panes
app.js         language data, speech in/out, call state machine, history, UI
api/chat.js    serverless LLM proxy — picks a provider from the env, falls through
               a list of model names so a renamed model doesn't break the app
```

No build step, no dependencies, no framework. Deploy by dropping the folder on Vercel
(or `vercel deploy`); the `api/` folder becomes a serverless function automatically.

---

## Known limits

- Speech recognition is Chromium-only (Chrome, Edge, Brave). Safari and Firefox fall back
  to typing mode.
- Indian-language text-to-speech depends on voices installed on the machine. The app says
  which voice it will use under the call controls, and falls back to the nearest match.
- Turn-taking is sequential — the agent finishes speaking before it listens. "Interrupt &
  talk" cuts it off manually.
- Call history is per-browser, since recordings stay on the device.
