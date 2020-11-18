<template>
  <section class="todo">
    <header class="header">
      <h1>{{ todoItem.title }}</h1>
      <div>{{ todoItem }}</div>
    </header>

    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li
          v-for="task in filteredTasks"
          class="todo"
          :key="task.id_task"
          :class="{ completed: task.completed }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="task.completed" />
            <label>{{ task.description }}</label>
            <button class="destroy" @click="removeTask(task.id_task)">-</button>
          </div>
          <input class="edit" type="text" v-model="task.description" />
        </li>
      </ul>
      <button class="" @click="cancelEdit">Cancel</button>
      <button class="" @click="doneEdit" >Save</button>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
      </span>
      <button class="clear-completed" @click="removeCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
let filters = {
  all: function(tasks) {
    return tasks;
  },

  active: function(tasks) {
    return tasks.filter(function(task) {
      return !task.completed;
    });
  },

  completed: function(tasks) {
    return tasks.filter(function(task) {
      return task.completed;
    });
  },
};

export default {
  name: "Todo",

  data() {
    return {
      todoTitle: '',
      todoTasks: [],
      visibility: "all"
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },

    todoItem() {
      return this.$store.getters["todos/item"](this.id);
    },

    filteredTasks() {
      this.todoTasks = this.todoItem.tasks.slice();
    
      return filters[this.visibility](this.todoTasks);
    },

    remaining() {
      return filters.active(this.todoTasks).length;
    },

    allDone: {
      get() {
        return this.remaining === 0;
      },

      set(value) {
        this.todoTasks.forEach(function(task) {
          task.completed = value;
        });
      },
    }
  },

  filters: {
    pluralize(n) {
      return n === 1 ? "item" : "items";
    },
  },

  methods: {
    removeTask(id) {
      let i = this.todoTasks.findIndex(item => item.id_task === id);
      console.log(this.todoTasks[i]);
      this.todoTasks = this.todoTasks.splice(i, 1);
    },

    handler() {
      let item = {
        id: this.todoItem.id,
        title: this.todoItem.title,
        tasks: this.todoTasks,
      }

      this.$store.dispatch("todos/editItem", item);
    },

    doneEdit() {
      this.todoTasks.forEach((item, i) => {
        if (!item.description) {
          this.todoTasks.splice(i, 1);
        }
      });

      this.handler;

      // this.$router.push('/todos');
    },

    cancelEdit() {
      this.todoTasks = this.todoItem.tasks;
    },

    removeCompleted() {
      this.todoTasks = filters.active(this.todoTasks);
    }
  },

  created() {
    this.$store.dispatch("todos/loadItems");
  }
};
</script>

<style scoped lang="scss">

</style>
