<template>
    <div class="pagination-list text-typography_primary">
        <!-- Chevron for Previous Page -->
        <nuxt-link
            v-show="currentPage > 1"
            class="pagination-item pagination-icon"
            :to="prevLink"
        >
            <IconsChevronDown class="transform rotate-90 h-6 w-6" width="24" height="24" />
        </nuxt-link>

        <!-- First Page -->
        <nuxt-link
            :class="['pagination-item', currentPage === 1 ? 'active' : '']"
            :to="baseUrl"
        >
            1
        </nuxt-link>

        <!-- Left Ellipsis -->
        <span v-show="showLeftEllipsis" class="pagination-extra">...</span>

        <!-- Middle Pages -->
        <template v-for="page in pageRange" :key="page">
            <nuxt-link
                v-show="page !== 1 && page !== totalPages"
                :class="['pagination-item', currentPage === page ? 'active' : '']"
                :to="generatePageUrl(page)"
            >
                {{ page }}
            </nuxt-link>
        </template>

        <!-- Right Ellipsis -->
        <span v-show="showRightEllipsis" class="pagination-extra">...</span>

        <!-- Last Page -->
        <nuxt-link
            v-show="totalPages > 1"
            :class="['pagination-item', currentPage === totalPages ? 'active' : '']"
            :to="generatePageUrl(totalPages)"
        >
            {{ totalPages }}
        </nuxt-link>

        <!-- Chevron for Next Page -->
        <nuxt-link
            v-show="currentPage < totalPages"
            class="pagination-item pagination-icon"
            :to="generatePageUrl(currentPage + 1)"
        >
            <IconsChevronDown class="transform -rotate-90 h-6 w-6" width="24" height="24" />
        </nuxt-link>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
    baseUrl: {
        type: String,
        required: true,
    },
    pageUrl: {
        type: String,
        required: true,
    },
});

const generatePageUrl = (pageNo) => `${props.pageUrl}${pageNo}/`;

const prevLink = computed(() => {
    return props.currentPage === 2 ? props.baseUrl : generatePageUrl(props.currentPage - 1);
});

// Dynamic range for pages
const pageRange = computed(() => {
    const start = Math.max(2, props.currentPage - 1);
    const end = Math.min(props.totalPages - 1, props.currentPage + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Ellipsis visibility
const showLeftEllipsis = computed(() => props.currentPage > 3);
const showRightEllipsis = computed(() => props.currentPage < props.totalPages - 2);
</script>

<style scoped>
.pagination-list {
    @apply flex flex-row w-full items-center justify-center;
}
.pagination-item.active {
    @apply bg-brand_primary text-background;
}
.pagination-item {
    @apply rounded-md border border-typography_primary px-2 py-1 mx-1 w-8 text-center h-full;
}
.pagination-item:not(.active):hover {
    @apply bg-brand_primary/25;
}
.pagination-extra {
    @apply w-8 text-lg leading-lg text-center;
}
.pagination-icon {
    @apply w-10 text-center;
}
</style>
