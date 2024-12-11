
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Index from '@/pages/index.vue';

describe('Index', () => {
    it('renders the component correctly', () => {
        const wrapper = mount(Index);

        // Check if the root div has the correct classes
        const rootDiv = wrapper.find('div');
        expect(rootDiv.exists()).toBe(true);
        expect(rootDiv.classes()).toContain('flex');
        expect(rootDiv.classes()).toContain('flex-col');
        expect(rootDiv.classes()).toContain('items-center');
        expect(rootDiv.classes()).toContain('justify-center');
        expect(rootDiv.attributes('style')).toContain('height: 100vh');
    });

    it('displays the correct heading text', () => {
        const wrapper = mount(Index);

        const heading = wrapper.find('h1');
        expect(heading.exists()).toBe(true);
        expect(heading.text()).toBe('Welcome to the blog starter!');
        expect(heading.classes()).toContain('text-center');
    });

    it('renders the NuxtLink correctly', () => {
        const wrapper = mount(Index, {
            global: {
                stubs: {
                    NuxtLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        });

        const link = wrapper.find('a');
        expect(link.exists()).toBe(true);
        expect(link.text()).toBe('Read the blog!');
    });
});
