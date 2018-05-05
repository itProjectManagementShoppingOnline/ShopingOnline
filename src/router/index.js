import Vue from 'vue';
import Router from 'vue-router';
import UserManagement from '@/views/userManagement/Index';
import ClientsList from '@/views/userManagement/ClientsList';
import Signup from '@/views/user/signup';
import Signin from '@/views/user/signin';
import UserManage from '@/views/admin/userManage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/usermanagement',
    }, {
      path: '/usermanagement',
      name: 'UserManagement',
      component: UserManagement,
      redirect: '/usermanagement/clientlist',
      children: [
        {
          path: '/usermanagement/clientlist',
          name: 'ClientsList',
          component: ClientsList,
        },
      ],
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    }, {
      path: '/admin/manage/user',
      name: 'UserManage',
      component: UserManage,
    },
  ],
});
