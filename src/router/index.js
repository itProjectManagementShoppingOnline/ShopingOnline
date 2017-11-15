import Vue from 'vue';
import Router from 'vue-router';
import Course from '@/views/Course';
import FrontIndex from '@/views/front/index';
import Signin from '@/views/front/signin';
import Signup from '@/views/front/signup';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/course',
      name: 'Course',
      component: Course,
    }, {
      path: '/',
      name: 'FrontIndex',
      redirect: '/items/allProducts/1',
    }, {
    //   path: '/items/:type',
    //   redirect: '/items/:type/1',
    // }, {
      path: '/items/:type/:page',
      name: 'Items',
      component: FrontIndex,
    }, {
    //   path: '/',
    //   name: 'FrontIndex',
    //   component: FrontIndex,
    // }, {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
  ],
});
