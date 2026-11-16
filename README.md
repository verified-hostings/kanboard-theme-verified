# kanboard-theme-verified

Verified Hostings skin for **Kanboard 1.2.x**, delivered as a standard plugin.
Kanboard auto-loads every plugin found in `plugins/` — no activation step.

Re-tokens Kanboard's CSS variables to the verifiedhostings.com palette:
deep-forest header, brand-purple accents and buttons, warm sand surfaces,
Inter body + Fraunces headings.

## Package contents

| Path in repo | Install to | Purpose |
|---|---|---|
| `VerifiedTheme/Plugin.php` | `plugins/VerifiedTheme/Plugin.php` | Registers the stylesheet via `template:layout:css` and the banner script via `template:layout:js` |
| `VerifiedTheme/Assets/css/verified.css` | `plugins/VerifiedTheme/Assets/css/verified.css` | Theme CSS |
| `VerifiedTheme/Assets/js/banner.js` | `plugins/VerifiedTheme/Assets/js/banner.js` | Self-contained "Get yours on Verified Hostings" demo banner (injects styles + markup, dismissal persisted in localStorage) |

## Install

1. Copy `VerifiedTheme/` into the Kanboard `plugins/` directory:
   `plugins/VerifiedTheme/Plugin.php`, `plugins/VerifiedTheme/Assets/css/verified.css`.
2. Done — the plugin loads on the next request (check
   Settings → Plugins to confirm it appears).

## Notes

- No core or template files are touched; removing the plugin folder restores
  the stock look.
- `getCompatibleVersion()` defaults to `APP_VERSION`, so the plugin stays
  active across patch upgrades.
