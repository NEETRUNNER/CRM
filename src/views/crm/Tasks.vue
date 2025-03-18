<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store/Store';
import { storeToRefs } from 'pinia';

    const store = useStore();
    const {} = storeToRefs(store); // Чтобы вытащить реактивное состояние используем storeToRefs

    onMounted(() => {
        store.getUserTasks();
    })

    const getTaskId = (id: string): void => {
        store.toggler('change-task');
        store.getTaskId(id)
    }
</script>

<template>
    <section class="tasks w-full bg-white">
            <div class="tasks-container w-3/4 h-screen mx-auto">

                <button @click="store.toggler('add-task')" class="px-5 py-2 max-w-max bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer ml-auto my-8">Добавить проект</button>

                <div class="table-container overflow-x-auto">
                    <table class="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead class="bg-gray-100 text-gray-800 uppercase text-sm">
                            <tr>
                                <th class="p-4 border text-left min-w-[150px] font-mulish">Задача</th>
                                <th class="p-4 border text-left min-w-[150px] font-mulish">Дедлайн</th>
                                <th class="p-4 border text-left min-w-[150px] font-mulish">Статус</th>
                                <th class="p-4 border text-left min-w-[150px] font-mulish">Дата создания</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="getTaskId(item._id)" v-for="item in store.userTasks" :key="item._id" 
                                class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
                                <td class="p-4 border cursor-pointer font-mulish uppercase">{{ item.taskname }}</td>
                                <td class="p-4 border cursor-pointer font-mulish uppercase">{{ item.deadline }}</td>
                                <td class="p-4 border cursor-pointer font-mulish uppercase">{{ item.status }}</td>
                                <td class="p-4 border cursor-pointer font-mulish uppercase">{{ item.createdAt }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
    </section>
</template>