<template>
    <div class="popup flex items-center justify-between w-full bg-white px-5 py-5 my-2 rounded-l-lg overflow-x-hidden"
        :class="type">
        <div>
            <font-awesome-icon :icon="faCircleCheck" class="popup__icon text-[20px] text-[#71be34]" />
        </div>
        <div class="popup__title text-black text-[18px] font-[400]">
            {{ title }}
        </div>
        <div @click="() => deleteToast(id)">
            <font-awesome-icon :icon="faXmark" class="text-[20px] text-black cursor-pointer" />
        </div>
        <div class="popup__process"></div>
    </div>
</template>

<script setup>
import { useToast } from '~/composables/state';
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { handleDeleteToast } from "~/helper/index"

const toasts = useToast()

const deleteToast = (id) => {
    handleDeleteToast(toasts,id)
}
</script>

<script>

export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        id: {
            type: Number
        }
    },
}
</script>

<style lang="scss">
.popup {
    position: relative;
    transform: translateX(100%);
    animation: popupIn ease 0.6s forwards, popupOut ease 0.6s 4.6s forwards;

    &.success {
        .popup__icon {
            color: #71be34;
        }

        .popup__process {
            background-color: #71be34;
        }
    }

    &.danger {
        .popup__icon {
            color: #ff623d;
        }

        .popup__process {
            background-color: #ff623d;
        }
    }

    &.warn {
        .popup__icon {
            color: #ffb702;
        }

        .popup__process {
            background-color: #ffb702;
        }
    }

    .popup__process {
        position: absolute;
        width: 100%;
        height: 4px;
        bottom: 0;
        left: 0;
        animation: process linear 4s forwards;
        animation-delay: 0.6s;
    }
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(0%);
    }
}

@keyframes process {
    from {
        width: 100%;
    }

    to {
        width: 0%;
    }
}

@keyframes popupIn {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0%);
    }
}

@keyframes popupOut {
    0% {
        transform: translateX(0%);
    }

    50% {
        transform: translateX(-10%);
    }

    100% {
        transform: translateX(100%);
    }
}
</style>