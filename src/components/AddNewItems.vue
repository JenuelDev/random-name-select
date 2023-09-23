<script lang="ts" setup>
import { NButton, NCard, NForm, NFormItem, NInput, NModal, NSelect } from "naive-ui";
import { ref } from "vue";
import SelectionTypeOptions from "./selectedTypeOptions";
import Swal from "sweetalert2";

const isEdit = ref(false);
const itemToUpdate = ref<any>(null);
const emit = defineEmits(["add", "update"]);
const showStoreModal = ref(false);
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
    selectedType: null
});

const rules = {
    name: {
        required: true,
        message: "Enter Name",
        trigger: ["input"]
    },
    nickName: {
        required: true,
        message: "Enter NickName",
        trigger: ["input"]
    },
    img: {
        required: false,
        message: "Enter Image URL",
        trigger: ["input"]
    },
    selectedType: {
        required: false,
        message: "please Selected Type",
        trigger: ["change"]
    }
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
                    selectedType: formValue.value.selectedType
                };
                formValue.value.name = null;
                formValue.value.img = null;
                formValue.value.nickName = null;
                formValue.value.selectedType = null;

                if (isEdit.value) {
                    isEdit.value = false;
                    emit("update", {
                        index: itemToUpdate.value.index,
                        data: data
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
    showStoreModal.value = true;
    isEdit.value = !!item;
    itemToUpdate.value = item;
    formValue.value.name = item && item.data && item.data.name ? item.data.name : null;
    formValue.value.img = item && item.data && item.data.img ? item.data.img : null;
    formValue.value.nickName = item && item.data && item.data.nickName ? item.data.nickName : null;
    formValue.value.selectedType = item && item.data && item.data.selectedType ? item.data.selectedType : null;
}

function cancelUpdate() {
    formValue.value.name = null;
    formValue.value.img = null;
    formValue.value.nickName = null;
    formValue.value.selectedType = null;
    isEdit.value = false;
}

defineExpose({
    toggleEdit
});
</script>

<template>
    <NModal v-model:show="showStoreModal">
        <NCard style="max-width: 400px">
            <h2 class="font-700 text-size-28px mb-5">{{ isEdit ? "Edit Human" : "Add Human" }}</h2>
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
                    <NSelect v-model:value="formValue.selectedType" :options="SelectionTypeOptions as any" />
                </NFormItem>
                <NFormItem>
                    <NButton class="mr-2" type="info" @click="handleValidateClick">
                        {{ isEdit ? "Update" : "Add Item" }}
                    </NButton>
                    <NButton v-if="isEdit" @click="cancelUpdate"> Cancel</NButton>
                </NFormItem>
            </NForm>
        </NCard>
    </NModal>
</template>
