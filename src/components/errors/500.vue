<template>
	<div class="not-container">
		<img src="@/assets/images/500.png" class="not-img" alt="500" />
		<div class="not-detail">
			<h2>500</h2>
			<h4>抱歉，您的网络不见了~🤦‍♂️🤦‍♀️</h4>
			<go-home-when-error />
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import GoHomeWhenError from "@/components/errors/goHomeWhenError.vue";

export default defineComponent({
	components: { GoHomeWhenError }
});
</script>

<style scoped lang="less">
@import "./index.less";
</style>
