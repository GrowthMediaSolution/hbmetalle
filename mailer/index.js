const express = require('express');
const { Resend } = require('resend');

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGIN = 'https://hb-metalle.de';

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === ALLOWED_ORIGIN || origin === 'https://www.hb-metalle.de') {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, service, message } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Pflichtfelder fehlen' });
  }

  const safe = (v) => String(v || '').replace(/[<>]/g, '').slice(0, 500);

  try {
    await resend.emails.send({
      from: 'HB-Metalle Kontaktformular <onboarding@resend.dev>',
      to: 'info@hb-metalle.de',
      reply_to: email ? safe(email) : undefined,
      subject: `Neue Anfrage: ${safe(service)} von ${safe(name)}`,
      text: [
        `Name:     ${safe(name)}`,
        `Telefon:  ${safe(phone)}`,
        `E-Mail:   ${safe(email)}`,
        `Leistung: ${safe(service)}`,
        `Nachricht:\n${safe(message)}`,
      ].join('\n'),
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err.message);
    res.status(500).json({ error: 'Versand fehlgeschlagen' });
  }
});

const PORT = process.env.PORT || 3024;
app.listen(PORT, '127.0.0.1', () => console.log(`Mailer läuft auf Port ${PORT}`));
