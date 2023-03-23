<template>
  <div class="page layout-fluid theme-light">
    <Sidebar :initial-open="true"></Sidebar>
    <Topbar></Topbar>

    <div class="page-wrapper">
      <div class="p-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">List</h4>
          </div>
          <div class="card-body">
            <div class="d-flex flex-wrap">
              <div class="col-auto me-2">
                <router-link type="button" class="btn btn-primary" :to="{name: 'form'}">
                  <CirclePlusIcon size="16" class="me-1"></CirclePlusIcon>
                  Create
                </router-link>
              </div>
              <div class="col-auto ms-auto me-2">
                <input type="text" class="form-control" id="keyword" placeholder="target URL" v-model="filter.keyword" @keydown.enter="onSearch">
              </div>
              <div class="col-auto">
                <div class="d-flex">
                  <button type="button" class="btn btn-primary me-2" @click="onSearch">
                    <SearchIcon class="me-1" size="16"></SearchIcon>
                    Search
                  </button>
                  <button type="button" class="btn btn-outline-secondary" @click="onReset">
                    <RotateClockwiseIcon class="me-1" size="16"></RotateClockwiseIcon>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive mt-2">
            <table class="table card-table table-vcenter datatable">
              <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">URL</th>
                <th scope="col">Hidden</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="obj in pager.data" :key="obj.id">
                <td>{{ '{{' }} obj.name {{ '}}' }}</td>
                <td>{{ '{{' }} obj.url {{ '}}' }}</td>
                <td>
                  <CheckIcon v-if="obj.reserve_params" class="text-success"></CheckIcon>
                  <XIcon v-else class="text-danger"></XIcon>
                </td>
                <td class="action">
                  <div class="btn-list flex-nowrap justify-content-end">
                    <router-link type="button" class="btn" :to="{name: 'form', params: {'id': obj.id}}">Edit</router-link>
                    <div class="dropdown">
                      <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown"
                              aria-expanded="false">
                        More
                      </button>
                      <div class="dropdown-menu dropdown-menu-end" style="">
                        <a class="dropdown-item" href="#" @click.prevent="deleteObject(obj.id)">Delete</a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer d-flex align-items-center">
            <p class="m-0 text-muted">{{ '{{' }} pager.statistic() {{ '}}' }}</p>
            <Pagination :total="pager.total"
                        :total-page="pager.totalPage"
                        :current-page="pager.currentPage"
                        :page-size="pager.pageSize"
                        @update="onPageChange"
            ></Pagination>
          </div>
        </div>
      </div>
      <Foot></Foot>
    </div>
  </div>
</template>

<script setup>
import {Pager} from "@/utils/pager.js";
import dayjs from "dayjs";
import {useRoute, useRouter} from "vue-router";
import {refreshWithFilter} from "@/utils/url.js";
import {SearchIcon, RotateClockwiseIcon, CirclePlusIcon, CheckIcon, XIcon} from "vue-tabler-icons";
import {onMounted, reactive} from "vue";
import axios from "axios";
import {POSITION, useToast} from "vue-toastification";

const route = useRoute();
const router = useRouter();
const pager = reactive(new Pager());
const toast = useToast()
const filter = reactive({
  keyword: route.query.keyword,
  page: route.query.page || 1,
})

const getList = async () => {
  const response = await axios.get('/api/object', {
    params: {
      keyword: filter.keyword,
      page: filter.page,
      size: 10,
    }
  })
  pager.populate(response.data)
}

const deleteObject = async id => {
  await axios.delete(`/api/object/${encodeURIComponent(id)}`)
  await getList();
  toast.success(`Delete Object #${id} success`, {
    timeout: 3000,
    position: POSITION.TOP_CENTER,
  })
}

onMounted(async () => {
  await getList();
})

const onReset = async () => {
  filter.keyword = ''
  filter.page = 1
  await refreshWithFilter(router, 'list', {})
  await getList()
}

const onSearch = async () => {
  filter.page = 1
  await refreshWithFilter(router, 'list', filter)
  await getList()
}

const onPageChange = async page => {
  filter.page = page
  await refreshWithFilter(router, 'list', filter)
  await getList()
}
</script>

<style scoped lang="scss">
table.table {
  td {
    word-break: break-all;
  }
}
</style>