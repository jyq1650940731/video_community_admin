function createList() {
  return [
    {
      userId: 1,
      username: '123',
      password: '123456',
    },
    {
      userId: 2,
      username: '234',
      password: '567895',
    },
  ];
}

export default [
  {
    url: '/dev-api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;

      const isUser = createList().find(
        (item) => item.password === password && username === item.username,
      );
      if (!isUser) return { code: 201, data: { message: '账号或密码错误' } };
      return {
        code: 200,
        message: '登录成功！',
        result: {
          token: '1234',
        },
      };
    },
  },
  {
    url: '/dev-api/user/info',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 200,
        message:'获取成功',
        result: {
          username: '金烨棋',
          avatar:
            'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
        },
      };
    },
  },
];
