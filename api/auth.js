export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password } = req.body;

  if (password === process.env.SITE_PASSWORD) {
    const token = process.env.SESSION_TOKEN;
    res.setHeader(
      'Set-Cookie',
      `mt_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000`
    );
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ ok: false });
}
