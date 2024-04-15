<template>
  <div class="container">
    <div class="absolute top-5 right-5">
      <div @click="logout()">Logout</div>
    </div>
    <div class="content">
      <h1>Todo App</h1>
      <form @submit.prevent="addTodo">
        <div class="field">
          <div class="control">
            <input
              v-model="todo"
              type="text"
              class="input"
              placeholder="Görev Ekle"
            />
          </div>
          <button type="submit" class="button is-success">Ekle</button>
        </div>
      </form>

      <div v-for="todo in todos" :key="todo.id" class="card my-5 mx-5">
        <div class="card-content">
          <div class="media-left"></div>
          <div class="media-content">
            <p
              :class="{ done: todo.done }"
              @click="done(todo)"
              class="title is-4 cursor"
            >
              {{ todo.content }}
            </p>
            <button @click="removeTodo(todo.id)" class="button is-danger">
              Sil
            </button>
            <button @click="editTodo(todo)" class="button is-info">
              Güncelle
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const todo = ref("");
    const todos = ref([]);

    const email = localStorage.getItem("user");

    console.log(email);

    onMounted(() => {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        let user_todos = JSON.parse(savedTodos).filter((item) => {
          //  if(email==item.email){
          //      return true;
          //   }
          return email == item.email;
        });
        todos.value = user_todos;

      }
   
      
    });

    function addTodo() {
      todos.value.push({
        done: false,
        content: todo.value,
        id: Date.now(),
        email: email,
      });
      todo.value = "";
      localStorage.setItem("todos", JSON.stringify(todos.value));
    }

    function done(todo) {
      todo.done = !todo.done;
      localStorage.setItem("todos", JSON.stringify(todos.value));
    }

    function removeTodo(id) {
      todos.value = todos.value.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(todos.value));
    }

    function editTodo(todo) {
      const newText = prompt("Yeni görevinizi girin:", todo.content);
      if (newText !== null) {
        todo.content = newText;
        localStorage.setItem("todos", JSON.stringify(todos.value));
      }

    }

    const router = useRouter();

    return {
      todo,
      todos,
      addTodo,
      done,
      removeTodo,
      editTodo,
      router,
    };
  },
  methods: {
    logout() {
      this.router.push("./");
    },
  },
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}

.cursor {
  cursor: pointer;
}

h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: black;
}

.field {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84%;
  height: 100%;
  background-color: rgba(245, 245, 245, 0.521);
}

.card .button {
  margin: 5px;
}

p {
  color: indigo;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 650px;
  background-color: gray;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: auto;
}
</style>
