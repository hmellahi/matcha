<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
	<!--
	  This example requires updating your template:

	  ```
	  <html class="h-full bg-white">
	  <body class="h-full">
	  ```
	-->
	<div>
		<TransitionRoot as="template" :show="sidebarOpen">
			<Dialog
				as="div"
				class="relative z-50 lg:hidden"
				@close="sidebarOpen = false"
			>
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-gray-900/80" />
				</TransitionChild>

				<div class="fixed inset-0 flex">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="-translate-x-full"
					>
						<DialogPanel
							class="relative mr-16 flex w-full max-w-xs flex-1"
						>
							<TransitionChild
								as="template"
								enter="ease-in-out duration-300"
								enter-from="opacity-0"
								enter-to="opacity-100"
								leave="ease-in-out duration-300"
								leave-from="opacity-100"
								leave-to="opacity-0"
							>
								<div
									class="absolute left-full top-0 flex w-16 justify-center pt-5"
								>
									<button
										type="button"
										class="-m-2.5 p-2.5"
										@click="sidebarOpen = false"
									>
										<span class="sr-only"
											>Close sidebar</span
										>
										<XMarkIcon
											class="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</button>
								</div>
							</TransitionChild>
							<!-- Sidebar component, swap this element with another sidebar if you like -->
							<div
								class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
							>
								<div class="flex h-16 shrink-0 items-center">
									<img
										class="h-8 w-auto"
										src="/assets/logo.svg"
										alt=""
									/>
								</div>
								<nav class="flex flex-1 flex-col">
									<ul
										role="list"
										class="flex flex-1 flex-col gap-y-7"
									>
										<li>
											<ul
												role="list"
												class="-mx-2 space-y-1"
											>
												<div class="mb-8">
													<img
														class="w-full rounded-3xl mb-2 h-[15rem] object-cover"
														:src="
															getImg(
																currentUser
																	.avatars[0]
															)
														"
														v-if="
															currentUser
																.avatars[0]
														"
													/>

													<svg
														v-else
														class="h-[15rem] w-full text-gray-300"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
														/>
													</svg>
													<h2
														class="mt-3 text-2xl text-[#504E6E] font-medium pl-2"
													>
														{{
															currentUser.firstName
														}}
														{{
															currentUser.lastName
														}}
													</h2>
													<!-- <div
														class="text-xl text-[#B1AFBA] pl-2 mb-20"
													>
														{{
															currentUser.address
														}}
													</div> -->
												</div>
												<li
													v-for="item in navigation"
													:key="item.name"
												>
													<router-link
														:to="item.href"
														:class="[
															item.current
																? 'bg-gray-50 text-indigo-600'
																: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
															'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
														]"
													>
														<component
															:is="item.icon"
															:class="[
																item.current
																	? 'text-indigo-600'
																	: 'text-gray-400 group-hover:text-indigo-600',
																'h-6 w-6 shrink-0',
															]"
															aria-hidden="true"
														/>
														{{ item.name }}
													</router-link>
												</li>
											</ul>
										</li>
										<li v-if="teams.length">
											<div
												class="text-xs font-semibold leading-6 text-gray-400"
											>
												Your teams
											</div>
											<ul
												role="list"
												class="-mx-2 mt-2 space-y-1"
											>
												<li
													v-for="team in teams"
													:key="team.name"
												>
													<router-link
														:to="team.href"
														:class="[
															team.current
																? 'bg-gray-50 text-indigo-600'
																: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
															'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
														]"
													>
														<span
															:class="[
																team.current
																	? 'text-indigo-600 border-indigo-600'
																	: 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
																'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
															]"
															>{{
																team.initial
															}}</span
														>
														<span
															class="truncate"
															>{{
																team.name
															}}</span
														>
													</router-link>
												</li>
											</ul>
										</li>
										<li class="mt-auto">
											<button
												@click="logout"
												:class="[
													false
														? 'bg-gray-50 text-indigo-600'
														: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
													'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
												]"
											>
												<div
													class="flex items-center text-[#A5A8B7]"
												>
													<p
														class="ml-3 text-md font-bold"
													>
														Logout
													</p>
												</div>
											</button>
										</li>
									</ul>
								</nav>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>

		<!-- Static sidebar for desktop -->
		<div
			class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
		>
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div
				class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
			>
				<div class="flex h-16 shrink-0 items-center">
					<img class="h-8 w-auto" src="/assets/logo.svg" alt="" />
				</div>
				<nav class="flex flex-1 flex-col">
					<ul role="list" class="flex flex-1 flex-col gap-y-7">
						<li>
							<ul role="list" class="-mx-2 space-y-1">
								<div class="mb-8">
									<img
										class="w-full rounded-3xl mb-2 h-[15rem] object-cover"
										:src="getImg(currentUser.avatars[0])"
										v-if="currentUser.avatars[0]"
									/>
									<svg
										v-else
										class="h-full w-full text-gray-300"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
									<h2
										class="mt-3 text-2xl text-[#504E6E] font-medium pl-2"
									>
										{{ currentUser.firstName }}
										{{ currentUser.lastName }}
									</h2>
									<!-- <div
														class="text-xl text-[#B1AFBA] pl-2 mb-20"
													>
														{{
															currentUser.address
														}}
													</div> -->
								</div>
								<li v-for="item in navigation" :key="item.name">
									<router-link
										:to="item.href"
										:class="[
											item.current
												? 'bg-gray-50 text-indigo-600'
												: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
											'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
										]"
									>
										<component
											:is="item.icon"
											:class="[
												item.current
													? 'text-indigo-600'
													: 'text-gray-400 group-hover:text-indigo-600',
												'h-6 w-6 shrink-0',
											]"
											aria-hidden="true"
										/>
										{{ item.name }}
									</router-link>
								</li>
							</ul>
						</li>
						<li v-if="teams.length">
							<div
								class="text-xs font-semibold leading-6 text-gray-400"
							>
								Your teams
							</div>
							<ul role="list" class="-mx-2 mt-2 space-y-1">
								<li v-for="team in teams" :key="team.name">
									<router-link
										:href="team.href"
										:class="[
											team.current
												? 'bg-gray-50 text-indigo-600'
												: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
											'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
										]"
									>
										<span
											:class="[
												team.current
													? 'text-indigo-600 border-indigo-600'
													: 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
												'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
											]"
											>{{ team.initial }}</span
										>
										<span class="truncate">{{
											team.name
										}}</span>
									</router-link>
								</li>
							</ul>
						</li>
						<li class="mt-auto">
							<button
								@click="logout"
								:class="[
									false
										? 'bg-gray-50 text-indigo-600'
										: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
									'w-full group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center text-[#A5A8B7]',
								]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									class="bdg-[#F8F7FF] w-10 h-10 px-2"
									viewBox="0 0 16 16"
								>
									<path
										fill-rule="evenodd"
										d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
									/>
								</svg>
								<p class="ml-3 text-md font-bold">Logout</p>
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>

		<div class="lg:pl-72">
			<div
				class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
			>
				<button
					type="button"
					class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
					@click="sidebarOpen = true"
				>
					<span class="sr-only">Open sidebar</span>
					<Bars3Icon class="h-6 w-6" aria-hidden="true" />
				</button>

				<!-- Separator -->
				<div
					class="h-6 w-px bg-gray-200 lg:hidden"
					aria-hidden="true"
				/>

				<div
					class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end"
				>
					<form
						class="flex flex-1 w-full"
						action="#"
						v-on:submit.prevent
					>
						<label for="search-field" class="sr-only">Search</label>
						<div
							className="flex w-[90%] sm:w-[50%] md:w-[50%] lg:w-[35%] xl:w-[24%]"
						>
							<div className="relative w-full">
								<MagnifyingGlassIcon
									class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
									aria-hidden="true"
								/>
								<input
									id="search-field"
									class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
									placeholder="Search..."
									type="search"
									name="search"
									@keyup="searchUsers"
									autocomplete="off"
									v-model="searchedUser"
								/>
								<div
									className="absolute w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto"
									v-if="search_users.length > 0"
								>
									<div
										className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
										v-for="user in search_users"
									>
										<router-link
											@click="test"
											:to="{ path: `/user/${user.id}` }"
										>
											<div
												className="flex items-center gap-x-4"
											>
												<div className="flex-shrink-0">
													<img
														className="h-7 w-7 rounded-full"
														:src="user.avatar"
														alt=""
													/>
												</div>
												<div className="flex-1 min-w-0">
													<p
														className="text-sm font-medium text-gray-900 truncate"
													>
														{{ user.first_name }}
														{{ user.last_name }}
													</p>
													<p
														className="text-sm text-gray-500 truncate"
													>
														{{ user.gender }}
													</p>
												</div>
											</div>
										</router-link>
									</div>
								</div>
							</div>
						</div>
					</form>

					<div class="flex items-center gap-x-4 lg:gap-x-6">
						<notification class="nofitication-button mr-6" />
					</div>
				</div>
			</div>

			<main class="py-3">
				<div class="px-4 sm:px-6 lg:px-8">
					<slot></slot>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		BellIcon,
		CalendarIcon,
		ChartPieIcon,
		Cog6ToothIcon,
		DocumentDuplicateIcon,
		FolderIcon,
		HomeIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { useAuthStore } from '../store/auth.ts';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import apiClient from '../modules/apiClient';

	import {
		ChatBubbleOvalLeftEllipsisIcon,
		HeartIcon,
		UserIcon,
		CogIcon,
	} from '@heroicons/vue/24/solid';
	// chat-bubble-oval-left-ellipsis

	const navigation = [
		{ name: 'Dating', href: '/', icon: HeartIcon },
		{ name: 'Profile', href: '/profile', icon: UserIcon },
		{
			name: 'Messages',
			href: '/messages',
			icon: ChatBubbleOvalLeftEllipsisIcon,
		},
		{ name: 'Settings', href: '/settings', icon: CogIcon },
	];

	const sidebarOpen = ref(false);
	const searchedUser = ref('');

	const router = useRouter();
	const isCurrentRoute = link => {
		return link === router.currentRoute.value.path;
	};

	const userStore = useUserStore();

	const { currentUser } = storeToRefs(userStore);
	const { getCurrentUser } = userStore;

	let { logout } = useAuthStore();

	const userAvatar = computed(() => {
		let value = currentUser.value.avatars?.[0];
		return value?.filePath;
	});

	const teams = [];
	const userNavigation = [
		{ name: 'Your profile', href: '#' },
		{ name: 'Sign out', href: '#' },
	];
	const search_users = ref([]);
	const searchUsers = async e => {
		if (e.target.value.length === 0) {
			search_users.value = [];
			return;
		}
		const results = await apiClient.get(
			`/user/search/user/${e.target.value}`
		);
		search_users.value = results.data.message;
		console.log(search_users.value);
	};
	const getImg = avatar => {
		if (!avatar.value) {
			let [file] = avatar;
			if (file) return URL.createObjectURL(file);
		} else {
			let { value } = avatar;
			let fileName = value;

			return fileName;
		}
	};
	const test = () => {
		search_users.value = [];
		// searchedUser.value = '';
	};
</script>
