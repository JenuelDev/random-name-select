<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from "naive-ui";
import { ref } from "vue";

const formRef = ref();
const size = ref<"small" | "medium" | "large">("medium");
const formValue = ref({
    user: {
        name: "",
        age: "",
    },
    phone: "",
});

const rules = {
    user: {
        name: {
            required: true,
            message: "Please input your name",
            trigger: "blur",
        },
        age: {
            required: true,
            message: "Please input your age",
            trigger: ["input", "blur"],
        },
    },
    phone: {
        required: true,
        message: "Please input your number",
        trigger: ["input"],
    },
};

function handleValidateClick(e: MouseEvent) {
    e.preventDefault();
    if (formRef.value)
        formRef.value?.validate((errors: any) => {
            if (!errors) {
                // message.success("Valid");
                alert("valid");
            } else {
                console.log(errors);
                // message.error("Invalid");
                alert("invalid");
            }
        });
}
</script>

<template>
    <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        :rules="rules"
        :size="size"
    >
        <n-form-item label="Name" path="user.name">
            <n-input
                v-model:value="formValue.user.name"
                placeholder="Input Name"
            />
        </n-form-item>
        <n-form-item label="Age" path="user.age">
            <n-input
                v-model:value="formValue.user.age"
                placeholder="Input Age"
            />
        </n-form-item>
        <n-form-item label="Phone" path="phone">
            <n-input
                v-model:value="formValue.phone"
                placeholder="Phone Number"
            />
        </n-form-item>
        <n-form-item>
            <n-button type="primary" @click="handleValidateClick"> Validate </n-button>
        </n-form-item>
    </n-form>
</template>
