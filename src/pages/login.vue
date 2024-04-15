<template>
  <div class="container">
    <form @submit.prevent="login" class="form-panel">
      <!-- Email -->
      <label for="email">Email: </label>
      <input class="form-input" type="text" id="email" v-model="form.email" />
      <validationerrors :errors="validation_errors.email"></validationerrors>

      <!-- Password -->
      <label for="password">Password: </label>
      <input
        class="form-input"
        type="password"
        id="password"
        v-model="form.password"
      />
      <validationerrors :errors="validation_errors.password"></validationerrors>

      <div class="checkbox">
        <input type="checkbox" value="Remember-me" />
        <span class="flex-1">Remember me</span>
      </div>
      <div class="flex gap-2 flex-row mt-4">
        <button
          class="button gray"
          id="registerButton"
          @click="$router.push('/register')"
        >
          Sign Up
        </button>
        <button @click="saveEmail" class="button" id="loginBtn" type="submit">
          Login
        </button>
      </div>
    </form>
  </div>
  <div></div>
</template>

<script>
import { useRouter } from "vue-router";
import { validate } from "@/helpers/validationHelper";
import validationerrors from "@/components/validationerrors.vue";

export default {
  components: {
    validationerrors,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      validation_rules: {
        email: ["required", "min:8", "email"],
        password: ["required", "min:5"],
      },
      validation_errors: {},
    };
  },
  methods: {
    reg() {
      this.$router.push("/register");
    },
    empt() {
      if (this.validation === false) {
        console.log("error");
      }
    },
    login() {
      if (this.validate(this.form, this.validation_rules, this.validation_errors)) {
        if (this.checkUser()) {
          alert("Giriş Başarılı");
          this.$router.push("/empty");
        } else {
          alert("Bilgileriniz Hatalı");
        }
      }
    },
    checkUser() {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      return users.some(user => user.email === this.form.email && user.password === this.form.password);
    },
    auth() {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      let email = this.form.email;  
      let password = this.form.password;

      let user = users.find(function(user){
        return user.email === email && user.password === password;
      });
    },
  },
  setup(props) {
    const router = useRouter();

    return {
      router,
      validate,
    };
  },
};
</script>


<style scoped>
.form-panel {
  height: 55vh;
  width: 300px;
  margin: 100px auto;
  background-color: darkslategray;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  overflow-x: hidden;
  box-shadow: 0 0 7px black;

  @apply p-3 rounded-2xl;
}

.form-panel > * {
  width: 100%;
}

.button {
  height: 50px;
  width: 100%;
  border-radius: 5px;
  background-color: lightseagreen;
  color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  box-shadow: 0 0 3px black;
}

.button:hover {
  background-color: #41c6bf;
  border-bottom: black;
  color: #37474f;
}

.button.gray {
  background-color: #ffffff;
  color: #37474f;
}

.button.gray:hover {
  background-color: #fafafa;
}

.form-input {
  font-size: 20px;
  background-color: lightcyan;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 5px;
  box-shadow: 0 0 3px black;
}

label {
  font-size: 17px;
  margin: 5px;
  color: whitesmoke;
  margin: 10px;
}

.checkbox {
  display: flex;
  margin: 10px;
  font-size: 15px;
  color: whitesmoke;
}
</style>
