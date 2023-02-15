<template>
	<div class="not-container">
		<img src="@/assets/images/403.png" class="not-img" alt="403" />
		<div class="not-detail">
			<h2>403</h2>
			<h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
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
