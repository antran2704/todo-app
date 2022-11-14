<template>
    <div class="relative bg-[#EFFBFF] py-[40px] px-5 my-10 w-full rounded-lg shadow-sm shadow-[#00000040] z-[1]">
        <NuxtLink to="/" class="cursor-pointer">
            <img :src="images.backIcon" class="w-[30px] h-[30px]" alt="back icon">
        </NuxtLink>
        <li v-if="infor?._id" class="w-full p-3 mt-[30px]  flex items-center justify-between rounded-xl item">
            <div class="flex flex-col items-start gap-3">
                <p class="text-[16px] font-[400] text-[#000000]">{{ infor.nameTodo }}</p>
                <span class="h-[25px] px-2 text-center font-[600] bg-[#F9E2E2AD] rounded-md"
                    :class="infor.type === 'hight' ? 'text-[#169C00]' : infor.type === 'medium' ? 'text-[#C1B46E]' : 'text-[#C81818]'">
                    {{ infor.value }}
                </span>
            </div>
            <div @click="handleDelete" class="flex items-center justify-center gap-4">
                <img class="w-[20px] h-[20px] hover:cursor-pointer" :src="images.trashIcon" alt="icon trash">
            </div>
        </li>
        <div class="flex flex-col mt-[60px] gap-4">
            <Input type="input" title="Tiêu đề" />
            <input @click="handleChangeContentItem" type="submit"
                class="px-[30px] py-[14px] bg-[#F07F7F] text-white self-center rounded-md cursor-pointer"
                value="Lưu thay đổi" />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import images from '~/assets/images';
import { useNameTodo, useLoading } from '~/composables/state';

const name = useNameTodo()
const loading = useLoading()

const infor = useState(("infor", () => {}))
const params = process.client && new URLSearchParams(document.location.search).get("id");
const index = process.client && new URLSearchParams(document.location.search).get("index");

const handleGetItem = async () => {
    loading.value = true
    const result = await axios.get(`http://localhost:3001/todolist/edit?id=${params}`)
    infor.value = result.data
    name.value = infor.value.nameTodo
    loading.value = false
}
handleGetItem()

const handleDelete = async () => {
    loading.value = true
    await axios.post(`http://localhost:3001/todolist/${infor.value._id}`, { index: Number(index) })
    navigateTo("/")
    loading.value = false
}

const handleChangeContentItem = async () => {
    loading.value = true
    try {
        await axios.put(`http://localhost:3001/todolist/edit/${infor.value._id}`,
            {
                index: Number(index),
                data: { ...infor.value, nameTodo: name.value, slug: name.value.split(" ").join("-") }
            }
        )
        navigateTo("/")
        name.value = ""
        loading.value = false
    } catch (error) {
        console.log(error, "false edit item")
    }
}

</script>