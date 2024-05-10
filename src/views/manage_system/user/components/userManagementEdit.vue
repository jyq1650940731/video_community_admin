<template>
    <el-dialog v-model="dialogFormVisible" width="500px" :title="title" @close="close(formRef)">
        <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
            <el-form-item label=" 用户名" prop="username">
                <el-input v-model.trim="form.username" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model.trim="form.email" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-checkbox-group v-model="form.role">
                    <el-checkbox label="admin" value="1" name="role" />
                    <el-checkbox label="editor" value="2" name="role" />
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="close(formRef)">取 消</el-button>
            <el-button type="primary" @click="save(formRef)">确 定</el-button>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { addUser, updataUser } from '@/api/userManagement';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';

const emit = defineEmits(['fetch-data']);

const type = ref('add');
const formRef = ref<FormInstance>();
const dialogFormVisible = ref(false);
const title = ref('');
const msg = ref('用户信息添加成功！');
let form = reactive({
    username: '',
    email: '',
    role: [],
})

// 校验
const validateUsername = (rule: any, value: string, callback: any) => {
    if (value === '') callback(new Error('用户名不能为空'))
    else callback()
}

const rules = reactive<FormRules<typeof form>>({
    username: [
        {
            required: true,
            validator: validateUsername
        }
    ],
    email: [
        {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
        },
    ],
    role: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
})

const showEdit = (row: any) => {
    if (!row) {
        title.value = '添加';
    } else {
        title.value = '编辑'
        msg.value = '用户信息修改成功！';
        type.value = 'updata';
        Object.assign(form, JSON.parse(JSON.stringify(row)))
    }
    dialogFormVisible.value = true
}
const close = (formEl: FormInstance | undefined) => {
    form = reactive({
        username: '',
        email: '',
        role: [],
    })
    formEl?.resetFields();
    dialogFormVisible.value = false;
}
const save = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const newForm = JSON.parse(JSON.stringify(form))
            newForm.role = form.role.join(",")
            let recode = 0;
            if (type.value == 'add') {
                const { code } = await addUser({ ...newForm })
                recode = code;
            } else {
                const { code } = await updataUser({ ...newForm })
                recode = code;
            }
            if (recode == 0) {
                ElMessage({
                    message: '用户已存在！',
                    type: 'error',
                })
                return;
            }
            ElMessage({
                message: msg.value,
                type: 'success',
            })
            emit('fetch-data');
            close(formEl);
        }
    })
}

defineExpose({ showEdit })
</script>
  