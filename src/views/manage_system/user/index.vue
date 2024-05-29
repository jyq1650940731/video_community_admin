<template>
    
    <div class="user-management-container">
        <vab-query-form>
            <vab-query-form-left-panel :span="12">
                <el-button icon="Plus" type="primary" @click="handleEdit($event)">
                    添加
                </el-button>
                <el-button icon="Delete" type="danger" @click="handleDelete($event)">
                    批量删除
                </el-button>
            </vab-query-form-left-panel>
            <vab-query-form-right-panel :span="12">
                <el-form inline @submit.prevent>
                    <el-form-item>
                        <el-input v-model.trim="searchVal" prefix-icon="Search" clearable placeholder="请输入用户名/邮箱" />
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="Search" type="primary" @click="queryData">
                            查询
                        </el-button>
                    </el-form-item>
                </el-form>
            </vab-query-form-right-panel>
        </vab-query-form>
        <el-table v-loading="listLoading" :data="userList" @selection-change="setSelectRows" border>
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
                    <el-tag v-for="(item, index) in row.role" :key="index">
                        {{ item == "1" ? "admin" : "editor" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间">
                <template #default="{ row }">
                    {{ formatDate(row.updateTime, "YYYY-MM-DD HH:mm:ss") }}
                </template>
            </el-table-column>

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
        <el-pagination :background="true" v-model:current-page="queryForm.page" :layout="layout"
            v-model:page-size="queryForm.pageSize" :total="userTotal" @current-change="handleCurrentChange"
            @size-change="handleSizeChange" />
        <Edit ref="editRef" @fetch-data="fetchData" />
    </div>
</template>
<script lang='ts' setup name="userManagement">
import { getList, removeUser } from '@/api/userManagement';
import { formatDate } from '@/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import Edit from './components/userManagementEdit.vue';
import config from '@/config';
const { statusSuccess } = config;

const editRef = ref();

const listLoading = ref(false);
const userTotal = ref(0)
let userList = reactive(['']);
const searchVal = ref('');
const queryForm = reactive({
    page: 1,
    pageSize: 10,
    username: '',
    email: ''
});

let selectRows: any = '';

onMounted(() => {
    fetchData()
})

const fetchData = async () => {
    listLoading.value = true;
    const { result: { rows, total } } = await getList(queryForm);
    rows.forEach((item: any) => {
        item.role = item.role.split(',');
    });
    userList = [...rows];
    userTotal.value = total;
    listLoading.value = false;
}

const setSelectRows = (val: any) => {
    selectRows = val
}

const queryData = () => {
    queryForm.username = searchVal.value;
    queryForm.email = searchVal.value;
    fetchData();
}

const handleEdit = (row: any) => {
    if (row.id) {
        editRef.value.showEdit(row);
    } else {
        editRef.value.showEdit();
    }
}
const handleDelete = (row: any) => {
    ElMessageBox.confirm(
        '你确定要删除选中项吗?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let id = '';
            if (row.id) {
                id = row.id;
            } else {
                id = selectRows.map((item: { id: any; }) => item.id).join(',');
            }
            const { code } = await removeUser(id);
            if (code == statusSuccess) {
                ElMessage({
                    type: 'success',
                    message: '删除成功！',
                })
                fetchData();
            }
        })
}
const handleSizeChange = (val: number) => {
    queryForm.pageSize = val
    fetchData()
}
const handleCurrentChange = (val: number) => {
    queryForm.page = val
    fetchData()
}
</script>
<style lang='scss' scoped></style>
