/**
 * Route widget for app home.
 *
 * @namespace Sw_Control_Front_Widget_Home_Route
 */
// MODULE'S VARS
const NS = 'Sw_Control_Front_Widget_Home_Route';
const IMG_CLASS = 'imageToDisplay';
const IMG_SRC_PRIM = './img/horse.svg';
const IMG_SRC_SEC = './img/cat.svg';
const REPLACE_CAT = 'cat';
const REPLACE_DOG = 'dog';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Sw_Control_Front_Widget_Home_Route
 * @returns {Sw_Control_Front_Widget_Home_Route.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Sw_Control_Front_Defaults} */
    const DEF = spec['Sw_Control_Front_Defaults$'];

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div class="q-pa-xs q-gutter-xs">
        <q-card class="bg-white q-pa-xs text-center">
            <div>{{$t('widget.home.title')}}</div>
            <div class="q-gutter-md">
                <q-radio v-model="replace" val="${REPLACE_CAT}" :label="$t('widget.home.replaceCat')"/>
                <q-radio v-model="replace" val="${REPLACE_DOG}" :label="$t('widget.home.replaceDog')"/>
                <q-btn
                        @click="reload"
                        color="primary"
                        :label="btnLabel"
                >
            </div>

        </q-card>
        <q-card class="bg-white q-pa-xs">
            <q-img class="${IMG_CLASS}" :src="url" class="q-mt-md" width="50%" />
        </q-card>
    </div>
</layout-base>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Sw_Control_Front_Widget_Home_Route
     */
    return {
        teq: {package: DEF.NAME},
        name: NS,
        template,
        data: function () {
            return {
                replace: REPLACE_CAT,
                url: IMG_SRC_PRIM,
            };
        },
        computed: {
            btnLabel() {
                return (this.url === IMG_SRC_PRIM)
                    ? this.$t('widget.home.btnReplace')
                    : this.$t('widget.home.btnRestore');
            }
        },
        methods: {
            reload() {
                this.url = (this.url === IMG_SRC_PRIM) ? IMG_SRC_SEC : IMG_SRC_PRIM;
            }
        }
    };
}
