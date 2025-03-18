<script setup lang="ts">

import axios from 'axios';
import * as yup from 'yup'
import router from '@/router';
import { RouterLink } from 'vue-router';

import { useForm } from 'vee-validate';
import { watch } from 'vue';

// Получаем ссылку на store
import { useStore } from '@/store/Store' // Импортурем store

// С помощью storeToRefs можно деструктурировать store и получить реактивные свойства
import { storeToRefs } from 'pinia'; // Импортурем стейт

    const store = useStore();
    const {token} = storeToRefs(store)

    const { handleSubmit, errors, defineField } = useForm({ // Используем хук useForm тоже самое что и из React-Hook-Form
      validationSchema: yup.object({
        email: yup.string().email("Неверный email").required("Email обязателен"),
        password: yup.string().min(6, 'Введите хотя бы 6 символов').required("Пароль обязателен")
      })
    });

    // Используем defineField для связи полей с формой
    const [email, emailAttrs] = defineField("email");
    const [password, passwordAttrs] = defineField("password");

    watch(token, (newValue, oldValue) => { // Такой хук может работать внутри функции
        console.log(newValue)
    })

    // Обработчик логина
    const loginHandler = handleSubmit(async () => { // handleSubmit сам указывает тип

        try {
            const request = await axios.post('http://localhost:4000/auth/login', {
                email: email.value,
                password: password.value
            });

            store.getToken(request.data) // Получаем экшен из Pinia с помощью store
            router.push('/tasks') // Сделали роут при успешном входе

            console.log("Успешный вход", request);

        } catch (error) {
            console.error("Ошибка входа", error);
        }
    });

</script>

<template>
    <section class="login h-screen">
        <div class="login-container md:w-full xs:w-11/12 flex justify-center mx-auto h-screen items-center">
            
           <!-- From Uiverse.io by ilkhoeri --> 
            <div class="card xm:w-[400px] xs:w-[300px]">

            <form novalidate @submit.prevent="loginHandler" class="form">
                <div class="title">Войти в аккаунт</div>

                <label class="label_input" for="email-input">Почта</label>
                <input
                v-model="email"
                spellcheck="false"
                class="input"
                type="email"
                name="email"
                id="email-input"
                />
                <div>{{ errors.email }}</div>

                <div class="frg_pss">
                <label class="label_input" for="password-input">Пароль</label>
                <RouterLink to="/register">Нет аккаунта?</RouterLink>
                </div>
                <input
                v-model="password"
                spellcheck="false"
                class="input"
                type="text"
                name="password"
                id="password-input"
                />
                <div>{{ errors.password }}</div>

                <button type="submit" class="submit">Войти в аккаунт</button>
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