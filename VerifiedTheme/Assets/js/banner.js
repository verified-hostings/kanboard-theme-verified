/*
 * Verified Hostings — demo CTA banner.
 *
 * Injects a thin dismissible bottom bar on every page:
 *   "This is a live demo — Get yours on Verified Hostings →" -> verifiedhostings.com/pricing
 *
 * Self-contained: injects its own <style> + markup on DOMContentLoaded and
 * offsets <body> padding so the fixed bar never covers page content.
 * Dismissal persists per visitor in localStorage.
 *
 * Same file is shipped by kanboard-theme-verified and matomo-verified-banner,
 * and inlined into BookStack/Easy!Appointments template overrides.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'vh-demo-banner-dismissed';
    var HREF = 'https://verifiedhostings.com/pricing';

    try {
        if (window.localStorage && localStorage.getItem(STORAGE_KEY) === '1') {
            return;
        }
    } catch (err) {
        /* storage blocked — show the banner anyway */
    }

    var CSS = [
        '#vh-demo-banner{position:fixed;left:0;right:0;bottom:0;z-index:1040;box-sizing:border-box;',
        'display:flex;align-items:center;justify-content:center;gap:12px;min-height:38px;',
        'padding:7px 46px 7px 16px;color:#eef4ee;text-align:center;',
        'background:linear-gradient(90deg,#0e2417 0%,#14532d 55%,#1a6b3c 100%);',
        'box-shadow:0 -1px 0 rgba(0,0,0,.25),0 -6px 18px rgba(14,36,23,.18);',
        'font:13px/1.45 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}',
        '#vh-demo-banner a{color:#fff;font-weight:600;text-decoration:underline;text-underline-offset:2px;white-space:nowrap}',
        '#vh-demo-banner a:hover{color:#bbf7d0}',
        '#vh-demo-banner .vhb-close{position:absolute;right:8px;top:50%;transform:translateY(-50%);',
        'width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;padding:0;',
        'border:0;border-radius:6px;background:transparent;color:#9db8a6;font-size:20px;line-height:1;cursor:pointer}',
        '#vh-demo-banner .vhb-close:hover{color:#fff;background:rgba(255,255,255,.14)}',
        '@media (max-width:540px){#vh-demo-banner{font-size:12px;padding:7px 40px 7px 12px;gap:8px}}'
    ].join('');

    function mount() {
        if (document.getElementById('vh-demo-banner')) {
            return;
        }

        var style = document.createElement('style');
        style.id = 'vh-demo-banner-style';
        style.textContent = CSS;
        (document.head || document.documentElement).appendChild(style);

        var bar = document.createElement('div');
        bar.id = 'vh-demo-banner';
        bar.setAttribute('role', 'note');
        bar.setAttribute('aria-label', 'Demo notice');
        bar.innerHTML =
            '<span>This is a live demo &mdash; ' +
            '<a href="' + HREF + '" target="_blank" rel="noopener">Get yours on Verified Hostings &rarr;</a>' +
            '</span>' +
            '<button type="button" class="vhb-close" aria-label="Dismiss">&times;</button>';
        document.body.appendChild(bar);

        var basePad = parseFloat(window.getComputedStyle(document.body).paddingBottom) || 0;

        function padBottom() {
            document.body.style.paddingBottom = (basePad + bar.offsetHeight) + 'px';
        }

        function dismiss() {
            window.removeEventListener('resize', padBottom);
            if (bar.parentNode) {
                bar.parentNode.removeChild(bar);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
            document.body.style.paddingBottom = basePad ? basePad + 'px' : '';
            try {
                localStorage.setItem(STORAGE_KEY, '1');
            } catch (err) {}
        }

        padBottom();
        window.addEventListener('resize', padBottom);
        bar.querySelector('.vhb-close').addEventListener('click', dismiss);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
