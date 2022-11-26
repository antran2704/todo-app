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
import { useTodoList, useNameTodo, useSelect, useDate, useLoading, useOverlay, useToast } from "~/composables/state"
import { handleAddToast } from "~/helper/index"
const config = useRuntimeConfig()

const todoList = useTodoList()
const nameValue = useNameTodo()
const selectValue = useSelect()
const dateValue = useDate()
const loading = useLoading()
const isOverlay = useOverlay()
const toasts = useToast();

nameValue.value = ""

const handleGetTodoList = async () => {
    const result = await axios.get(`${config.public.url}/todolist`)
    todoList.value = result.data
}

handleGetTodoList()

const getNameValue = async () => {
    if (nameValue.value !== "" && selectValue.value !== "" && dateValue.value !== "") {
        loading.value = true

        const item = todoList.value.find((item) => {
            return item.date === dateValue.value
        })

        if (item) {
            try {
                await axios.post(`${config.public.url}/todolist/add/${item._id}`,
                    {
                        nameTodo: nameValue.value,
                        type: selectValue.value,
                        value: selectValue.value === "hight" ? "Cao" : selectValue.value === "low" ? "Thấp" : "Trung Bình",
                        slug: nameValue.value.split(" ").join("-")
                    }
                )
            } catch (error) {
                handleAddToast(toasts, "danger", "Không thêm thành công")
            }
        } else {
            try {
                await axios.post(`${config.public.url}/todolist/add`,
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
            } catch (error) {
                handleAddToast(toasts, "danger", "Không thêm thành công")
            }
        }

        nameValue.value = ""
        selectValue.value = ""
        dateValue.value = ""
        navigateTo('/')
        loading.value = false
        handleAddToast(toasts, "success", "Thêm thành công")
    }
}

const handleOverlay = () => {
    isOverlay.value = true

    setTimeout(async () => {
        await navigateTo("/")
        isOverlay.value = false
    }, 1600)
}
</script>

