<template>
  <div class="page layout-fluid theme-light">
    <Sidebar :initial-open="true"></Sidebar>
    <Topbar></Topbar>

    <div class="page-wrapper">
      <div class="p-4">
        <div class="card">
          <div class="card-header">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link :to="{name: 'list'}">List</router-link>
                </li>
                <li class="breadcrumb-item active" v-if="!route.params.id">Create Object</li>
                <li class="breadcrumb-item active" v-if="route.params.id">
                  Update Object #{{ '{{' }}route.params.id{{ '}}' }}
                </li>
              </ol>
            </nav>
          </div>
          <div class="card-body" v-if="global.form">
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <div class="form-label">Name</div>
                <div>
                  <input class="form-control" type="text" v-model="global.form.state.name">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label required">Target URL</label>
                <div>
                  <input type="text"
                         class="form-control"
                         placeholder="https://..."
                         v-model="global.form.state.url"
                         :class="{'is-invalid': global.form.errors.url}"
                         @input="global.form.validateField('url')"
                  >
                  <div class="invalid-feedback" v-if="global.form.errors.url">{{ '{{' }} global.form.errors.url {{ '}}' }}</div>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-label">Hidden</div>
                <label class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="global.form.state.hidden">
                  <span class="form-check-label">Hidden the URL</span>
                </label>
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-primary me-2">
                  Save
                </button>
                <button type="button" class="btn me-2" @click="onCancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Foot></Foot>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive} from "vue";
import {POSITION, useToast} from "vue-toastification";
import axios from "axios";
import {Validator} from "@/utils/validator.js";
import * as yup from 'yup';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const global = reactive({
  form: null,
});

const newForm = initial => {
  return new Validator({
    name: yup.string(),
    url: yup.string().required().url().max(1024),
    hidden: yup.boolean(),
  }, initial)
}

const getObject = async id => {
  const response = await axios.get(`/api/object/${encodeURIComponent(id)}`)
  global.form = newForm(response.data)
}

onMounted(async () => {
  if (route.params.id) {
    await getObject(route.params.id);
  } else {
    global.form = newForm();
  }
})

const onSubmit = async () => {
  const err = global.form.validate();
  if (err) {
    toast.error(err, {
      timeout: 3000,
      position: POSITION.TOP_CENTER,
    })
    return
  }

  if (route.params.id) {
    await axios.post(`/api/object/${encodeURIComponent(route.params.id)}`, global.form.cast())
  } else {
    await axios.post('/api/object', global.form.cast())
  }

  await router.push({name: 'list'})
}

const onCancel = async () => {
  await router.push({name: 'list'})
}

</script>

<style scoped>

</style>