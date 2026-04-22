const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

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

const transporter = nodemailer.createTransport({
  host: 'w01f7da9.kasserver.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, service, message } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Pflichtfelder fehlen' });
  }

  // Einfache Validierung gegen Injection
  const safe = (v) => String(v || '').replace(/[\r\n]/g, ' ').slice(0, 500);

  try {
    await transporter.sendMail({
      from: `"HB-Metalle Kontaktformular" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email ? safe(email) : undefined,
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
    console.error('Mailer error:', err.message);
    res.status(500).json({ error: 'Versand fehlgeschlagen' });
  }
});

const PORT = process.env.PORT || 3023;
app.listen(PORT, '127.0.0.1', () => console.log(`Mailer läuft auf Port ${PORT}`));
