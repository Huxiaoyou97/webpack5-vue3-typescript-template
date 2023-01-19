import { App } from 'vue';
import useRouter from './router/index';
import useModule from './hooks/useModule';
import { messageSetup } from '@/core/utils/message';

async function bootstrap(app: App) {
    useRouter();
    messageSetup(app);
    await useModule(app);
}

export default bootstrap;
