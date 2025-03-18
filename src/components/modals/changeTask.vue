<script setup lang="ts">
import { useStore } from '@/store/Store';
import axios from 'axios';
import { storeToRefs } from 'pinia';

import { useForm } from 'vee-validate';
import { onMounted, ref, toRaw, watch } from 'vue';
import * as yup from 'yup';

    const store = useStore();
    const {taskId} = storeToRefs(store)

    const projectName = ref();

    const { handleSubmit, values, errors, defineField } = useForm({
        validationSchema: yup.object({
            taskname: yup.string().required("Название задачи обязательно"),
            deadline: yup.string().required("Дедлайн обязателен"),
            status: yup.string().required("Статус обязателен"),
        }),
    });

    const [taskname, taskNameAttrs] = defineField('taskname');
    const [deadline, deadlineAttrs] = defineField('deadline');
    const [status, statusAttrs] = defineField('status');

    const changeTask = handleSubmit(async () => {
        store.toggler('change-task')
            try {
                const request = await axios.put('https://crm-backend-gihc.onrender.com/tasks/changeTask', {
                    taskname: taskname.value,
                    deadline: deadline.value,
                    status: status.value,
                    token: store.token,
                    taskId: taskId
                });

                console.log(request)
                return request.data;
            } catch (error) {
                console.log(error);
            }
    })

    const deleteTask = async () => {
        store.toggler('delete-task')
        console.log('Удаление таски')
            try {
                const request = await axios.post('https://crm-backend-gihc.onrender.com/tasks/deleteTask', {
                    taskId: taskId,
                    token: store.token,
                })
                return request.data;
            } catch (error) {
                console.log(error)
            }
    }

    function getUserTasks () {
        const userTasks = toRaw(store.userTasks);
        const tasks = userTasks.filter(item => item._id === store.taskId)[0];

        if (tasks) {
            projectName.value = tasks.taskname;

            taskname.value = tasks.taskname;
            deadline.value = tasks.deadline;
            status.value = tasks.status;
        }
    }

    onMounted(() => {
        getUserTasks()
    })

    watch(taskId, (newValue) => {
        console.log(newValue)
        getUserTasks()
    })

</script>

<template>
    <div v-if="store.toggle && store.type === 'change-task'" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-5 rounded-lg shadow-md md:w-96 xs:w-72">

        <form class="modal-form flex flex-col gap-y-1 w-full" @submit.prevent="changeTask">

        <h2 class="text-lg font-semibold mb-3 uppercase">{{ projectName }}</h2>
        <input v-model="taskname" placeholder="Имя проекта" type="text" class="w-full border p-2 rounded font-mulish">
            <div class="input-error text-red-500 text-xs my-1 font-mulish">{{ errors.taskname }}</div>
        <input v-model="deadline" placeholder="Дедлайн проекта" type="text" class="w-full border p-2 rounded font-mulish">
            <div class="input-error text-red-500 text-xs my-1 font-mulish">{{ errors.deadline }}</div>

        <select v-model="status" class="font-plex block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-800 cursor-pointer transition">
            <option class="font-plex" value="В процессе">В процессе</option>
            <option class="font-plex" value="Завершен">Завершен</option>
            <option class="font-plex" value="Ожидается">Ожидается</option>
        </select>
        <div class="input-error text-red-500 text-xs my-1 font-exo2">{{ errors.status }}</div> 

        <div class="flex md:justify-end xs:justify-between gap-2 flex-wrap">
            <button type="button" @click="deleteTask" class="px-4 py-2 bg-red-500 text-white rounded font-plex">Удалить</button>

            <button type="button" @click="store.toggler('change-task')" class="px-4 py-2 bg-gray-200 rounded">Отмена</button>
            <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded font-plex">Изменить</button>
        </div>

      </form>

    </div>
  </div>
</template>