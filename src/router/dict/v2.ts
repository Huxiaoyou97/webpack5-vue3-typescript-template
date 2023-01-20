const v2Pages = [
    {
        path: '/example-message',
        name: 'exampleMessage',
        component: () => import(/* webpackChunkName: "example-message" */ '@component/v1/pages/example/message.vue'),
    },
    {
        path: '/example-useState',
        name: 'exampleUseState',
        component: () => import(/* webpackChunkName: "example-message" */ '@component/v1/pages/example/useState.vue'),
    },
];

const v2Views = [
    {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "v2-test" */ '@component/v2/views/v2-test.vue'),
    },
];

export { v2Pages, v2Views };
