/**
 * Model for language switcher.
 */
export default class Sw_Control_Front_Model_Lang {
    #data;

    constructor(spec) {
        /** @type {TeqFw_Vue_Front_Lib} */
        const VueLib = spec['TeqFw_Vue_Front_Lib$'];
        this.#data = VueLib.getVue().ref(0);
    }

    getData() {
        return this.#data;
    }
}
