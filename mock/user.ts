function createList() {
    return [
        {
            userId: 1,
            username: '123',
            password: '123456'
        },
        {
            userId: 2,
            username: '234',
            password: '567895'
        }
    ]
}

export default [
    {
        url: '/dev-api/user/login',
        method: 'post',
        response: ({ query }) => {
            const { username, password } = query;
            const isUser = createList().find(item =>
                item.username === password && username === item.username
            )
            if(!isUser) return {code:201,data:{message:'账号或密码错误'}}
            return {
                code: 200,
                data: {
                    token: "1234",
                    message:"登录成功！"
                },
            }
        },
    },
    {
        url: '/dev-api/user/info',
        method: 'get',
        response: ({ body }) => {
            return { code: 200, data: { a: 1234 } }
        }
    }
]