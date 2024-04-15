<template>
  <div class="container">
    <form @submit.prevent="register" class="form-panel">
      <!-- Username -->

      <label for="username">Username: </label>
      <input
        class="form-input"
        type="text"
        id="username"
        v-model="form.username"
      />

      <validationerrors :errors="validation_errors.username"></validationerrors>

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

      <!-- Repassword -->

      <label for="repassword">RePassword: </label>
      <input
        class="form-input"
        type="password"
        id="repassword"
        v-model="form.repassword"
      />

      <validationerrors
        :errors="validation_errors.repassword"
      ></validationerrors>

      <button class="button" type="submit">Sign Up</button>
      <button class="button gray" id="loginButton" @click="$router.push('/')">
        Login
      </button>
    </form>
  </div>
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
        username: "",
        email: "",
        password: "",
        repassword: "",
      },
      validation_rules: {
        username: ["required", "min:3"],
        email: ["required", "min:8", "email"],
        password: ["required", "min:5"],
        repassword: ["required", "min:5"],
      },
      validation_errors: {},
    };
  },
  methods: {
  log() {
    this.$router.push("/");
  },
  empt() {
    if (this.validation === false) {
      console.log("error");
    }
  },
  register() {
    if (
      this.validate(this.form, this.validation_rules, this.validation_errors)
    ) {
      this.saveUser();
    } else {
    }
  },
  saveUser() {
    const newuser = {
      email: this.form.email,
      password: this.form.password,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isRegistered = users.some(user => user.email === this.form.email);

    if (isRegistered) {
      this.validation_errors.email = ["Böyle bir email zaten var."];
    } else {
      users.push(newuser);
      localStorage.setItem("users", JSON.stringify(users));

      this.router.push("/");

      localStorage.setItem("user", this.form.email);
    }
  },
    auth() {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      localStorage.setItem("user", this.form.email);
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
