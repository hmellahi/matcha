<script setup>
	import { useAuthStore } from '../store/auth.ts';
	let fields = ref([
		{ name: 'Username', type: 'text', value: '' },
		{ name: 'Password', type: 'password', value: '' },
	]);
	let { logIn, loginWithFakeUser } = useAuthStore();

	const login = () => {
		const [username, password] = fields.value;
		logIn(username.value, password.value);
	};
</script>
<template>
	<div class="h-screen overflow-hidden">
		<section class="absolute w-full !h-screen">
			<div class="absolute top-0 w-full h-full bg bg-cover">
				<div class="absolute inset-0 bg-gray-700 opacity-75"></div>
			</div>
			<div class="container mx-auto px-4 h-full">
				<div
					class="flex content-center items-center justify-center h-full"
				>
					<div class="w-full lg:w-4/12 px-4">
						<div
							class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-50 border-0"
						>
							<div class="rounded-t mb-0 px-6 py-6">
								<div class="text-center mb-3">
									<img
										src="/assets/logo.svg"
										class="w-12 mx-auto"
									/>
								</div>
							</div>
							<div class="flex-auto px-4 lg:px-10 pt-2 pb-0">
								<Form
									:fields="fields"
									title="Sign In"
									@submit.prevent="login"
								/>
								<input
									@click="loginWithFakeUser"
									className="uppercase mt-4 cursor-pointer border-md border-2 border-gray-700 bg-white active:text-gray-700 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
									type="submit"
									value="Try Demo Account"
								/>
							</div>
							<hr class="mt-6 border-b-1 border-gray-400" />
							<div class="flex">
								<div class="w-1/2">
									<Button link="/reset"
										>Forgot Password ?</Button
									>
								</div>
								<div class="w-1/2 text-right">
									<Button link="/Register"
										>Create new account ?</Button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
