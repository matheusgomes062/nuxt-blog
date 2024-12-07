<template>
    <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="flex flex-row">
        <!-- Home Link -->
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a itemprop="item" href="/">
                <span itemprop="name">Home</span>
            </a>
            <meta itemprop="position" content="1" />
        </li>
        <li class="mx-1">/</li>

        <!-- Blog Link -->
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a
                itemscope
                itemtype="https://schema.org/WebPage"
                itemprop="item"
                href="/blog/"
            >
                <span itemprop="name">Blog</span>
            </a>
            <meta itemprop="position" content="2" />
        </li>
        <li class="mx-1">/</li>

        <!-- Current Page -->
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" data-testid="current-crumb">
            <span itemprop="name">{{ headline }}</span>
            <meta itemprop="position" content="3" />
        </li>
    </ol>
</template>

<script setup>
defineProps({
    headline: {
        type: String,
        required: true,
    },
});
</script>