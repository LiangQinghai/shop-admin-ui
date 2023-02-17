<template>
	<div>
		<a-card class="general-card" title="a title">
			<a-row>
				<a-col :flex="1">
					<a-form :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
						<a-row :gutter="16">
							<a-col :span="8">
								<a-form-item field="number" label="labelOne">
									<a-input placeholder="please input" />
								</a-form-item>
							</a-col>
							<a-col :span="8">
								<a-form-item field="name" label="name">
									<a-select :options="['123']" placeholder="please select" />
								</a-form-item>
							</a-col>
						</a-row>
					</a-form>
				</a-col>
				<a-divider style="height: 84px" direction="vertical" />
				<a-col :flex="'86px'" style="text-align: right">
					<a-space direction="vertical" :size="18">
						<a-button type="primary">
							<template #icon>
								<icon-search />
							</template>
							查找
						</a-button>
						<a-button>
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
						<a-button type="primary">
							<template #icon>
								<icon-plus />
							</template>
							添加
						</a-button>
					</a-space>
				</a-col>
				<a-col :span="12" style="display: flex; align-items: center; justify-content: end">
					<a-tooltip content="刷新">
						<div class="action-icon">
							<icon-refresh size="18" />
						</div>
					</a-tooltip>
					<a-dropdown>
						<a-tooltip content="密度">
							<div class="action-icon">
								<icon-line-height size="18" />
							</div>
						</a-tooltip>
						<template #content>
							<a-doption value="123">
								<span>123</span>
							</a-doption>
						</template>
					</a-dropdown>
				</a-col>
			</a-row>
			<a-table
				row-key="id"
				:loading="loading"
				:pagination="pagination"
				@page-change="pageChangeFunc"
				:data="tableData"
				:columns="tableColumns"
				:bordered="false"
			>
				<template #avatar="{ record }">
					<a-avatar :size="32" shape="square">
						<img v-if="record?.avatar" :src="record.avatar" :alt="record?.nickName" />
						<img v-else src="/avatar.gif" :alt="record?.nickName" />
					</a-avatar>
				</template>
				<template #status="{ record }">
					<span v-if="!record?.status" class="circle"></span>
					<span v-else class="circle pass"></span>
					{{ record?.status ? "启用" : "失效" }}
				</template>
				<template #operations="{ record }">
					<a-button type="text" size="small">编辑</a-button>
					<a-button type="text" size="small" status="danger" :disabled="record?.status">删除</a-button>
					<a-button type="text" size="small" status="warning" v-if="record?.status">失效</a-button>
					<a-button type="text" size="small" status="success" v-if="!record?.status">启用</a-button>
				</template>
			</a-table>
		</a-card>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { PaginationProps, TableColumnData } from "@arco-design/web-vue";
import { page } from "@/api/modules/user";
import { PageDTO } from "@/api/types";
import { AdminUserVO } from "@/api/modules/user/types";

// 加载。。。
const loading = ref<boolean>(false);
// 分页定义
const basePagination: PageDTO = {
	page: 1,
	size: 20
};
const pagination = reactive<PaginationProps>({
	current: basePagination.page,
	pageSize: basePagination.size
});

// 表头定义
const tableColumns = ref<TableColumnData[]>([
	{
		title: "ID",
		dataIndex: "id"
	},
	{
		title: "用户名",
		dataIndex: "username"
	},
	{
		title: "昵称",
		dataIndex: "nickName"
	},
	{
		title: "头像",
		dataIndex: "avatar",
		slotName: "avatar"
	},
	{
		title: "邮箱",
		dataIndex: "email"
	},
	{
		title: "手机",
		dataIndex: "mobile"
	},
	{
		title: "性别",
		dataIndex: "sex"
	},
	{
		title: "状态",
		dataIndex: "status",
		slotName: "status"
	},
	{
		title: "操作",
		slotName: "operations"
	}
]);
const tableData = ref<Array<AdminUserVO>>([]);
// 请求数据
const fetchData = (pageQuery: PageDTO = { size: 20, page: 1 }) => {
	loading.value = true;
	try {
		page(pageQuery).then(res => {
			if (res.data) {
				tableData.value = res.data;
				pagination.current = pageQuery.page;
				pagination.total = res.totalNum ? res.totalNum : 0;
			}
		});
	} finally {
		loading.value = false;
	}
};
// 分页表更
const pageChangeFunc = (page: number) => {
	fetchData({ ...basePagination, page });
};
// 页面初始化
onMounted(() => fetchData());
</script>
<style lang="less" scoped>
:deep(.arco-table-th) {
	&:last-child {
		.arco-table-th-item-title {
			margin-left: 16px;
		}
	}
}
.action-icon {
	margin-left: 12px;
	cursor: pointer;
}
.active {
	color: #0960bd;
	background-color: #e3f4fc;
}
</style>
