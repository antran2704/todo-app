<template>
    <div
        class="relative bg-[#EFF5F5] px-5 pt-[40px] pb-[20px] w-full flex flex-col rounded-lg shadow-sm shadow-[#00000040] z-[1]">
        <h1 class="text-[30px] font-bold text-center">Agent Login</h1>
        <p class="text-[18px] text-[#363636] text-center mt-3"> Hey, Enter your details to get sign in your account</p>
        <div class="flex flex-col mt-8 gap-4">
            <div class="flex flex-col items-start gap-1">
                <span class="text-[16px] text-[#363636] font-[500]">User name</span>
                <input @input="(e) => userName = e.target.value" :value="userName" name="userName" required type="text"
                    placeholder="Enter your user name"
                    class="input w-full px-[16px] py-[10px] text-[16px] font-[400] text-black border-[2px] border-solid border-[rgba(189,101,101,0.4)] focus:border-[#F07F7F]  rounded-[10px] placeholder:text-[#533636]">
            </div>
            <div class="flex flex-col items-start gap-1">
                <span class="text-[16px] text-[#363636] font-[500]">Password</span>
                <div class="relative w-full">
                    <input @input="handleCheckPassword" :value="userPassword" name="password" required type="password"
                        placeholder="Enter your password"
                        class="input w-full pl-[16px] pr-12 py-[10px] text-[16px] font-[400] text-black border-[2px] border-solid border-[rgba(189,101,101,0.4)] focus:border-[#F07F7F]  rounded-[10px] placeholder:text-[#533636]">
                    <font-awesome-icon v-if="isShowPassword" @click="handleShowPassword" :icon="faEye"
                        class="absolute w-[20px] top-[50%] right-5 translate-y-[-50%] cursor-pointer z-[2]" />
                    <font-awesome-icon v-else :icon="faEyeSlash" @click="handleShowPassword"
                        class="absolute w-[20px] top-[50%] right-5 translate-y-[-50%] cursor-pointer z-[2]" />
                </div>
                <p class="login text-[14px] font-[500]" :class="{ 'error': isLogin }">{{ contentErrorPassword }}</p>
            </div>
        </div>
        <button v-if="isLoading" @click="handleCheckUser"
            class="max-h-[52px] px-[30px] py-[14px] mt-3 bg-[#F07F7F] text-white rounded-md">
            <font-awesome-icon :icon="faSpinner" class="login__loading text-[20px]" />
        </button>
        <button v-else @click="handleCheckUser"
            class="login-btn px-[30px] py-[14px] mt-3 bg-[#F07F7F] text-white rounded-md">
            Sign in
        </button>
        <p class="text-[16px] text-center font-[600] w-[60%] my-8 mx-auto">
            Made by AntranDev 2022 with many love
            <span class="text-[#F07F7F]">❤</span>
        </p>
    </div>
</template>

<script setup>
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const config = useRuntimeConfig();

let userName = useState("userName", () => "")
let userPassword = useState("password", () => "")
let isLogin = useState("isLogin", () => false)
let isShowPassword = useState("showPassword", () => false)
let contentErrorPassword = useState("contentError", () => "Password or user name was wrong!!!")
const isLoading = useState("loadingLogin", () => false)

const handleShowPassword = () => {
    const input = document.querySelector("input[name='password']")
    isShowPassword.value = !isShowPassword.value
    isShowPassword.value ? input.type = "text" : input.type = "password"
}

const handleDissableBtn = () => {
    const btn = document.querySelector(".login-btn")
    if (userName.value !== '' || userPassword.value !== '') {
        btn.classList.add("active")
    } else {
        btn.classList.remove("active")
    }
}

const handleCheckPassword = (e) => {
    handleDissableBtn()
    isLogin.value = false;
    userPassword.value = e.target.value
}

const handleCheckUser = async () => {
    isLoading.value = true;
    if (userName.value !== '' && userPassword.value !== '') {
        const name = userName.value;
        const password = userPassword.value;
        const btn = document.querySelector(".login-btn")

        const token = await axios.post(`${config.public.url}/user/login`, { name, password })

        // // save token in localstorage
        localStorage.setItem("token", token.data);
        if (token.data !== "user not exit") {
            navigateTo("/")
            isLoading.value = false
        } else {
            userPassword.value.length < 6
                ? contentErrorPassword.value = "Password must be than 6 characters"
                : contentErrorPassword.value = "Password or user name was wrong!!!"

            userPassword.value = ''
            isLogin.value = true;
            btn.classList.remove("active")
            isLoading.value = false
        }

    }
}

</script>

<style lang="scss">
.login {
    color: transparent;
    opacity: 0;
    transition: all ease 0.2s;

    &.error {
        color: #F07F7F;
        opacity: 1;
        animation: ring ease 0.2s forwards;
    }
}

.login-btn {
    opacity: 0.8;
    cursor: alias;
    pointer-events: none;
    transition: all ease 0.2s;

    &.active {
        opacity: 1;
        cursor: pointer;
        pointer-events: all;
    }
}

.login__loading {
    animation: spinner linear 1s infinite;
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);

    }
}

@keyframes ring {
    0% {
        transform: rotate(2deg);
    }

    25% {
        transform: rotate(-2deg);
    }

    50% {
        transform: rotate(2deg);
    }

    75% {
        transform: rotate(-2deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>