import { createPinia } from "pinia";
import useUserStore from "./modules/user";
import useAppStore from "./modules/app";
import useTabBarStore from "./modules/tab-bar";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { useUserStore, useAppStore, useTabBarStore };
export default pinia;
