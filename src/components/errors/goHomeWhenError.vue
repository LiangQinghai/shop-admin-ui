<template>
	<a-button type="primary" linked @click="goHome()">
		<template #icon>
			<icon-arrow-left />
		</template>
		返回首页
	</a-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
	router.push({ name: "home" });
};
</script>
