<template>
  <div class="d-flex row gx-0 vh-100">
    <div class="col-8 bg"></div>
    <div class="col-4 py-5 px-4">
      <h2 class="mb-4 title fw-light">Login</h2>
      <div class="d-flex">
        <div class="col-auto">
          <GoogleLogin
              v-if="googleClientID"
              :callback="onGoogleLogin"
              :clientId="googleClientID"
              :buttonConfig="buttonConfig"
          ></GoogleLogin>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import * as yup from 'yup';
import {onMounted, reactive, ref} from "vue";
import {Validator} from "@/utils/validator.js";
import {useRouter} from "vue-router";
import {GoogleLogin} from "vue3-google-login";
import {POSITION, useToast} from "vue-toastification";

const router = useRouter();
const buttonConfig = {
  type: 'standard',
  theme: 'filled_blue',
  size: 'large',
  text: 'signin_with',
}
const googleClientID = ref('');
const toast = useToast();

const onGoogleLogin = async data => {
  try {
    const response = await axios.post("/api/v1/google/login", {
      token: data.credential,
    })
    if (response.status === 200 && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      await router.push({name: 'dashboard'})
    }
  } catch (e) {
    console.error(e)
    toast.error(e.response.data.reason, {
      timeout: 3000,
      position: POSITION.TOP_CENTER,
    })
  }
}

const getConfig = async () => {
  try {
    const response = await axios.get("/api/v1/config")
    googleClientID.value = response.data.google_client_id
  } catch (e) {
    console.error(e)
  }
}

onMounted(getConfig)
</script>

<style scoped>
.bg {
  background: url("@/assets/bg.svg") repeat-y;
  background-size: 100%;
}
</style>