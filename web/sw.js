// DEFINE WORKING VARS / PROPS
const CACHE_STATIC = 'sw-static-cache-v1';
const URL_CAT = '/img/cat.svg';
const URL_DOG = '/img/dog.svg';
const URL_PRIMARY = '/img/primary.svg';
const URL_SECONDARY = '/img/secondary.svg'; // this is virtual URL that is mapped to real URL (dog or cat)

let _useCat = true; // SW state to replace virtual URL

// DEFINE INNER FUNCTIONS

/**
 * Send message to `index.html` to start bootstrap process after installation process been completed.
 */
function onActivate() {
    self.clients.claim();
}

/**
 * Replace secondary URL with 'cat' or 'dog' URL.
 * @param event
 */
function onFetch(event) {
    const url = new URL(event.request.url);
    if (url.origin === location.origin && url.pathname === URL_SECONDARY) {
        if (_useCat) {
            event.respondWith(caches.match(URL_CAT));
        } else {
            event.respondWith(caches.match(URL_DOG));
        }

    }
}

/**
 * Load images to the cache storage.
 * @param event
 */
function onInstall(event) {
    // DEFINE INNER FUNCTIONS
    async function cacheStatics() {
        try {
            const files = [URL_CAT, URL_DOG, URL_PRIMARY];
            const cacheStat = await caches.open(CACHE_STATIC);
            await cacheStat.addAll(files);
        } catch (e) {
            console.log('[SW] install error: ');
            console.dir(e);
        }
    }

    // MAIN FUNCTIONALITY
    event.waitUntil(cacheStatics());
}

/**
 * Get messages from app and change internal state.
 * @param {MessageEvent} event
 */
function onMessage(event) {
    // get incoming data
    /** @type {Sw_Control_Front_Model_Sw_Message_Dto} */
    const msg = event.data;
    console.log(`[SW]: new message is received, type: ${msg.type}`);
    // create outgoing data
    /** @type {Sw_Control_Front_Model_Sw_Message_Dto} */
    const res = {};
    res.id = msg.id;
    res.type = msg.type;
    // analyze type of the message, perform requested operation and set outgoing data
    if (msg.type === 'get_state') {
        res.payload = _useCat;
    } else if (msg.type === 'set_state') {
        const useCat = msg.payload;
        if (useCat !== _useCat) {
            // change state
            _useCat = useCat;
            res.payload = true;
        } else {
            // we don't change anything
            res.payload = false;
        }
    }
    console.log(`[SW]: send backward message, type: ${msg.type}`);
    event.source.postMessage(res);
}

// MAIN FUNCTIONALITY
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
self.addEventListener('install', onInstall);
self.addEventListener('message', onMessage);
