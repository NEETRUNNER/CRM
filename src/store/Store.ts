export interface Task {
    taskname: string;
    technologies: string;
    deadline: string;
    status: string;
    createdAt: number | string;
    _id: string;
};

export interface User {
    email: string;
    password: string;
    tasks: Task[];
    _id: string;
}

import { defineStore } from "pinia";
import Cookies from 'js-cookie'; // Используем библиотеку js-cookie для сохранения данных в куки
import axios from "axios";

export const useStore = defineStore('main', {
    state: () => ({
        userData: [] as User[],
        userTasks: [] as Task[],

        taskId:  '',

        token: Cookies.get('token') || null, // Сохраняем токен в куки

        toggle: false,
        type: ''
    }),
    actions: { /* actions - аналог dispatch + actions в Redux/Zustand.Используется для изменения state (можно мутировать данные напрямую). */
        getToken(token: string) { // Схожий принцип работы с Redux ToolKit можно мутировать данные напрямую как при использовании ToolKit + используется такой же immer стиль
            this.token = token;
            Cookies.set('token', token, {expires: 1}) // Записываем токен в куки expires отвечает за удаление токена из куки например через 1 день
        },

        toggler(type: string) {
            this.toggle = !this.toggle; // То же самое как работает action.payload, то-есть сюда можно передать что угодно
            this.type = type;
        },

        deleteToken() { // Схожий принцип работы с Redux ToolKit можно мутировать данные напрямую как при использовании ToolKit + используется такой же immer стиль
            this.token = null;
            Cookies.remove('token'); // Так можем удалить токен из куки
        },
        
        getTaskId(taskId: string) {
            this.taskId = taskId;
        },

        async getUser() {
            try {
                const user = await axios.post('https://crm-backend-gihc.onrender.com/tasks/getUser', {
                    token: this.token
                })
                console.log(user.data)
                this.userData = user.data;
                return user.data;
            } catch(error) {
                console.log(error)
                return error;
            }
        },

        async getUserTasks() {
            try {
                const user = await axios.post('https://crm-backend-gihc.onrender.com/tasks/getUser', {
                    token: this.token
                })
                console.log(user.data)
                this.userTasks = user.data.tasks;
                return user.data;
            } catch(error) {
                console.log(error)
                return error;
            }
        },
    },
    
    persist: { // Настроили работу куки
        storage: {
            getItem: (key) => Cookies.get(key) || '',
            setItem: (key, value) => Cookies.set(key, value, {expires: 1})
        }
    }
})