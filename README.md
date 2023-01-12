# Vue 3 + Typescript + Webpack5 多版本方案

## 启动说明

```
# 安装依赖 推荐使用 yarn
    yarn || npm install
    
# 启动项目
    yarn dev || npm run dev
    
# 打包项目
    yarn build || npm run build
```

## 技术栈

- Vue3.0 + TypeScript + Webpack5 + ElementPlus + Pinia

## 项目详细说明

### package 核心目录

- 封装`useModule`函数自动导入`package/modules/*`下所有模块
- `package/modules/*`下按模块名称划分模块 每个模块下都包含`pages, service, store, types, utils, views, components`
    - `pages`下的页面没有layout公共部分
    - `types`该模块用到的公共类型定义
    - `utils`该模块下工具包
    - `components` 该模块公共组件(代码中name名称及组件名)
    - `views`页面文件 layout会显示 新建一个vue文件即可完成创建一个页面 无需手动添加路由 只需在页面上如下写
      ```typescript
        export default defineComponent({
            cool: {
                route: {
                    name: "chat",
                    path: "/chat",
                },
            },
        })
      
      // 访问localhost:端口号/chat 即可访问页面
      ```
    - `/src/package/modules/base/views/example` 基本hooks函数使用案例

### assets 静态资源目录

### components 公共组件（暂未用到 组件移步至all）

### config 项目环境变量配置

### core 项目常用类

    - hook hooks函数封装
        - useApp 集成 ref操作、route、router路由操作、pinia各类模块导出、自定义弹窗封装
        - useLoading loading操作 具体见使用案例
        - useModule 核心模块 自动导入页面路由 组件 网络请求等
        - usePrecision 高精度数学计算hooks
        - useRefs Dom操作
        - useState 类似React中的useState 具体见使用案例
        - useToggle 多状态切换 具体见使用案例
    - router 项目路由
    - i18n 多语言模块
    - service 网络请求相关封装
    - types 路由及store namespace命名空间
    - utils
      - hiCache.ts storage封装集成
      - hiStance.ts 公用key
      - precision.ts 数学计算以及常用函数封装
      - version.ts 版本号管理

### pages layout公共页面

### router 路由初始化

### service axios封装集成

### store Pinia状态管理

### theme elementPlus多主题模块

### types 类型

### views 公共页面 通常放置首页

### 项目全局配置 config/webpack.NODE_ENV.js

# 主题版本对应

    - 切换主题核心ts文件 /src/core/utils/version.ts
    - 通常根据cookie中的key获取
    - 本地测试可以定为正在开发的版本 29行 'base' 修改为 'v1'。即可看到效果
    - theme文件夹下index.ts包含element初始化主题样式 在App.vue中动态切换
    - assets/css文件夹下包含对应的版本主题样式

```
# 版本号对应的颜色
