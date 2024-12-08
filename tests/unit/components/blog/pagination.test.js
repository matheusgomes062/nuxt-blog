// @vitest-environment nuxt
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Pagination from '@/components/blog/pagination.vue'; // Adjust the path as needed

describe('Pagination Component', () => {
    const createWrapper = (props) => {
        return mount(Pagination, {
        props,
            global: {
                mocks: {
                    $nuxt: {
                        resolve: (url) => url,
                    },
                },
                stubs: {
                    NuxtLink: {
                        template: '<a><slot /></a>',
                    },
                }
            },
        });
    };

    it('renders the correct number of pages', () => {
        const wrapper = createWrapper({
            currentPage: 2,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/',
        });

        const pageLinks = wrapper.findAll('.pagination-page');
        expect(pageLinks).toHaveLength(5); // 1 (first), 2, 3 (middle), 4 (middle), 5 (last)
    });

    it('displays left ellipsis when currentPage is greater than 3', () => {
        const wrapper = createWrapper({
            currentPage: 4,
            totalPages: 6,
            baseUrl: '/base',
            pageUrl: '/page/',
        });

        expect(wrapper.find('.pagination-extra-left').exists()).toBe(true);
    });

    it('hides left ellipsis when currentPage is 3 or less', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            totalPages: 6,
            baseUrl: '/base',
            pageUrl: '/page/',
        });

        expect(wrapper.find('.pagination-extra-left').exists()).toBe(false);
    });

    it('renders correct "prev" link URL', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/',
        });

        const prevLink = wrapper.find('.pagination-icon');
        expect(prevLink.attributes('to')).toBe('/page/2/');
    });

    it('renders correct "next" link URL', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/',
        });

        const nextLink = wrapper.find('.pagination-icon:last-of-type');
        expect(nextLink.attributes('to')).toBe('/page/4/');
    });

    it('adds "active" class to the current page', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/',
        });
        
        const activePage = wrapper.find('.pagination-item.active');
        expect(activePage.exists()).toBe(true);
        expect(activePage.text()).toBe('3');
    });

    it('hides next chevron if on the last page', () => {
        const wrapper = createWrapper({
            currentPage: 5,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/',
        });

        const nextChevron = wrapper.find('.pagination-icon:last-of-type');
        expect(nextChevron.exists()).toBe(false);
    });

    it('hides prev chevron if on the first page', () => {
        const wrapper = createWrapper({
            currentPage: 1,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/',
        });

        const prevChevron = wrapper.find('.pagination-icon:first-of-type');
        expect(prevChevron.exists()).toBe(false);
    });

    it('renders correct last page link', () => {
        const wrapper = createWrapper({
            currentPage: 2,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/',
        });

        const links = wrapper.findAll('.pagination-item.pagination-page');

        // Ensure links are found
        expect(links.length).toBeGreaterThan(0);

        // Get the last link safely
        const lastPageLink = links.at(links.length - 1);
        expect(lastPageLink.exists()).toBe(true);
        expect(lastPageLink.text()).toBe('5');
        expect(lastPageLink.attributes('to')).toBe('/page/5/');
    });
});
