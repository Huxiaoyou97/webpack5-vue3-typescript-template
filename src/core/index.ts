import { App } from 'vue';
import useRouter from './router/index';
import useModule from './hooks/useModule';

async function bootstrap(app: App) {
    useRouter();
    await useModule(app);
}

export default bootstrap;
