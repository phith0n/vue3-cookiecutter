<template>
  <ul class="pagination ms-auto m-0">
    <li class="page-item" :class="{disabled: props.currentPage === 1}">
      <a class="page-link" href="#" @click.prevent="jump(1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-left" width="24"
             height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
             stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <polyline points="11 7 6 12 11 17"></polyline>
          <polyline points="17 7 12 12 17 17"></polyline>
        </svg>
      </a>
    </li>
    <li class="page-item" :class="{disabled: props.currentPage === 1}">
      <a class="page-link" href="#" @click.prevent="jump(props.currentPage - 1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <polyline points="15 6 9 12 15 18"></polyline>
        </svg>
      </a>
    </li>
    <li class="page-item" :class="{active: props.currentPage === page}" v-for="page in pages">
      <a class="page-link" href="#" @click.prevent="jump(page)">{{ '{{' }} page {{ '}}' }}</a>
    </li>
    <li class="page-item" :class="{disabled: props.totalPage === props.currentPage}">
      <a class="page-link" href="#" @click.prevent="jump(props.currentPage + 1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <polyline points="9 6 15 12 9 18"></polyline>
        </svg>
      </a>
    </li>
    <li class="page-item" :class="{disabled: props.totalPage === props.currentPage}">
      <a class="page-link" href="#" @click.prevent="jump(props.totalPage)">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-right" width="24"
             height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
             stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <polyline points="7 7 12 12 7 17"></polyline>
          <polyline points="13 7 18 12 13 17"></polyline>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script setup>
import {computed} from "vue";

const maxPage = 10;

const props = defineProps({
  total: Number,
  totalPage: Number,
  currentPage: Number,
  pageSize: Number
});

const pages = computed(() => {
  const {total, totalPage, currentPage, pageSize} = props;
  if (total <= 0) {
    return []
  }

  let startPage, endPage;
  if (totalPage <= maxPage) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPage;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPage / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPage / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPage;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPage) {
      // current page near the end
      startPage = totalPage - maxPage + 1;
      endPage = totalPage;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  // let startIndex = (currentPage - 1) * pageSize;
  // let endIndex = Math.min(startIndex + pageSize - 1, total - 1);

  // return object with all pager properties required by the view
  return Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
});

const emit = defineEmits(['update']);
const jump = page => {
  emit('update', page);
}
</script>

<style scoped>

</style>