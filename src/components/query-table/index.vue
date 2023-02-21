<template>
	<a-card class="general-card" :title="tableDefine.title">
		<a-row>
			<a-col :flex="1">
				<a-form ref="searchFormRef" :label-col-props="{ span: 6 }" :model="pageQuery" :wrapper-col-props="{ span: 18 }" label-align="right">
					<a-row>
						<a-col v-for="searchFieldDefine in tableDefine.searchDefine" :span="8" :key="searchFieldDefine.queryField">
							<a-form-item :field="searchFieldDefine.queryField" :label="searchFieldDefine.label">
								<a-input
									v-if="searchFieldDefine.inputType === QueryTableSearchFormInputType.INPUT_STRING"
									v-model="pageQuery[searchFieldDefine.queryField]"
									:placeholder="searchFieldDefine.placeholder"
								/>
								<a-input-number
									v-if="searchFieldDefine.inputType === QueryTableSearchFormInputType.INPUT_NUMBER"
									v-model="pageQuery[searchFieldDefine.queryField]"
									:placeholder="searchFieldDefine.placeholder"
								/>
								<a-select
									v-if="searchFieldDefine.inputType === QueryTableSearchFormInputType.SELECT"
									v-model="pageQuery[searchFieldDefine.queryField]"
									:placeholder="searchFieldDefine.placeholder"
								>
									<a-option v-for="op in searchFieldDefine.inputValue" :value="op.value" :key="op.value">{{ op.key }}</a-option>
								</a-select>
								<a-date-picker
									v-if="searchFieldDefine.inputType === QueryTableSearchFormInputType.DATETIME_PICKER"
									v-model="pageQuery[searchFieldDefine.queryField]"
									:placeholder="searchFieldDefine.placeholder"
									show-time
									format="YYYY-MM-dd HH:mm:ss"
								></a-date-picker>
								<a-range-picker
									v-if="searchFieldDefine.inputType === QueryTableSearchFormInputType.DATETIME_RANGE_PICKER"
									v-model="pageQuery[searchFieldDefine.queryField]"
									:placeholder="searchFieldDefine.placeholder"
									show-time
									format="YYYY-MM-dd HH:mm:ss"
								></a-range-picker>
								<a-date-picker
									v-if="searchFieldDefine.inputType === QueryTableSearchFormInputType.DATE_PICKER"
									v-model="pageQuery[searchFieldDefine.queryField]"
									:placeholder="searchFieldDefine.placeholder"
									format="YYYY-MM-dd"
								></a-date-picker>
								<a-range-picker
									v-if="searchFieldDefine.inputType === QueryTableSearchFormInputType.DATE_RANGE_PICKER"
									v-model="pageQuery[searchFieldDefine.queryField]"
									:placeholder="searchFieldDefine.placeholder"
									format="YYYY-MM-dd"
								></a-range-picker>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>
			</a-col>
			<a-divider style="height: 84px" direction="vertical" />
			<a-col :flex="'86px'" style="text-align: right">
				<a-space direction="vertical" :size="18">
					<a-button type="primary" @click="fetchData()">
						<template #icon>
							<icon-search />
						</template>
						查找
					</a-button>
					<a-button @click="$refs.searchFormRef.resetFields()">
						<template #icon>
							<icon-refresh />
						</template>
						重置
					</a-button>
				</a-space>
			</a-col>
		</a-row>
		<a-divider style="margin-top: 16px" />
		<a-row style="margin-bottom: 16px">
			<a-col :span="12">
				<a-space>
					<a-button type="primary" @click="tableDefine.addFunc()">
						<template #icon>
							<icon-plus />
						</template>
						添加
					</a-button>
				</a-space>
			</a-col>
			<a-col :span="12" style="display: flex; align-items: center; justify-content: end">
				<a-tooltip content="刷新" @click="fetchData()">
					<div class="action-icon">
						<icon-refresh size="18" />
					</div>
				</a-tooltip>
			</a-col>
		</a-row>
		<a-table
			row-key="id"
			:loading="loading"
			:pagination="pagination"
			@page-change="pageChangeFunc"
			:data="tableData"
			:columns="tableDefine.tableColumns"
			:bordered="false"
		>
			<slot></slot>
		</a-table>
	</a-card>
</template>
<script lang="ts" setup>
import { QueryTableDefine, QueryTableSearchFormInputType } from "@/components/query-table/types";
import { PageDTO } from "@/api/types";
import { reactive, ref } from "vue";
import { PaginationProps } from "@arco-design/web-vue";

const loading = ref<boolean>(false);
const tableData = ref<Array<any>>([]);
const tableDefine = defineProps<QueryTableDefine>();
// 分页定义
const pageQuery: PageDTO = reactive<PageDTO>({
	page: 1,
	size: 2
});
const pagination = reactive<PaginationProps>({
	current: pageQuery.page,
	pageSize: pageQuery.size
});
const fetchData = () => {
	loading.value = true;
	tableDefine.queryApi(pageQuery).then(res => {
		if (res.data) {
			tableData.value = res.data;
			pagination.current = pageQuery.page;
			pagination.total = res.totalNum ? res.totalNum : 0;
		}
		loading.value = false;
	});
};
const pageChangeFunc = (current: number) => {
	pageQuery.page = current;
	fetchData();
};
</script>
