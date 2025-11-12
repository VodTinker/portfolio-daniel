# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently, the following versions are supported:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The VodTinker Portfolio team takes the security of our software seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- **Email**: [danielfonov71@vodtinker.dev](mailto:danielfonov71@vodtinker.dev)
- **Subject**: "Security Vulnerability Report - VodTinker Portfolio"

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information (as much as you can provide) to help us better understand the nature and scope of the possible issue:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

### Disclosure Policy

When the security team receives a security bug report, they will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

1. **Confirm the problem** and determine the affected versions
2. **Audit code** to find any potential similar problems
3. **Prepare fixes** for all releases still under maintenance
4. **Release new security fix** versions as soon as possible

### Comments on This Policy

If you have suggestions on how this process could be improved, please submit a pull request.

## Security Best Practices

When using this portfolio template, we recommend the following security practices:

### Environment Variables

- **Never commit** `.env` files to your repository
- Use `.env.example` as a template
- Store sensitive keys (API keys, tokens) in environment variables
- Use different keys for development and production
- Rotate API keys regularly

### Dependencies

- Keep all dependencies up to date
- Run `npm audit` regularly to check for vulnerabilities
- Review dependency updates before applying them
- Use tools like Dependabot to automate security updates

### API Keys

- Restrict API keys to specific domains when possible
- Use separate keys for development and production
- Monitor API usage for unusual activity
- Revoke and rotate keys if compromised

### Cloudflare Functions

- Validate all user input
- Implement rate limiting
- Use CORS properly to restrict access
- Never expose sensitive data in responses
- Log security-relevant events

### Client-Side Security

- Sanitize user input before rendering
- Use Content Security Policy (CSP) headers
- Implement HTTPS in production
- Validate data before sending to APIs
- Never store sensitive data in localStorage

## Known Security Considerations

### OpenAI API Key

The OpenAI API key is used server-side in Cloudflare Functions. Never expose this key to the client-side code.

### EmailJS

EmailJS credentials can be visible in client-side code but are protected by:
- Domain whitelist in EmailJS dashboard
- Rate limiting
- Template restrictions

We recommend:
- Configuring allowed domains in EmailJS dashboard
- Enabling reCAPTCHA for form submissions
- Monitoring usage regularly

## Security Updates

We will announce security updates through:
- GitHub Security Advisories
- Release notes
- README updates
- Email notifications (if you've provided contact info)

## Acknowledgments

We appreciate the security research community and acknowledge responsible disclosures. Contributors who report valid security issues may be recognized (with permission) in:
- Our README
- Release notes
- A dedicated security.txt file

## Contact

For any security-related questions or concerns:
- Email: [danielfonov71@vodtinker.dev](mailto:danielfonov71@vodtinker.dev)
- GitHub: [@VodTinker](https://github.com/VodTinker)

---

Thank you for helping keep VodTinker Portfolio and its users safe!
