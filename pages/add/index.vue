<template>
    <div class="relative bg-[#EFFBFF] py-[20px] px-5  my-10 w-full rounded-lg shadow-sm shadow-[#00000040] z-[1]">
        <NuxtLink @click="handleOverlay" class="cursor-pointer">
            <img :src="images.backIcon" class="w-[30px] h-[30px]" alt="back icon">
        </NuxtLink>
        <h1 class="text-[20px] text-black font-[500] my-[20px] text-center">Tạo lịch trình cần làm mới nào !</h1>
        <img :src="images.group" class="mx-auto" alt="image">
        <div class="flex flex-col gap-4">
            <Input type="input" title="Tiêu đề" />
            <Input type="select" title="Độ ưu tiên" />
            <Input type="date" title="Ngày kết thúc" />
            <button type="submit" @click="getNameValue"
                class="px-[30px] py-[14px] bg-[#F07F7F] text-white self-center rounded-md cursor-pointer">
                Thêm
            </button>
        </div>
    </div>
</template>


<script setup>
import Input from '~/components/Input.vue';
import images from '~/assets/images/index';
import axios from "axios"
import { useTodoList, useNameTodo, useSelect, useDate, useLoading, useOverlay } from "~/composables/state"

const todoList = useTodoList()
const nameValue = useNameTodo()
const selectValue = useSelect()
const dateValue = useDate()
const loading = useLoading()
const isOverlay = useOverlay()

const handleGetTodoList = async () => {
    const result = await axios.get("http://localhost:3001/todolist")
    todoList.value = result.data
}

handleGetTodoList()


nameValue.value = ""

const getNameValue = async (e) => {
    if (nameValue.value !== "" && selectValue.value !== "" && dateValue.value !== "") {
        loading.value = true


        const item = todoList.value.find((item) => {
            return item.date === dateValue.value
        })

        if (item) {
            await axios.post(`http://localhost:3001/todolist/add/${item._id}`,
                {
                    nameTodo: nameValue.value,
                    type: selectValue.value,
                    value: selectValue.value === "hight" ? "Cao" : selectValue.value === "low" ? "Thấp" : "Trung Bình",
                    slug: nameValue.value.split(" ").join("-")
                }
            )
        } else {
            await axios.post(`http://localhost:3001/todolist/add`,
                {
                    date: dateValue.value,
                    data: [
                        {
                            nameTodo: nameValue.value,
                            type: selectValue.value,
                            value: selectValue.value === "hight" ? "Cao" : selectValue.value === "low" ? "Thấp" : "Trung Bình"
                        }
                    ]
                }
            )
        }

        nameValue.value = ""
        selectValue.value = ""
        dateValue.value = ""
        navigateTo('/')
        loading.value = false
    }
}

const handleOverlay = () => {
    isOverlay.value = true
    
    setTimeout(() => {
        isOverlay.value = false
        navigateTo("/")
    }, 1600)
}
</script>

