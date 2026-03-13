/**
 * POST /api/contact
 * Validates and processes a contact form submission
 */
const submitContact = (req, res) => {
  const { name, email, message, company } = req.body;

  // ─── Validation ────────────────────────────────────────────────────────────
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('A valid email address is required.');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // ─── Log the enquiry ───────────────────────────────────────────────────────
  console.log('\n📨 New Contact Enquiry:');
  console.log(`   Name:    ${name.trim()}`);
  console.log(`   Email:   ${email.trim()}`);
  if (company) console.log(`   Company: ${company.trim()}`);
  console.log(`   Message: ${message.trim().substring(0, 80)}...`);
  console.log(`   Time:    ${new Date().toISOString()}\n`);

  // In production you'd send an email here (e.g. via Resend / SendGrid)
  res.status(200).json({
    success: true,
    message: "Thanks for reaching out! We'll get back to you within 24 hours.",
  });
};

module.exports = { submitContact };
