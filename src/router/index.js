import Vue from 'vue';
import Router from 'vue-router';
import Course from '@/views/Course';
import FrontIndex from '@/views/front/index';
import Signup from '@/views/front/signup';
import Signin from '@/views/front/signin';

import AdminSignin from '@/views/admin/signin';
import AdminIndex from '@/views/admin/index';
import OnSaleManage from '@/views/admin/onSaleManage';
import UploadManage from '@/views/admin/uploadManage';
import UserManage from '@/views/admin/userManage';

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
      path: '/admin',
      name: 'AdminIndex',
      component: AdminIndex,
    }, {
      path: '/admin/manage/onsale',
      name: 'OnSaleManage',
      component: OnSaleManage,
    }, {
      path: '/admin/manage/upitem',
      name: 'UploadManage',
      component: UploadManage,
    }, {
      path: '/admin/manage/user',
      name: 'UserManage',
      component: UserManage,
    }, {
      path: '/usercenter',
      name: 'UserCenter',
      component: Signup,
    },
  ],
});
