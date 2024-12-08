// @vitest-environment nuxt
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Error from '@/components/sections/error.vue'; // Adjust the path as necessary

describe('Error.vue', () => {
    const createWrapper = (props) => {
        return mount(Error, {
            props,
            global: {
                mocks: {
                    $nuxt: {
                        resolve: (url) => url,
                    },
                },
                stubs: {
                    NuxtLink: {
                        props: ['to', 'target', 'aria'],
                        template: `<a :href="to" :aria-label="aria"><slot /></a>`,
                    },
                }
            },
        });
    };

    it('renders the section with id="error"', () => {
        const wrapper = createWrapper();
        const section = wrapper.find('section#error');
        expect(section.exists()).toBe(true);
    });

    it('renders the correct heading', () => {
        const wrapper = createWrapper();
        const heading = wrapper.find('h1');
        expect(heading.exists()).toBe(true);
        expect(heading.text()).toBe('404 - Not Found');
    });

    it('renders the correct paragraph text', () => {
        const wrapper = createWrapper();
        const paragraph = wrapper.find('p');
        expect(paragraph.exists()).toBe(true);
        expect(paragraph.text()).toBe(
            "You were looking for something that doesn't exist on this site. I recommend you go back and look for something else."
        );
    });

    it('renders the NuxtLink component with correct props', () => {
        const wrapper = createWrapper();
        const nuxtLink = wrapper.find('a[href="/"]');
        expect(nuxtLink.exists()).toBe(true);
        expect(nuxtLink.attributes('href')).toBe('/');
        expect(nuxtLink.attributes('aria-label')).toBe('Go back home.');
    });

    it('applies the correct classes to elements', () => {
        const wrapper = createWrapper();

        const container = wrapper.find('div.flex');
        expect(container.exists()).toBe(true);
        expect(container.classes()).toContain('flex-col');
        expect(container.classes()).toContain('items-center');
        expect(container.classes()).toContain('justify-center');
        expect(container.classes()).toContain('h-full');
        expect(container.classes()).toContain('text-center');

        const paragraph = wrapper.find('p');
        expect(paragraph.classes()).toContain('text-typography_primary');
        expect(paragraph.classes()).toContain('mt-6');
        expect(paragraph.classes()).toContain('text-lg');
        expect(paragraph.classes()).toContain('leading-lg');
    });

    it('renders the NuxtLink with the correct text', () => {
        const wrapper = createWrapper();
        const nuxtLink = wrapper.find('a[href="/"]'); // Match by rendered `href`
        expect(nuxtLink.exists()).toBe(true);
        expect(nuxtLink.text()).toBe('Go back home');
    });
});
