/**
 * Language switch widget.
 *
 * @namespace Sw_Control_Front_Layout_Lang
 */
// MODULE'S VARS
const NS = 'Sw_Control_Front_Layout_Lang';
const LANG_EN = 'en';
const LANG_RU = 'ru';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Sw_Control_Front_Layout_Lang
 * @returns {Sw_Control_Front_Layout_Lang.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Sw_Control_Front_Defaults} */
    const DEF = spec['Sw_Control_Front_Defaults$'];
    /** @type {TeqFw_I18n_Front_Lib} */
    const i18n = spec['TeqFw_I18n_Front_Lib$'];
    /** @type {Sw_Control_Front_Model_Lang} */
    const modLang = spec['Sw_Control_Front_Model_Lang$'];

    // DEFINE WORKING VARS
    const template = `
<q-btn flat :label="langLabel" @click="switchLang" />
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Sw_Control_Front_Layout_Lang
     */
    return {
        teq: {package: DEF.NAME},
        name: NS,
        template,
        data() {
            return {
                fldLang: null,
            };
        },
        computed: {
            langLabel() {
                return (this.fldLang === LANG_EN) ? LANG_RU : LANG_EN;
            }
        },
        methods: {
            switchLang() {
                this.fldLang = (this.fldLang === LANG_EN) ? LANG_RU : LANG_EN;
                i18n.getI18n().changeLanguage(this.fldLang);
                // increment lang counter to refresh all components starting from base layout
                const lang = modLang.getData();
                lang.value++;
            }
        },
        mounted() {
            this.fldLang = i18n.getLang();
        },
    };
}

