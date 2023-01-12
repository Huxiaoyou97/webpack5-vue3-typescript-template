/** @type {import("tailwindcss").Config} */
module.exports = {
    purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [],
    theme: {
        extend: {},
    },
    plugins: [
        // 解决与element样式冲突
        function ({ addBase }) {
            addBase({
                '.el-button': {
                    'background-color': 'var(--el-button-bg-color,val(--el-color-white))',
                },
            });
        },
    ],
};
