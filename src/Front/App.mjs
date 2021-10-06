/**
 * Web application.
 *
 * Load config and i18n dictionary from server, initialize Vue (add router, Quasar UI, i18next),
 * create and mount root vue component.
 */
// MODULE'S VARS
const NS = 'Sw_Control_Front_App';

export default class Sw_Control_Front_App {
    /** @type {Sw_Control_Front_Defaults} */
    #DEF;
    /** @type {TeqFw_Di_Shared_Container} */
    #container;
    /** @type {TeqFw_Web_Front_Model_Config} */
    #config;
    /** @type {TeqFw_I18n_Front_Lib} */
    #I18nLib;
    /** @type {TeqFw_Vue_Front_Lib} */
    #VueLib;
    /** @type {TeqFw_Ui_Quasar_Front_Lib} */
    #QuasarLib;
    /** @type {Sw_Control_Front_Layout_Base} */
    #layoutBase;
    #root; // root vue component for the application

    constructor(spec) {
        this.#config = spec['TeqFw_Web_Front_Model_Config$'];
        this.#container = spec['TeqFw_Di_Shared_Container$'];
        this.#DEF = spec['Sw_Control_Front_Defaults$'];
        this.#I18nLib = spec['TeqFw_I18n_Front_Lib$'];
        this.#layoutBase = spec['Sw_Control_Front_Layout_Base$'];
        this.#QuasarLib = spec['TeqFw_Ui_Quasar_Front_Lib$'];
        this.#VueLib = spec['TeqFw_Vue_Front_Lib$'];
    }

    /**
     * Initialize application.
     *
     * @return {Promise<void>}
     */
    async init() {
        // DEFINE INNER FUNCTIONS

        /**
         * Setup working languages and fallback language and add translation function to the Vue.
         *
         * @param {Object} app
         * @param {TeqFw_I18n_Front_Lib} I18nLib
         * @return {Promise<void>}
         * @memberOf Sw_Control_Front_App.init
         */
        async function initI18n(app, I18nLib) {
            await I18nLib.init(['en', 'ru'], 'en');
            const appProps = app.config.globalProperties;
            const i18n = I18nLib.getI18n();
            // add translation function to Vue
            appProps.$t = function (key, options) {
                // add package name if namespace is omitted in the key
                const ns = this.$options.teq?.package;
                if (ns && key.indexOf(':') <= 0) key = `${ns}:${key}`;
                return i18n.t(key, options);
            }
        }

        function initQuasarUi(app, QuasarLib) {
            const quasar = QuasarLib.getQuasar()
            app.use(quasar, {config: {}});
            quasar.iconSet.set(quasar.iconSet.svgMaterialIcons);
        }

        function initRouter(app, VueLib, DEF, container) {
            /** @type {{createRouter, createWebHashHistory}} */
            const Router = VueLib.getRouter();
            /** @type {{addRoute}} */
            const router = Router.createRouter({
                history: Router.createWebHashHistory(),
                routes: [],
            });
            // setup application routes (load es6-module on demand with DI-container)
            router.addRoute({
                path: DEF.ROUTE_HOME,
                component: () => container.get('Sw_Control_Front_Widget_Home_Route$')
            });
            //
            app.use(router);
        }

        // MAIN FUNCTIONALITY

        // create root vue component
        /** @type {{createApp}} */
        const Vue = this.#VueLib.getVue();
        this.#root = Vue.createApp({
            teq: {package: this.#DEF.NAME},
            name: NS,
            template: '<router-view/>',
        });
        // ... and add global available components
        this.#root.component('LayoutBase', this.#layoutBase);

        // other initialization
        await this.#config.init({}); // this app has no separate 'doors' (entry points)
        await initI18n(this.#root, this.#I18nLib);
        initQuasarUi(this.#root, this.#QuasarLib);
        initRouter(this.#root, this.#VueLib, this.#DEF, this.#container);
    }

    /**
     * Mount root vue component of the application to DOM element.
     *
     * @see https://v3.vuejs.org/api/application-api.html#mount
     *
     * @param {Element|string} elRoot
     * @return {Object} the root component instance
     */
    mount(elRoot) {
        return this.#root.mount(elRoot);
    }
}
