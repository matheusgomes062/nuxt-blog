<template>
    <main class="blog-post-text">
        <ContentDoc>
            <template v-slot="{ doc }">
                <Section id="blog-title" type="header">
                    <div class="blog-header">
                        <!-- Breadcrumbs -->
                        <Breadcrumbs :headline="doc.headline" />

                        <!-- Publish date -->
                        <span class="blog-date">
                            {{ $formatDate(doc.date) }}
                        </span>
                    </div>

                    <!-- Headline -->
                    <h1 class="blog-headline">{{ doc.headline }}</h1>
                    <p class="blog-excerpt">{{ doc.excerpt }}</p>

                    <div class="blog-footer">
                        <!-- Author -->
                        <div>
                            <span>
                                By
                                <a :href="doc.authorUrl" target="_blank" rel="noopener noreferrer" class="blog-author">
                                    {{ doc.author }}
                                </a>
                            </span>
                        </div>

                        <!-- Social Share -->
                        <NavShareIcons :headline="doc.headline" :excerpt="doc.excerpt" :path="doc._path + '/'" />
                    </div>
                </Section>

                <!-- Content Section -->
                <Section id="main" class="content-section">
                    <!-- Table of Contents -->
                    <BlogTableOfContents v-if="doc.body?.toc?.links" :links="doc.body.toc.links" />

                    <!-- Blog Content -->
                    <article class="prose">
                        <span
                            v-if="doc.dateUpdated"
                            class="update-date"
                        >
                            (Updated: {{ $formatDate(doc.dateUpdated) }})
                        </span>
                        <ContentRenderer :value="doc" />
                    </article>

                    <!-- Related Articles -->
                    <div v-if="relatedArticles?.length" class="related-articles">
                        <BlogRelatedArticles :surround="relatedArticles" />
                    </div>
                </Section>

                <!-- Scroll to Top -->
                <NavScrollTopIcon />
            </template>

            <!-- Error View -->
            <template #not-found>
                <SectionsError />
            </template>
        </ContentDoc>
    </main>
</template>

<script setup>
import Breadcrumbs from '@/components/blog/breadcrumbs.vue';
import NavShareIcons from '@/components/nav/shareIcons.vue';
import BlogTableOfContents from '@/components/blog/tableOfContents.vue';
import BlogRelatedArticles from '@/components/blog/relatedArticles.vue';
import NavScrollTopIcon from '@/components/nav/scrollTopIcon.vue';

const { $formatDate } = useNuxtApp();
const { path } = useRoute();
const cleanPath = path.replace(/\/+$/, '');

const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
    try {
        const article = await queryContent('/blog').where({ _path: cleanPath }).findOne();
        const surround = await queryContent('/blog')
            .sort({ date: -1 })
            .only(['_path', 'headline', 'excerpt'])
            .findSurround(cleanPath, { before: 1, after: 1 });

        return { article, surround };
    } catch (err) {
        console.error('Error fetching content:', err);
        throw err;
    }
});

const relatedArticles = data?.value?.surround?.filter(Boolean);

// Metadata Setup
const baseUrl = 'https://example.com';
const canonicalPath = baseUrl + (path + '/').replace(/\/+$/, '/');
const image = data.value?.article?.socialImage?.src
    ? baseUrl + data.value.article.socialImage.src
    : baseUrl + '/default-image.webp';

useHead({
    title: data.value?.article?.headline || 'Blog',
    meta: [
        { name: 'description', content: data.value?.article?.excerpt || '' },
        { hid: 'og:title', property: 'og:title', content: data.value?.article?.headline || 'Blog' },
        { hid: 'og:url', property: 'og:url', content: canonicalPath },
        { hid: 'og:description', property: 'og:description', content: data.value?.article?.excerpt || '' },
        { hid: 'og:image', property: 'og:image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: data.value?.article?.headline || '' },
        { name: 'twitter:description', content: data.value?.article?.excerpt || '' },
        { name: 'twitter:image', content: image },
    ],
    link: [{ rel: 'canonical', href: canonicalPath }],
});
</script>

<style scoped>
.blog-header {
    border-top: 2px solid var(--color-typography-primary); /* Matches border-t-2 and border-typography_primary */
    padding-top: 32px; /* Matches pt-8 */
    display: flex;
    flex-direction: column; /* Matches flex flex-col */
    align-items: center; /* Matches items-center */
    margin-bottom: 48px; /* Matches mb-12 */
}

@media (min-width: 768px) {
    .blog-header {
        flex-direction: row; /* Matches md:flex-row */
        justify-content: space-between; /* Matches md:justify-between */
        margin-bottom: 32px; /* Matches md:mb-8 */
    }
}

.blog-date {
    font-weight: 300; /* Matches font-light */
    color: rgba(var(--color-typography-primary-rgb), 0.75); /* Matches text-typography_primary/75 */
}

.blog-headline {
    font-weight: 700; /* Matches font-bold */
    margin-bottom: 16px; /* Matches mb-4 */
    font-size: 1.875rem; /* Matches text-h3 */
    line-height: 2.25rem; /* Matches leading-h3 */
    text-align: center; /* Matches text-center */
}

@media (min-width: 768px) {
    .blog-headline {
        margin-bottom: 24px; /* Matches md:mb-6 */
        font-size: 2.25rem; /* Matches md:text-h1 */
        line-height: 2.75rem; /* Matches md:leading-h1 */
        text-align: left; /* Matches md:text-left */
    }
}

.blog-excerpt {
    margin-bottom: 32px; /* Matches mb-8 */
    text-align: center; /* Matches text-center */
}

@media (min-width: 768px) {
    .blog-excerpt {
        width: 66.666667%; /* Matches md:w-8/12 */
        font-size: 1.125rem; /* Matches md:text-lg */
        line-height: 1.75rem; /* Matches md:leading-lg */
        text-align: left; /* Matches md:text-left */
    }
}

.blog-footer {
    border-bottom: 2px solid var(--color-typography-primary); /* Matches border-b-2 and border-typography_primary */
    padding-bottom: 32px; /* Matches pb-8 */
    display: flex;
    flex-direction: column; /* Matches flex flex-col */
    align-items: center; /* Matches items-center */
}

@media (min-width: 768px) {
    .blog-footer {
        flex-direction: row; /* Matches md:flex-row */
        justify-content: space-between; /* Matches md:justify-between */
    }
}

.blog-author {
    font-style: italic; /* Matches italic */
    text-decoration: none;
}

.blog-author:hover {
    text-decoration: underline; /* Matches hover:underline */
}

.update-date {
    font-style: italic; /* Matches italic */
    font-size: 0.875rem; /* Matches text-sm */
    font-weight: 300; /* Matches font-light */
    color: rgba(var(--color-typography-primary-rgb), 0.75); /* Matches text-typography_primary/75 */
}

.content-section {
    display: grid;
    grid-template-columns: repeat(10, 1fr); /* Matches grid-cols-10 */
    gap: 32px; /* Matches gap-8 */
}

@media (min-width: 1024px) {
    .content-section {
        gap: 48px; /* Matches lg:gap-12 */
    }
}

.related-articles {
    border-top: 2px solid var(--color-typography-primary); /* Matches border-t-2 */
    margin-top: 32px; /* Matches mt-8 */
    padding-top: 16px; /* Matches pt-4 */
}
</style>
