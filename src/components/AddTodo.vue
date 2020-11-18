<template>
    <div>
        <button type="button" class="btn btn-primary" @click="enableAddMode()">
            Add to Todos
        </button>

<div>{{ newTodos }}</div>

        <template v-if="selectedTodo">
            <div>
                <input class="new-todo" autofocus autocomplete="off" placeholder="New title" v-model.trim="newTitleTodo">
                <p v-show="!newTitleTodo">Add Title Todo</p>
            </div>

            <div>
                <label>Add input for New Task</label>
                <input type="button" class="btn btn-primary" @click="addNewTodo" value="+">
            </div>

            <div v-for="(newTodo, index) in newTodos" :key="newTodo.id_task">
            <div class="form-group" style="display:none;">
                <label :for="'newTodoId'+(index+1)">New Task Id {{ index + 1 }}</label>
                <input type="text" class="form-control" :id="'newTodoId'+(index+1)" v-model.number="newTodos[index].id_task">
            </div>

            <div class="form-group">
                <label :for="'newTodo'+(index+1)">New description of Task {{ index + 1 }}</label>
                <input type="text" class="form-control" :id="'newTodo'+(index+1)" placeholder="What needs to be done?" v-model.trim="newTodos[index].description">
                <input type="button" class="btn" @click="deleteNewTodo(index)" value="-">
                <p v-show="!newTodos[index].description">Add description of Task {{ index + 1 }}</p>
            </div>
            </div>

            <input type="button" class="btn btn-primary" @click="disableAddMode" value="Cancel">
            <input type="button" @click="saveTodos()" value="Save" :disabled="notEmpty">
        </template>
    </div>
</template>

<script>
    export default {
        name: "AddTodo",
        data() {
            return {
                selectedTodo: false,
                newTitleTodo: '',
                newTodos: [],
            };
        },
        computed: {
            notEmpty() {
                return !this.newTitleTodo && !this.newTodos[0].description ||
                this.newTodos[0].description && !this.newTitleTodo ||
                this.newTitleTodo && !this.newTodos[0].description ;
            }
        },
        methods: {
            enableAddMode() {
                this.newTodos = [{
                    id_task: 1,
                    description: '',
                    completed: false
                }];
                this.selectedTodo = true;
            },
            disableAddMode() {
                this.newTitleTodo = '';
                this.newTodos = [];
                this.selectedTodo = false;
            },
            saveTodos() {
                this.newTodos.forEach(
                    (item, i) => {
                        if (!item.description) {
                            this.newTodos.splice(i, 1);
                        }
                    });
                let item = {
                    title: this.newTitleTodo,
                    tasks: this.newTodos
                };
                this.$store.dispatch('todos/addItem', item);
            },
            addNewTodo() {
                this.newTodos.push({
                    id_task: this.newTodos.length + 1,
                    description: '',
                    completed: false
                });
            },
            deleteNewTodo(index) {
                this.newTodos.splice(index, 1);
            }
        }
    }
</script>