import { App } from 'vue';
// import useRouter from './router/index';
// import useModule from './hooks/useModule';
import { messageSetup } from '@/core/utils/message';
// import useModule2 from '@/core/hooks/useModule2';

async function bootstrap(app: App) {
    // useRouter();
    messageSetup(app);
    // await useModule2(app);
}

export default bootstrap;
