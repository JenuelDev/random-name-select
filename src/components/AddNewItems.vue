<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NSelect } from "naive-ui";
import { ref } from "vue";
import SelectionTypeOptions from "./selectedTypeOptions";
import Swal from "sweetalert2";
const isEdit = ref(false);
const itemToUpdate = ref<any>(null);

const emit = defineEmits(["add", "update"]);

const formRef = ref();
const size = ref<"small" | "medium" | "large">("medium");
const formValue = ref<{
    name: null | string;
    nickName: null | string;
    img: string | null;
    selectedType: string | null;
}>({
    name: null,
    nickName: null,
    img: null,
    selectedType: null,
});

const rules = {
    name: {
        required: true,
        message: "Enter Name",
        trigger: ["input", "blur"],
    },
    nickName: {
        required: true,
        message: "Enter NickName",
        trigger: ["input", "blur"],
    },
    img: {
        required: false,
        message: "Enter Image URL",
        trigger: ["input", "blur"],
    },
    selectedType: {
        required: true,
        message: "please Selected Type",
        trigger: ["change"],
    },
};

function handleValidateClick(e: MouseEvent) {
    e.preventDefault();
    if (formRef.value)
        formRef.value?.validate((errors: any) => {
            if (!errors) {
                const data = {
                    name: formValue.value.name,
                    img: formValue.value.img,
                    nickName: formValue.value.nickName,
                    selectedType: formValue.value.selectedType,
                };
                formValue.value.name = null;
                formValue.value.img = null;
                formValue.value.nickName = null;
                formValue.value.selectedType = null;

                if (isEdit.value) {
                    isEdit.value = false;
                    emit("update", {
                        index: itemToUpdate.value.index,
                        data: data,
                    });
                    return;
                }
                emit("add", data);
            } else {
                Swal.fire("Oops! Error", "Please Check fields you might forgot something.", "error");
            }
        });
}

function toggleEdit(item: any) {
    isEdit.value = true;
    itemToUpdate.value = item;
    console.log(itemToUpdate.value);
    formValue.value.name = item.data.name;
    formValue.value.img = item.data.img;
    formValue.value.nickName = item.data.nickName;
    formValue.value.selectedType = item.data.selectedType;
}

function cancelUpdate() {
    isEdit.value = false;
}

defineExpose({
    toggleEdit,
});
</script>

<template>
    <h2 class="font-700 text-size-28px mb-5">{{ isEdit ? "Edit Item" : "Add Item" }}</h2>
    <NForm ref="formRef" :label-width="80" :model="formValue" :rules="rules" :size="size">
        <NFormItem :label="`${isEdit ? 'Edit ' : ''}Name`" path="name">
            <NInput v-model:value="formValue.name" placeholder="Input Name" />
        </NFormItem>
        <NFormItem :label="`${isEdit ? 'Edit ' : ''}Nick Name`" path="nickName">
            <NInput v-model:value="formValue.nickName" placeholder="Input Age" />
        </NFormItem>
        <NFormItem :label="`${isEdit ? 'Edit ' : ''}Image`" path="img">
            <NInput v-model:value="formValue.img" placeholder="Input Age" />
        </NFormItem>
        <NFormItem :label="`${isEdit ? 'Edit ' : ''}Type`" path="selectedType">
            <NSelect v-model:value="formValue.selectedType" :options="SelectionTypeOptions" />
        </NFormItem>
        <NFormItem>
            <NButton type="info" @click="handleValidateClick" class="mr-2">
                {{ isEdit ? "Update" : "Add Item" }}
            </NButton>
            <NButton v-if="isEdit" @click="cancelUpdate"> Cancel </NButton>
        </NFormItem>
    </NForm>
</template>
