import router from './router';
import store from './store';

import { getToken } from './utils/auth'; // 验权

router.beforeEach((to, from, next) => {
  // 页面权限
  const pathRoot = to.fullPath.split('/')[1];
  // alert(to.fullPath);
  const userPermission = ['usercenter'];
  const adminPermission = ['admin'];
  if (userPermission.indexOf(pathRoot) !== -1 || adminPermission.indexOf(pathRoot) !== -1) {
    const token = getToken();
    // alert(token);
    // alert(token);
    if (!token) {
      next({ path: '/signin' });
      return false;
    }
    store.dispatch('user.index/getUserInfo', token).then((res) => {
      // alert(res.data.role);
      const UserRole = res.data.data.role;
      // 需要用户权限
      if (userPermission.indexOf(pathRoot) !== -1 && UserRole === 'user') {
        next();
        return true;
      }
      // 需要管理员权限
      if (adminPermission.indexOf(pathRoot) !== -1 && UserRole === 'admin') {
        next();
        return true;
      }
      // 无该权限重定向
      if (userPermission.indexOf(pathRoot) !== -1) {
        next({ path: '/signin' });
      }
      if (adminPermission.indexOf(pathRoot) !== -1) {
        next({ path: '/adminsignin' });
      }
      return false;
    });
  }
  next();
  return true;
});
