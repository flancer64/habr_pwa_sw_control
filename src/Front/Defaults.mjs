/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Sw_Control_Front_Defaults {

    NAME = '@flancer64/habr_pwa_sw_control'; // name from NPM package to use as i18next namespace

    // FRONTEND ROUTES
    ROUTE_CFG = '/cfg';
    ROUTE_HOME = '/';

    constructor() {
        Object.freeze(this);
    }
}
