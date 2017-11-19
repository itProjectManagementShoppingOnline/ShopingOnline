module.exports = {
  '/m/course/:type/list': 'view/course.type.list.get.json',
  '/m/items/:type/:page/list': 'front/items.type.list.get.json',
  '/user/signin/post': 'user/user.signin.post.json',
  '/user/signup/post': 'user/user.signup.post.json',
  '/user/signout/post': 'user/user.signout.post.json',
  '/user/info/get': 'user/user.info.get.json',
  '/m/admin/onsale/items/get': 'admin/admin.onsale.items.get.json',
  '/m/admin/checkupload/items/get': 'admin/admin.upitem.items.get.json',
  '/m/admin/checkupload/fail/post': 'admin/admin.checkupload.fail.id.post.json',
  '/m/admin/checkupload/ok/post': 'admin/admin.checkupload.ok.id.post.json',
  '/m/admin/remove/:id/post': 'admin/admin.remove.id.post.json',
}

// '/user/signin/get'

