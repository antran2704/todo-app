<template>
  <div class="relative w-full max-h-full overflow-hidden">
    <div class="container relative flex items-center justify-start">
      <NuxtPage />
      <div class="create" :class="{ 'active': isOverlay }"></div>
    </div>
    <div v-if="loading" class="fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-white z-10">
      <img class="w-[80px] h-[80px]" :src="images.loadIcon" />
    </div>
    <div id="toast" class="fixed top-10 right-0 w-[300px] z-10">
      <div v-for="toast in toasts">
        <Toast :title="toast.title" :type="toast.type" :id="toast.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import images from "~/assets/images/index";
import { useOverlay, useLoading, useToast } from "~/composables/state"
const loading = useLoading()
const isOverlay = useOverlay()
const toasts = useToast();
</script>

<style lang="scss">
.create {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  border-radius: 30%;
  transition: all ease-in-out 1s;
  opacity: 0;
  z-index: 0;

  &.active {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #A5C9CA;
    opacity: 1;
    border-radius: 8px;
    z-index: 2;
  }
}
</style>