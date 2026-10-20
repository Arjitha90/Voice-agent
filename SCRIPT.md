# Demo video script — Vaanee AI Voice Sales Agent

Target length: **3 to 4 minutes**. The brief asks for a working voice conversation, live
chat, recording, AI summary and sales status, so the call itself is the centre of the
video — don't rush it to fit more talking in.

---

## Before you hit record

- **Do one throwaway call first.** Call history is empty on a fresh browser, and an empty
  panel is a weak ending. One prior call means you have something real to open at the end.
- **Speakers on, headphones off.** The mic also captures the agent's voice, so the
  recording you play back has both sides. With headphones you'll only hear yourself.
- **Hard refresh** (Ctrl+Shift+R) and check Campaign → Settings is not red.
- **Close other tabs** and silence notifications. Chrome, maximised, one window.
- **Don't show the API key on screen.** Don't open Vercel settings, and scroll past the
  Settings card rather than pausing on it.
- Record with OBS, or Windows **Win+Alt+R** (Game Bar). Capture system audio and mic.
- Rehearse your customer lines once. You are playing the prospect, and the agent reacts to
  what you actually say, so unscripted mumbling makes a weak demo.

---

## 0:00 – 0:20 · What this is

> *Screen: the live site, full window, nothing clicked yet.*

"This is Vaanee, an AI voice sales agent. It makes a real voice call to a customer — it
talks, it listens, it answers questions and it tries to close. Everything you see is
happening live in the browser. Let me show you a full call from start to finish."

---

## 0:20 – 0:50 · It sells any SaaS product

> *Screen: scroll the Campaign pane. Point at the fields as you name them.*

"The left pane is the campaign. This is what makes it work for any SaaS product — the
agent isn't hard-coded to one script. You give it the product name, the one-line pitch,
what it does, the features, the pricing, the ideal customer, and the objections you expect
to hear. All of that gets built into the agent's instructions for the call."

> *Open the preset dropdown, show the three products, pick LedgerLite. Then open the
> Language dropdown and scroll it so all seven are visible.*

"I've loaded a sample — LedgerLite, an accounting tool for Indian small businesses. And it
can run the call in English, Hindi, Telugu, Tamil, Kannada, Marathi or Hinglish. I'll do
this one in English."

---

## 0:50 – 1:05 · Consent

> *Click Start call. Let the consent dialog sit on screen for a beat.*

"Before anything records, there's a consent gate — you have to agree that the call is being
recorded and transcribed. And the agent also says it out loud at the start of the call, in
whatever language the call is running in."

> *Tick the box, click Agree & start call, allow the mic if Chrome asks.*

---

## 1:05 – 2:10 · The call — this is the main part

> *Let it run. Don't narrate over the agent. Let the viewer hear it speak and watch the
> text appear.*

The agent greets you and discloses the recording. Then have a real conversation. Aim for
**four or five exchanges** that each show something different:

| Your line | What it demonstrates |
|---|---|
| "Yes, I have a couple of minutes." | It handles the opening and moves to discovery |
| "I run a trading business, about 20 staff. My accountant does everything in Tally right now." | It picks up the situation and pitches a *relevant* feature, not a feature list |
| "Honestly it sounds expensive. What does it cost?" | **Objection handling** — it answers from the pricing in the brief |
| "How is this different from what Tally already does?" | A second objection, answered from the brief |
| "Okay, can you show me a demo next week?" | A clear commitment, which drives the final status |

> *While it's running, point your cursor at — but keep talking to a minimum:*
> - the status pill cycling Listening → Thinking → Agent speaking
> - your own words appearing as you speak
> - the timer and the REC indicator
> - the mic level bar moving

A sentence or two over the top is enough:

"You can see my speech appearing as text while I talk, the agent's reply typing out in time
with its voice, the call timer, and the status up here showing whether it's listening,
thinking or speaking."

---

## 2:10 – 2:45 · End the call → summary and status

> *Click End call. Wait for the analysis — a few seconds. Don't cut this; the wait is short
> and the payoff is the point.*

"When I hang up, the whole transcript goes to the model and it writes up the call."

> *The detail panel opens on its own. Walk down it slowly.*

"It gives a summary of what happened, what the customer actually needs, every objection
that was raised, the next steps for the sales team — and the sales status. This one came
back as Demo Requested, with the reason, and an interest score."

> *Say the status out loud and name the others:*

"The statuses it chooses from are Converted, Interested, Demo Requested, Follow-up
Required, Not Interested, and No Response — and it's assigned automatically from the
transcript, not by me."

---

## 2:45 – 3:10 · Recording and history

> *Scroll to the Recording player in the same panel. Press play. Let 5–8 seconds of real
> audio run — this is proof the recording works.*

"The call recording is saved and plays back here, and you can download it."

> *Close the panel. Click into Call history on the right. Show the list, open the earlier
> call.*

"Every call is stored with its recording, full transcript, summary and status, so you can
come back to any of them."

---

## 3:10 – 3:40 · How it works, briefly

> *Screen: stay on the app, or show the project folder.*

"Quickly, under the hood. Speech recognition in the browser turns what I say into text. That
goes with the full conversation so far to a serverless function on Vercel, which calls
Gemini with the product brief as the agent's instructions. The reply comes back and the
browser speaks it. Meanwhile the microphone is being recorded to a file stored on the
device. When the call ends, the transcript goes back to the model one more time with a
fixed JSON format to produce the summary and pick the status. The API key lives on the
server, so it's never exposed in the browser."

---

## 3:40 · Close

"That's a complete call — live voice both ways, live transcript, a saved recording, an
automatic summary and an automatic sales status. The link is in the submission. Thank you."

---

## If something goes wrong mid-recording

- **Agent doesn't reply** → the key isn't saved. Stop, fix it, restart the recording.
- **It mishears you badly** → speak a bit slower and closer to the mic. One garbled line is
  fine to leave in; the agent asks you to repeat, which actually looks good.
- **Long pause before a reply** → normal, usually a second or two. Don't fill it with "um" —
  just wait.
- **It talks over you** → use "Interrupt & talk" and carry on.
