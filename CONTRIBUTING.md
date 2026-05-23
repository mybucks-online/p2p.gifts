# Contributing to p2p.gifts

Thank you for helping improve **p2p.gifts** — the browser-only gift-card wizard ([p2p.gifts](https://p2p.gifts)), powered by [mybucks.online](https://mybucks.online) wallet tech.

## Security & privacy (non-negotiable)

These rules come from the mybucks.online architecture and apply here too:

- **Never log, transmit, or persist credentials** — passphrase and PIN are transient in the browser only (no localStorage, no backend).
- **Vet new dependencies** — prefer small, well-known packages; call out new deps in your PR.
- **No user activity tracking** in the app.

## Development

```bash
yarn install
yarn dev
```

- Use the `@p2p-gifts/` import alias for `src/` paths.
- Match existing patterns (styled-components, wizard steps in `src/pages/`).
- Run `yarn build` before opening a PR when you touch UI or bundling.

## Pull requests

- Branch from the latest default branch.
- Clear title and description; link related issues when applicable.
- Short, descriptive commits (e.g. `Fix: gift card export scale on mobile`).
- Expect review for security, UX flow (Welcome → Create → Fund → Gift card), and browser behavior.

## Questions

- [README](README.md) — overview and local setup
- [Docs](https://docs.mybucks.online) — wallet and security background
- [X](https://x.com/mybucks_online) · [Telegram](https://t.me/mybucks_online) · [GitHub](https://github.com/mybucks-online/p2p.gifts)
- contact@mybucks.online
