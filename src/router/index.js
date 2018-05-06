import Vue from 'vue';
import Router from 'vue-router';
import Management from '@/views/management/Index';
import Clients from '@/views/management/client/Index';
import Users from '@/views/management/user/Index';
import Activitys from '@/views/management/activity/Index';
import Courses from '@/views/management/course/Index';
import Learncircle from '@/views/management/course/Learncircle';
import Discussion from '@/views/management/course/Discussion';
import Reply from '@/views/management/course/Reply';
import Signin from '@/views/user/Signin';
import UserManage from '@/views/admin/userManage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Management,
      redirect: '/client/list',
      children: [
        {
          path: '/client/list',
          name: 'Clients',
          component: Clients,
        }, {
          path: '/user/list',
          name: 'Users',
          component: Users,
        }, {
          path: '/activity/list',
          name: 'Activitys',
          component: Activitys,
        }, {
          path: '/course/list',
          name: 'Courses',
          component: Courses,
        }, {
          path: '/learncircle/list',
          name: 'Learncircles',
          component: Learncircle,
        }, {
          path: '/discussion/list',
          name: 'Discussions',
          component: Discussion,
        }, {
          path: '/reply/list',
          name: 'Replys',
          component: Reply,
        },
      ],
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    }, {
      path: '/admin/manage/user',
      name: 'UserManage',
      component: UserManage,
    },
  ],
});
