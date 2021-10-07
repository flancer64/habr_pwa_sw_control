/**
 * Service Worker functionality controller.
 * Use this object on the front to communicate with Service Worker.
 */
export default class Sw_Control_Front_Model_Sw_Control {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof Sw_Control_Front_Model_Sw_Message_Type} */
        const MSG = spec['Sw_Control_Front_Model_Sw_Message_Type$'];
        /** @type {typeof Sw_Control_Front_Model_Sw_Message_Dto} */
        const Dto = spec['Sw_Control_Front_Model_Sw_Message_Dto#'];

        // DEFINE WORKING VARS / PROPS
        /**
         * Registry for outgoing messages been sent to SW and theirs callbacks.
         * @type {Object<string, function>}
         * @private
         */
        const _queue = {};

        // DEFINE INNER FUNCTIONS
        const generateMsgId = () => `${(new Date()).getTime()}`;

        /**
         * Return SW response (payload) to consumer using callback function from queue.
         * @param {MessageEvent} event
         */
        function onMessage(event) {
            /** @type {Message} */
            const msg = event.data;
            console.log(`[Control]: backward message from SW, type '${msg.type}'.`);
            if (typeof _queue[msg.id] === 'function') _queue[msg.id](msg.payload);
        }

        // DEFINE INSTANCE METHODS
        /**
         * Get state of the service worker.
         * 'true' - 'cat' URL is selected as secondary image, 'false' - 'dog' URL.
         * @return {Promise<boolean>}
         */
        this.getState = function () {
            // generate ID to register data parsing callback
            const id = generateMsgId();
            // create and return new promise
            return new Promise(async (resolve) => {
                // create and register callback to process SW backward message.
                _queue[id] = function (payload) {
                    // return 'boolean' result to caller (see SW code)
                    console.log(`[Control]: payload is returned to caller: ${JSON.stringify(payload)}`);
                    resolve(payload);
                };
                // create new DTO to send data to SW
                const msg = new Dto();
                msg.id = id;
                msg.type = MSG.GET_STATE;
                // send message to SW
                console.log(`[Control]: send message to SW to get current state.`);
                const sw = await navigator.serviceWorker.ready;
                if (sw.active) sw.active.postMessage(msg);
            });
        };

        this.setState = function (replaceWithCat = true) {
            const id = generateMsgId();
            return new Promise(async (resolve) => {
                // create and register callback to process SW backward message.
                _queue[id] = function (payload) {
                    // return 'boolean' result to caller (see SW code)
                    console.log(`[Control]: payload is returned to caller: ${JSON.stringify(payload)}.`);
                    resolve(payload);
                };
                // create new DTO to send data to SW
                const msg = new Dto();
                msg.id = id;
                msg.type = MSG.SET_STATE;
                msg.payload = replaceWithCat;
                // send message to SW
                const logState = (replaceWithCat) ? 'cat' : 'dog';
                console.log(`[Control]: send message to SW to set state: ${logState}.`);
                const sw = await navigator.serviceWorker.ready;
                sw.active.postMessage(msg);
            });
        };

        // MAIN FUNCTIONALITY
        self.navigator.serviceWorker.addEventListener('message', onMessage);
    }

}
