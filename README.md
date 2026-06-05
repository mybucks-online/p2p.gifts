# p2p.gifts

Browser-only gifting tool: create a disposable crypto gift wallet, fund it, and download a unique gift card with a QR code that opens the gift wallet so the recipient can claim the funds.

## mybucks.online

**p2p.gifts** is built on top of [mybucks.online](https://mybucks.online) project — a seedless, disposable, self-custodial , browser-side wallet platform.

Wallet keys are derived entirely in the browser: **Scrypt** (KDF) turns a **passphrase and PIN** into a private key deterministically. There is no seed phrase, no backend, and nothing stored on a server.

A **gifting link** encodes the passphrase and PIN in the URL **hash fragment** (`#wallet=...`). Anyone who opens that link in [app.mybucks.online](https://app.mybucks.online) can access the same wallet and move the funds — full ownership transfer through a shareable URL.

The main idea behind [mybucks.online](https://mybucks.online) and **p2p.gifts** is **“Send the wallet, not just coins.”** For gifting or airdropping, you do not need to ask the recipient to install a wallet app, set up a seed phrase, or share a wallet address. Create a wallet, fund it, and send the wallet itself.

## Properties

- No signup
- No app install
- Zero footprint (browser-only, nothing stored)
- Classic themes, custom backgrounds, and Markdown gift notes

## Flow

1. **Welcome** — landing screen
2. **Create wallet** — passphrase + PIN (auto-generated)
3. **Fund** — send crypto to the gift wallet address
4. **Gift card** — pick a style, optional note, download PNG or copy the gifting link

Send the card by DM or email. Receivers scan the QR and claim on [app.mybucks.online](https://app.mybucks.online) — no signup, no app install.

## Screenshots

1. Welcome — ![Welcome](screenshots/1.welcome.png)
2. Secure your gift wallet — ![Create wallet](screenshots/2.secure-your-gift-wallet.png)
3. Fund your gift wallet — ![Fund](screenshots/3.fund-your-gift-wallet.png)
4. Generate gift card — ![Gift card](screenshots/4.generate-gift-card.png)

## Stack

- React + Vite, styled-components
- Wallet/crypto: [`@mybucks.online/core`](https://www.npmjs.com/package/@mybucks.online/core)
- Source alias: `@p2p-gifts/` → `src/`

## Run locally

```bash
yarn install
yarn dev
```

```bash
yarn build
```

### Umami analytics

Production builds set `VITE_UMAMI_WEBSITE_ID` at build time; Vite substitutes it into `index.html` for the Umami script tag (page views only; no wallet credentials). CSP allows `https://cloud.umami.is` in `index.html`.

**GitHub Actions:** add repository secret `VITE_UMAMI_WEBSITE_ID` (your Umami website UUID).

**Local:** copy `.env.example` to `.env.local` and set `VITE_UMAMI_WEBSITE_ID`, then `yarn build` and inspect `dist/index.html`.

## Links

- [p2p.gifts](https://p2p.gifts) · [mybucks.online](https://mybucks.online) · [Docs](https://docs.mybucks.online/p2p.gifts/how-it-works) · [X](https://x.com/mybucks_online)

## License

MIT — see [LICENSE](LICENSE).

## Disclaimer

**p2p.gifts** is for micro-gifts only. Do not fund gift wallets with large amounts.

**p2p.gifts** and its developers are not responsible for any loss of funds in a gift wallet — including from not keeping your passphrase and PIN safe, or from sharing the gift card or gifting link in insecure places.

There is no reset or recovery. If you refresh or close the browser before you download the gift card or back up the gifting link, you may lose access to the wallet — that is your responsibility.
