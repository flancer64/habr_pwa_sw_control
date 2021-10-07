/**
 * Route widget for app home.
 *
 * @namespace Sw_Control_Front_Widget_Home_Route
 */
// MODULE'S VARS
const NS = 'Sw_Control_Front_Widget_Home_Route';
const IMG_CLASS = 'imageToDisplay';
const IMG_SRC_PRIM = './img/primary.svg';
const IMG_SRC_SEC = './img/secondary.svg';
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
    /** @type {Sw_Control_Front_Model_Sw_Control} */
    const swControl = spec['Sw_Control_Front_Model_Sw_Control$'];

    // DEFINE WORKING VARS
    const template = `
<layout-base>
    <div class="q-pa-xs q-gutter-xs">
        <q-card class="bg-white q-pa-xs text-center">
            <div>{{$t('widget.home.title')}}</div>
            <div class="q-gutter-md">
                <q-radio val="${REPLACE_CAT}"
                         :disable="!isPrimaryImg"
                         :label="$t('widget.home.replaceCat')"
                         v-model="replace"
                />
                <q-radio v-model="replace"
                         :disable="!isPrimaryImg"
                         val="${REPLACE_DOG}"
                         :label="$t('widget.home.replaceDog')"
                />
                <q-btn
                        @click="reload"
                        color="primary"
                        :label="btnLabel"
                >
            </div>

        </q-card>
        <q-card class="bg-white q-pa-xs">
            <q-img class="${IMG_CLASS}" :src="url" class="q-mt-md" height="200px" fit="scale-down"/>
        </q-card>
        <q-card class="bg-white q-pa-xs">
            <div class="text-center">{{$t('widget.home.loadingTitle')}}</div>
            <pre>{{printLoaded}}</pre>
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
                loaded: [IMG_SRC_PRIM],
                replace: null,
                url: IMG_SRC_PRIM,
            };
        },
        computed: {
            btnLabel() {
                return (this.isPrimaryImg)
                    ? this.$t('widget.home.btnReplace')
                    : this.$t('widget.home.btnRestore');
            },
            isPrimaryImg() {
                return (this.url === IMG_SRC_PRIM);
            },
            printLoaded() {
                return this.loaded.join('\n');
            },
            useCat() {
                return (this.replace === REPLACE_CAT);
            }
        },
        methods: {
            async reload() {
                this.url = (this.url === IMG_SRC_PRIM) ? IMG_SRC_SEC : IMG_SRC_PRIM;
                this.loaded.unshift(this.url);
            }
        },
        watch: {
            async replace(now, old) {
                if ((old !== null) && (old !== now)) {
                    console.log(`[App]: set SW state to: ${now}.`);
                    const res = await swControl.setState(now === REPLACE_CAT);
                    console.log(`[App]: service worker state modification result: ${res}.`);
                }
            }
        },
        async mounted() {
            const res = await swControl.getState();
            this.replace = (res) ? REPLACE_CAT : REPLACE_DOG;
            console.log(`[App]: current SW state: ${this.replace}.`);
        },
    };
}
