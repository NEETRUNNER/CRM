<script setup lang="ts">

import axios from 'axios';
import * as yup from 'yup'

import router from '@/router';
import { RouterLink } from 'vue-router';

import { useForm } from 'vee-validate';
import { onUpdated } from 'vue';

    onUpdated(() => { // То же самое что useEffect
        console.log(email.value)
        console.log(password.value)
    })

    const { handleSubmit, errors, defineField } = useForm({ // Используем хук useForm тоже самое что и из React-Hook-Form
      validationSchema: yup.object({
        email: yup.string().email("Неверный email").required("Email обязателен"),
        password: yup.string().min(6, 'Введите хотя бы 6 символов').required("Пароль обязателен")
      })
    });

    // Используем defineField для связи полей с формой
    const [email, emailAttrs] = defineField("email");
    const [password, passwordAttrs] = defineField("password");

    // Обработчик логина
    const loginHandler = handleSubmit(async (values) => { // handleSubmit сам указывает тип

        try {
            const request = await axios.post('https://crm-backend-gihc.onrender.com/auth/registration', {
                email: values.email,
                password: values.password
            });

            router.push('/login') // Сделали роут при успешной регистрации
            console.log("Успешная регистрация", request.data);

        } catch (error) {
            console.error("Ошибка регистрации", error);
        }
    });

</script>

<template>
    <section class="login h-screen">
        <div class="login-container md:w-full xs:w-11/12 flex justify-center mx-auto h-screen items-center">
            
           <!-- From Uiverse.io by ilkhoeri --> 
            <div class="card xm:w-[400px] xs:w-[300px]">

            <form novalidate @submit.prevent="loginHandler" class="form">
                <div class="title text-center">Регистрация аккаунта</div>

                <label class="label_input" for="email-input">Почта</label>
                <input
                v-model="email"
                spellcheck="false"
                class="input md:!p-2 xs:!p-1"
                type="email"
                name="email"
                id="email-input"
                />
                <div>{{ errors.email }}</div>

                <div class="frg_pss">
                <label class="label_input" for="password-input">Пароль</label>
                <RouterLink to="/login">Войти в аккаунт?</RouterLink>
                </div>
                <input
                v-model="password"
                spellcheck="false"
                class="input md:!p-2 xs:!p-1"
                type="text"
                name="password"
                id="password-input"
                />
                <div>{{ errors.password }}</div>

                <button type="submit" class="submit">Зарегистрировать аккаунт</button>
            </form>

            <!-- From Uiverse.io by JkHuger --> 
            <div class="cube md:block xs:hidden">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face right"></div>
                <div class="face left"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>
            </div>

            </div>
            
        </div>
    </section>  
</template>

<!-- v-model позволяет связывать стейт и елемент -->
<!-- v-on:click="функция" или @click="функция" = так мы можем повесить слушатель события на елемент -->