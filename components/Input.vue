<template>
    <div class="flex flex-col gap-2">
        <p>{{ title }}</p>
        <input :value="nameValue" name="name" @input="handleNameTodo" v-if="type === 'input'" required
            class="input w-full px-[16px] py-[10px] text-[16px] font-[400] text-black border-[2px] border-solid border-[rgba(189,101,101,0.4)] focus:border-[rgba(189,101,101,1)]  rounded-[10px] placeholder:text-[#533636]"
            type="text" placeholder="Vui lòng nhập tiêu đề công việc">
        <input :value="dateValue" name="date" v-else-if="type === 'date'" @input="handleDate" required type="date"
            class="input w-full px-[16px] py-[10px] text-[16px] font-[400] text-black border-[2px] border-solid border-[rgba(189,101,101,0.4)] focus:border-[rgba(189,101,101,1)]  rounded-[10px] placeholder:text-[#533636]">
        <select :value="selectValue" @input="handleSelect" name="select" v-else required
            class="input w-full px-[16px] py-[10px] text-[16px] font-[400] text-black border-[2px] border-solid border-[rgba(189,101,101,0.4)] focus:border-[rgba(189,101,101,1)]  rounded-[10px] placeholder:text-[#533636]">
            <option value="">Vui lòng chọn độ ưu tiên công việc</option>
            <option value="hight">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
        </select>
    </div>
</template>

<script setup>
import { useNameTodo, useSelect, useDate } from "~/composables/state"
const nameValue = useNameTodo()
const selectValue = useSelect()
const dateValue = useDate()

const handleNameTodo = (e) => {
    nameValue.value = e.target.value
}

const handleSelect = (e) => { 
    selectValue.value = e.target.value
}

const handleDate = (e) => {
    dateValue.value = e.target.value
}
</script>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ""
        }
    },
}
</script>   