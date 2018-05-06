import Vue from 'vue';
import Router from 'vue-router';
import Management from '@/views/management/Index';
import ClientsList from '@/views/management/ClientsList';
import Signup from '@/views/user/signup';
import Signin from '@/views/user/signin';
import UserManage from '@/views/admin/userManage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Management,
      redirect: '/clientlist',
      children: [
        {
          path: '/clientlist',
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
