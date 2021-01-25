import Vue from 'vue';
import VueRresource from 'vue-resource';

import './style.scss';

import MovieList from './Components/MovieList.vue';
import MovieFilter from './Components/MovieFilter.vue';

Vue.use(VueRresource); 

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get () { return this.$root.moment }});

new Vue({
    el: "#app",
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment()
    },
    methods: {
        checkFilter(category, title, checked) {
            if(checked) {
                this[category].push(title);
            } else {
                const index = this[category].indexOf(title);
                if (index > -1) {
                    this[category].splice(index, 1);
                }
            }
        }
    },   
    components: {
        MovieList,
        MovieFilter,
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        })
    } 
})