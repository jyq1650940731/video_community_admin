<template>
    <el-dialog v-model="dialogFormVisible" width="500px" :title="title" @close="close">
        <el-form ref="formRef" label-width="80px">
            <el-form-item label=" 用户名" prop="username">
                <el-input />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input />
            </el-form-item>
            <el-form-item label="角色" prop="roles">
                <el-checkbox-group>
                    <el-checkbox label="admin" />
                    <el-checkbox label="editor" />
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue';
// const formRef = ref();
const dialogFormVisible = ref(false)
const title = ref('');
const form = reactive({})

const showEdit = (row: any) => {
    if (!row) {
        title.value = '添加'
    } else {
        title.value = '编辑'
        form
        Object.assign(form, JSON.parse(JSON.stringify(row)))
    }
    dialogFormVisible.value = true
}
const close = () => {
    // formRef.resetFields()
    dialogFormVisible.value = false
}
const save = () => {

}

defineExpose({ showEdit });
</script>
  