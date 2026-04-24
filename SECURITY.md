# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of the AgriTrust AI-Ledger seriously. If you find a security vulnerability, please do not disclose it publicly. Instead, follow these steps:

1. **Email**: Send a detailed report to security@agritrust.com (Mock).
2. **Details**: Include a description of the vulnerability, steps to reproduce, and potential impact.
3. **Response**: We will acknowledge your report within 48 hours.

## Best Practices in this Implementation

- **JWT Secrets**: Ensure the `JWT_SECRET` in `.env` is a high-entropy string in production.
- **Private Keys**: NEVER commit your Ethereum private keys or `.env` files to version control.
- **Data Sanitization**: We use `helmet` and `express.json()` limits to prevent basic XSS and payload attacks.
- **Blockchain Verification**: Always verify contract addresses on Etherscan before interacting in production.
