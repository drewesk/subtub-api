# 📦 SubTub API

A lightweight subscription-tracking API built with **Express.js**, featuring CRUD operations and RESTful principles.

---

## 🛠 Features

- Full **CRUD** support for user subscriptions
- RESTful routes with clear controller separation
- Built on a foundational tutorial by [Adrian (JS Mastery)](https://github.com/adrianhajdin)
- Custom **Admin authorization scope** for privileged operations
- **Arcjet integration** to rate-limit, detect bots, and block brute-force attacks
- Scheduled email reminders powered by **Upstash QStash**
- Mongoose models for clean MongoDB interaction

---

## 🔐 Admin Authorization

Includes a scoped `ADMIN_TOKEN` environment variable and middleware to guard sensitive routes — enabling elevated admin privileges beyond standard user auth.

---

## 🛡 Arcjet Protection

Arcjet middleware is enabled to:
- Detect malicious actors
- Block excessive or abusive requests
- Automatically mitigate common brute-force patterns

---

## 🌍 Open Source

This project is open source and maintained for educational and collaborative use. Contributions, forks, and suggestions are welcome!

> MIT License • Built with ❤️ by [Drewesk](https://github.com/drewesk)
