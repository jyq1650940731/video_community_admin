<template>
    <div class="user-management-container">
        <vab-query-form>
            <vab-query-form-left-panel :span="12">
                <el-button icon="Plus" type="primary" @click="">
                    添加
                </el-button>
                <el-button icon="Delete" type="danger" @click="">
                    批量删除
                </el-button>
            </vab-query-form-left-panel>
            <vab-query-form-right-panel :span="12">
                <el-form inline @submit.prevent>
                    <el-form-item>
                        <el-input clearable placeholder="请输入角色" />
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="Search" type="primary" @click="">
                            查询
                        </el-button>
                    </el-form-item>
                </el-form>
            </vab-query-form-right-panel>
        </vab-query-form>
        <el-table v-loading="listLoading" :data="userList" border>
            <el-table-column align="center" type="selection" />
            <el-table-column align="center" label="序号" width="55">
                <template #default="{ $index }">
                    {{ $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="id" prop="id" />
            <el-table-column align="center" label="用户名" prop="username" />
            <el-table-column align="center" label="邮箱" prop="email" />
            <el-table-column align="center" label="角色">
                <template #default="{ row }">
                    <el-tag v-for="(item, index) in row.roles" :key="index">
                        {{ item }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间" prop="datatime" />
            <el-table-column align="center" label="操作" width="200">
                <template #default="{ row }">
                    <el-button text type="primary" @click="handleEdit(row)">
                        编辑
                    </el-button>
                    <el-button text type="primary" @click="handleDelete(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty class="vab-data-empty" description="暂无数据" />
            </template>
        </el-table>
        <el-pagination :background="true" v-model:current-page="queryForm.pageNo" :layout="layout"
            v-model:page-size="queryForm.pageSize" :total="userTotal" @current-change="handleCurrentChange"
            @size-change="handleSizeChange" />
        <Edit ref="editRef" @fetch-data="fetchData" />
    </div>
</template>
<script lang='ts' setup name="userManagement">
import { getList } from '@/api/userManagement';
import { onMounted, reactive, ref } from 'vue';
import Edit from './components/userManagementEdit.vue';

const editRef = ref();

const layout = 'total, sizes, prev, pager, next, jumper';
const listLoading = ref(false);
const userTotal = ref(0)
const userList = reactive([]);
const queryForm = reactive({
    pageNo: 1,
    pageSize: 10,
    username: '',
});

onMounted(() => {
    fetchData()
})
const fetchData = async () => {
    listLoading.value = true;
    const { result: { list, total } } = await getList(queryForm);
    Object.assign(userList, list);
    console.log(userList);

    userTotal.value = total;
    listLoading.value = false;
}
const handleEdit = (row: any) => {
    if (row.id) {
        editRef.value.showEdit(row);
    } else {
        editRef.value.showEdit();
    }


}
const handleDelete = (val: any) => {

}
const handleSizeChange = (val: number) => {
    queryForm.pageNo = val
    fetchData()
}
const handleCurrentChange = (val: number) => {
    queryForm.pageSize = val
    fetchData()
}
</script>
<style lang='scss' scoped></style>
