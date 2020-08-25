import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import user from './modules/user';
import app from "./modules/app";
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    modules: {
        user, app
    },
    getters
});
