<template>
  <aside class="navbar navbar-vertical navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu"
              aria-controls="sidebar-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="navbar-brand navbar-brand-autodark">
        <a href=".">
          <img src="/assets/vue.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image">
        </a>
      </h1>
      <div class="navbar-nav flex-row d-lg-none">
        <div class="nav-item dropdown">
          <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
             aria-label="Open user menu">
            <span class="avatar avatar-sm" style="background-image: url('src/assets/user.png')"></span>
            <div class="d-none d-xl-block ps-2">
              <div>Paweł Kuna</div>
              <div class="mt-1 small text-muted">UI Designer</div>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <a href="#" class="dropdown-item">Status</a>
            <a href="#" class="dropdown-item">Profile</a>
            <a href="#" class="dropdown-item">Feedback</a>
            <div class="dropdown-divider"></div>
            <a href="./settings.html" class="dropdown-item">Settings</a>
            <a href="#" class="dropdown-item">Logout</a>
          </div>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-3">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'dashboard'}">
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <LayoutDashboardIcon></LayoutDashboardIcon>
                </span>
              <span class="nav-link-title">
                  Dashboard
                </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'dashboard'}">
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <FileDescriptionIcon></FileDescriptionIcon>
                </span>
              <span class="nav-link-title">Groups</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'dashboard'}">
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <LinkIcon></LinkIcon>
                </span>
              <span class="nav-link-title">Users</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import {reactive} from "vue";
import {LayoutDashboardIcon, AugmentedReality2Icon, FileDescriptionIcon, LinkIcon, AB2Icon, MailIcon, BugIcon} from "vue-tabler-icons";

const props = defineProps({
  initialOpen: {
    type: Boolean,
    default: true,
  }
})
const menu = reactive({
  logs: props.initialOpen,
  xss: props.initialOpen
});
</script>

<style scoped>

</style>