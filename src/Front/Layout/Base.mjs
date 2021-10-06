/**
 * Base layout widget.
 *
 * @namespace Sw_Control_Front_Layout_Base
 */
// MODULE'S VARS
const NS = 'Sw_Control_Front_Layout_Base';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Sw_Control_Front_Layout_Base
 * @returns {Sw_Control_Front_Layout_Base.vueCompTmpl}
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Sw_Control_Front_Defaults} */
    const DEF = spec['Sw_Control_Front_Defaults$'];
    /** @type {Sw_Control_Front_Layout_Lang.vueCompTmpl} */
    const lang = spec['Sw_Control_Front_Layout_Lang$'];
    /** @type {Sw_Control_Front_Model_Lang} */
    const modLang = spec['Sw_Control_Front_Model_Lang$'];

    // DEFINE WORKING VARS
    const template = `
<q-layout view="hHh lpR fFf" :key="langChange">

    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-avatar v-on:click="$router.push('${DEF.ROUTE_HOME}')">
                <img src="./img/favicon-192.png" alt="logo">
            </q-avatar>

            <q-toolbar-title class="text-center">{{$t('base.title')}}</q-toolbar-title>

            <lang/>
        </q-toolbar>
    </q-header>

    <q-page-container>
        <div class="pageFrame">
            <slot/>
        </div>
    </q-page-container>

</q-layout>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Sw_Control_Front_Layout_Base
     */
    return {
        teq: {package: DEF.NAME},
        name: NS,
        template,
        components: {lang},
        setup() {
            return {langChange: modLang.getData()};
        }
    };
}

// to get namespace on debug
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
