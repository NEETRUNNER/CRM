<script setup lang="ts">
import { useStore } from '@/store/Store';
import axios from 'axios';

import { useForm } from 'vee-validate';
import { onMounted, watch } from 'vue';
import * as yup from 'yup';

    const store = useStore();

    const { handleSubmit, values, errors, defineField } = useForm({
        validationSchema: yup.object({
            taskname: yup.string().required("Название задачи обязательно"),
            deadline: yup.string().required("Дедлайн обязателен"), /* .matches(/^\d+$/, "Дедлайн должен иметь только цифры") */
            status: yup.string().required("Статус обязателен"),
        }),
    });

    const [taskname, taskNameAttrs] = defineField('taskname');
    const [deadline, deadlineAttrs] = defineField('deadline');
    const [status, statusAttrs] = defineField('status');

    const addTask = handleSubmit(async () => {
        try {
            const request = await axios.post('https://crm-backend-gihc.onrender.com/tasks/addTask', {
                taskname: taskname.value,
                deadline: deadline.value,
                status: status.value,
                token: store.token,
            });

            console.log(request)
            return request.data;
        } catch (error) {
            console.log(error);
        } finally {
            taskname.value = '',
            deadline.value = '',
            status.value = ''

            store.toggler('close-task')
        }
    })

    onMounted(() => {
        status.value = "В процессе";
    });

</script>

<template>
    <div v-if="store.toggle && store.type === 'add-task'" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-5 rounded-lg shadow-md md:w-96 xs:w-72">

        <form class="modal-form flex flex-col gap-y-1 w-full" @submit.prevent="addTask">

        <h2 class="text-lg font-semibold mb-3 uppercase">Создать задачу</h2>
        <input v-model="taskname" placeholder="Имя задачи" type="text" class="w-full border p-2 rounded font-mulish">
            <div class="input-error text-red-500 text-xs my-1 font-mulish">{{ errors.taskname }}</div>
        <input v-model="deadline" placeholder="Дедлайн задачи" type="text" class="w-full border p-2 rounded font-mulish">
            <div class="input-error text-red-500 text-xs my-1 font-mulish">{{ errors.deadline }}</div>

        <select v-model="status" class="font-mulish block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-800 cursor-pointer transition">
            <option class="font-mulish" value="В процессе">В процессе</option>
            <option class="font-mulish" value="Завершен">Завершен</option>
            <option class="font-mulish" value="Ожидается">Ожидается</option>
        </select>
        <div class="input-error text-red-500 text-xs my-1 font-exo2">{{ errors.status }}</div>

        <div class="flex justify-end gap-2">
            <button type="button" @click="store.toggler('add-task')" class="px-4 py-2 bg-gray-200 rounded">Отмена</button>
            <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded">Создать</button>
        </div>

      </form>

    </div>
  </div>
</template>

<!-- <input v-model="status" placeholder="Статус проекта" type="text" class="w-full border p-2 rounded">
            <div class="input-error text-red-500 text-xs my-1">{{ errors.status }}</div>   -->