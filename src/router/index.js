import Vue from 'vue';
import Router from 'vue-router';
import Course from '@/views/Course';
import FrontIndex from '@/views/front/index';
import Signup from '@/views/front/signup';
import Signin from '@/views/front/signin';

import AdminSignin from '@/views/admin/signin';

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
      path: '/items/:type/:page',
      name: 'Items',
      component: FrontIndex,
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    }, {
      path: '/adminsignin',
      name: 'AdminSignin',
      component: AdminSignin,
    }, {
      path: '/usercenter',
      name: 'UserCenter',
      component: Signup,
    },
  ],
});
