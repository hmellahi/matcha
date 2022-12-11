import App from '@/App.vue';
import { ViteSSG } from 'vite-ssg';

import '@/styles/index.css';
import { extendedRoutes } from '@/router';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import {
	faGear,
	faHeart,
	faXmark,
	faFlag,
	faArrowLeft,
	faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faHeart);
library.add(faXmark);
library.add(faFlag);
library.add(faFlag);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faGear);

export const createApp = ViteSSG(
	App,
	{ routes: extendedRoutes },
	async ctx => {
		Object.values(
			import.meta.glob('./modules/*.ts', {
				eager: true,
			})
		).map(i => i.install?.(ctx));
	},
	{}
);
