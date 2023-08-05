var _a;
import browser from 'webextension-polyfill';
function saveOptions(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    browser.storage.sync.set(Object.fromEntries(form.entries()));
}
(_a = document.querySelector('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', saveOptions);
//# sourceMappingURL=index.js.map