import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/dev-api/system/userManage',
    method: 'get',
    response(config) {
      if (config.headers['admin-token'] !== '1234') {
        return {
          code: 1001,
          success: false,
          message: 'token失效',
        };
      }
      return {
        success: true,
        message: '操作成功!',
        code: 200,
        result: {
          list: [
            {
              id: '54000019870926417X',
              username: 'admin',
              password: 'admin',
              email: 'a.xgnj@lgnt.int',
              roles: ['admin'],
              datatime: '1984-11-09 06:06:06',
            },
            {
              id: '530000197101145854',
              username: 'editor',
              password: 'editor',
              email: 'j.jlhr@fbeeyrohr.ao',
              roles: ['editor'],
              datatime: '2007-06-19 09:49:52',
            },
            {
              id: '410000197910058649',
              username: 'test',
              password: 'test',
              email: 't.woklrq@sjhpy.qa',
              roles: ['admin', 'editor'],
              datatime: '2000-01-27 17:47:07',
            },
          ],
          total: 3,
        },
      };
    },
  },
] as MockMethod[];
