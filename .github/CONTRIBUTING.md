# Contributing to vLite

Thanks for your interest in contributing.

vLite is intentionally designed to stay **small, fast, and maintainable**.
This guide defines how contributions are evaluated.

---

## 🎯 Project philosophy

vLite follows a strict design philosophy:

- Minimalism over feature completeness
- Performance over abstraction
- Stability over rapid feature growth
- Extensibility through plugins and providers

The goal is **not** to accumulate features in the core over time.
Many features that seem useful belong in plugins instead.

---

## 🧱 Architecture guidelines

Before contributing, make sure your change fits the architecture:

- The **core must remain minimal**
- Features should be implemented as **plugins whenever possible**
- Providers must stay **isolated and modular**
- Avoid adding logic to the core if it can live elsewhere

> [!WARNING]
> Changes that increase core complexity without strong justification will be rejected.

---

## ⚡ Performance guidelines

vLite is designed to be extremely lightweight.

- Avoid adding dependencies
- Keep bundle size minimal
- Prefer native browser APIs
- Any size or complexity increase must be justified

> [!WARNING]
> Contributions that significantly impact bundle size or performance will likely be rejected.

---

## 🐛 Reporting bugs

Use the provided bug report template.

A valid report includes:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Minimal reproduction when possible

Incomplete reports may be closed.

---

## 🚀 Suggesting features

Use the feature request template.

Before submitting a feature:

- Does it align with the project philosophy?
- Can it be implemented as a plugin?
- Is the benefit worth the added complexity?

Feature requests without clear use cases or justification are unlikely to be accepted.

---

## 🔄 Contribution workflow

For non-trivial changes:

1. Open an issue
2. Discuss the approach
3. Submit a pull request

> [!NOTE]
> Large or complex changes without prior discussion may be closed.

---

## 🔀 Pull requests

Pull requests must follow the provided template.

A valid PR includes:

- Clear problem description
- Concise summary of changes
- Steps to test
- Identified risks or side effects

PRs that do not meet these requirements may be closed.

---

## 🧪 Testing

The project relies on **end-to-end tests (Playwright)**.

- Ensure existing tests pass
- Add or update tests when behavior changes
- Manually verify changes when needed

---

## ⚠️ Breaking changes

Breaking changes must:

- Be clearly described
- Be justified
- Be discussed beforehand when possible

---

## 🤖 AI-generated code

AI-assisted contributions are allowed.

- You are fully responsible for the submitted code
- You must review and validate it
- Poorly understood or unverified code will be rejected

---

## 🚫 What is not accepted

- Features that bloat the core unnecessarily
- Changes that ignore the plugin architecture
- Large PRs without prior discussion
- Unclear issues or feature requests without use cases
- Code that degrades performance without justification

---

## 🧠 Final note

vLite has a clear direction.

Contributions are welcome, but they must align with the project's principles.
