// @vitest-environment nuxt
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Component from '@/components/blog/list.vue'; // Adjust the path to your component

describe('Component.vue', () => {
    it('renders a list of articles when `data` is provided', () => {
        const mockData = [
        {
            _path: '/article-1',
            headline: 'Article 1',
            date: '2024-12-01',
            excerpt: 'Excerpt of article 1.',
        },
        {
            _path: '/article-2',
            headline: 'Article 2',
            date: '2024-12-02',
            excerpt: 'Excerpt of article 2.',
        },
        ];

        const wrapper = mount(Component, {
            props: {
                data: mockData,
            },
            global: {
                mocks: {
                $formatDate: (date) => new Date(date).toLocaleDateString(),
                },
                stubs: {
                    NuxtLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        });

        // Debug the rendered HTML if necessary
        console.log(wrapper.html());

        const articles = wrapper.findAll('li');
        expect(articles).toHaveLength(mockData.length);

        articles.forEach((article, index) => {
        const headline = article.find('h2');
        expect(headline.exists()).toBe(true);
        expect(headline.text()).toBe(mockData[index].headline);

        const date = article.find('p:nth-of-type(1)');
        expect(date.exists()).toBe(true);
        expect(date.text()).toBe(new Date(mockData[index].date).toLocaleDateString());

        const excerpt = article.find('p:nth-of-type(2)');
        expect(excerpt.exists()).toBe(true);
        expect(excerpt.text()).toBe(mockData[index].excerpt);
        });
    });

    it('renders the default message when `data` is empty', () => {
        const wrapper = mount(Component, {
        props: {
            data: [],
        },
        });

        // Debug the rendered HTML if necessary
        // console.log(wrapper.html());

        const message = wrapper.find('p');
        expect(message.exists()).toBe(true);
        expect(message.text()).toBe(
        'There are no posts right now, but stay tuned for newer releases in the future.'
        );
    });

    it('renders a custom message when `message` prop is provided and `data` is empty', () => {
        const customMessage = 'Custom message for no posts';
        const wrapper = mount(Component, {
        props: {
            data: [],
            message: customMessage,
        },
        });

        // Debug the rendered HTML if necessary
        // console.log(wrapper.html());

        const message = wrapper.find('p');
        expect(message.exists()).toBe(true);
        expect(message.text()).toBe(customMessage);
    });

    it('does not render the message when `data` is not empty', () => {
        const mockData = [
        {
            _path: '/article-1',
            headline: 'Article 1',
            date: '2024-12-01',
            excerpt: 'Excerpt of article 1.',
        },
        ];

        const wrapper = mount(Component, {
        props: {
            data: mockData,
        },
        });

        const message = wrapper.find('p');
        expect(message.exists()).toBe(false);
    });

    it('renders NuxtLink components with correct `to` attributes', () => {
        const mockData = [
        {
            _path: '/article-1',
            headline: 'Article 1',
            date: '2024-12-01',
            excerpt: 'Excerpt of article 1.',
        },
        ];

        const wrapper = mount(Component, {
        props: {
            data: mockData,
        },
        });

        const link = wrapper.findComponent({ name: 'NuxtLink' });
        expect(link.exists()).toBe(true);
        expect(link.props('to')).toBe('/article-1/');
    });
});
