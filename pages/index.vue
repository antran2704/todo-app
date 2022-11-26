<template>
   <div
      class="relative bg-[#EFF5F5] pt-[30px] pb-[20px] w-full h-full flex flex-col rounded-lg shadow-sm shadow-[#00000040] z-[1]">
      <div class="px-5 flex items-center justify-between">
         <div>
            <p class="text-[18px] font-[400] text-[#6C4AB6]">Welcome Back</p>
            <h3 class="text-[24px] font-[600] text-[#6C4AB6] animate__animated animate__bounce">AnTran😊</h3>
         </div>
         <img class="w-[50px] h-[50px] rounded-full object-cover animate__animated animate__zoomIn"
            src="~/assets/images/me.jpg" alt="">
      </div>
      <div class="px-5 pt-4">
         <h1 class="text-[24px] font-[600] text-[#1E1E1E] text-center">Ghi chú</h1>
         <h2 class="text-[20px] font-[400] text-[#1E1E1E] py-[12px]">Tuần này</h2>
      </div>
      <div class="flex-1 flex flex-col mb-5 gap-5 overflow-auto list__item">
         <div v-for="list in todoList">
            <span v-if="list.data.length > 0" class="text-[16px] text-[#6C4AB6] font-[600] px-5">
               {{ format(new Date(list.date), 'dd-MM-yyyy') }}
            </span>
            <ul class="w-full px-5 py-2 flex flex-col justify-start gap-3">
               <li v-for="(todo, indexChildren) in list.data" :key="indexChildren"
                  class="w-full p-3 flex items-center justify-between rounded-xl item">
                  <div class="flex flex-col items-start gap-3">
                     <p class="text-[16px] font-[600] text-[#000000]">{{ todo.nameTodo }}</p>
                     <span class="h-[25px] px-2 text-center font-[600] bg-[#F9E2E2AD] rounded-md"
                        :class="todo.type === 'hight' ? 'text-[#169C00]' : todo.type === 'medium' ? 'text-[#C1B46E]' : 'text-[#C81818]'">{{
                              todo.value
                        }}</span>
                  </div>
                  <div class="flex items-center justify-center gap-4">
                     <div @click="handleGetIndexItem(list, indexChildren)">
                        <img class="w-[20px] h-[20px] hover:cursor-pointer" :src="images.editIcon" alt="icon edit">
                     </div>
                     <img class="w-[20px] h-[20px] hover:cursor-pointer"
                        @click="handleDeleteItem(todo._id, indexChildren)" :src="images.trashIcon" alt="icon trash">
                  </div>
               </li>
            </ul>
         </div>
      </div>
      <button @click="handleOverlay"
         class="relative ml-auto w-[60px] h-[60px] flex items-center justify-center p-4 mx-5 bg-[#FF5959] rounded-full shadow-sm shadow-[#00000040] cursor-pointer z-[10]">
         <img class="w-full h-full" :src="images.addIcon" alt="image">
      </button>
   </div>
</template>

<script setup>
import { useTodoList, useOverlay, useToast, useLoading } from '~/composables/state';
import images from '~/assets/images';
import { format } from 'date-fns'
import axios from "axios"
import { handleAddToast } from "~/helper/index"


const todoList = useTodoList()
const isOverlay = useOverlay()
const toasts = useToast()
const loading = useLoading()

const config = useRuntimeConfig()

const handleGetIndexItem = (item, index) => {
   navigateTo(`/edit/${item.data[index].nameTodo}?id=${item.data[index]._id}&index=${index}`)
}

const handleDeleteItem = async (idItem, childrenIndex) => {
   loading.value = true;
   try {
      await axios.post(`${config.public.url}/todolist/${idItem}`, { index: childrenIndex })
      const result = await axios.get(`${config.public.url}/todolist`);
      todoList.value = result.data;
      loading.value = false;
      handleAddToast(toasts, "success", "Xóa thành công")
   } catch (error) {
      loading.value = false;
      handleAddToast(toasts, "danger", "Xóa thất bại")
   }
}


const handleOverlay = () => {
   isOverlay.value = true

   setTimeout(() => {
      isOverlay.value = false
      navigateTo("/add")
   }, 1600)
}

definePageMeta({
   middleware: "todolist",
})
</script>

<style lang="scss">
.list__item {
   transition: all linear 0.2s;

   &::-webkit-scrollbar {
      background-color: transparent;
      width: 6px;
      overflow-y: overlay;
   }

   &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 10px;
      overflow-y: overlay;
   }

   &:hover {
      &::-webkit-scrollbar-thumb {
         background-color: rgba(0, 0, 0, 0.15);
      }
   }
}
</style>