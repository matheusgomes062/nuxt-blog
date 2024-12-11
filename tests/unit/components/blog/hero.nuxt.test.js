
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Hero from '@/components/blog/hero.vue';

describe('Hero.vue', () => {
    it('renders the section with correct ID and class', () => {
        const wrapper = mount(Hero);

        const section = wrapper.find('section#blog');
        expect(section.exists()).toBe(true);
        expect(section.classes()).toContain('text-typography_primary');
    });

    it('renders the breadcrumb correctly', () => {
        const wrapper = mount(Hero);

        const breadcrumb = wrapper.find('[itemscope][itemtype="https://schema.org/BreadcrumbList"]');
        expect(breadcrumb.exists()).toBe(true);

        const breadcrumbItems = breadcrumb.findAll('[itemscope][itemtype="https://schema.org/ListItem"]');
        expect(breadcrumbItems.length).toBe(2);

        const firstItem = breadcrumbItems[0];
        expect(firstItem.find('[itemprop="name"]').text()).toBe('Home');
        expect(firstItem.find('a[itemprop="item"]').attributes('href')).toBe('/');

        const secondItem = breadcrumbItems[1];
        expect(secondItem.find('[itemprop="name"]').text()).toBe('Blog');
    });

    it('displays the correct heading and paragraph', () => {
        const wrapper = mount(Hero);

        const heading = wrapper.find('h1');
        expect(heading.exists()).toBe(true);
        expect(heading.text()).toBe('Blog');
        expect(heading.classes()).toContain('font-bold');

        const paragraph = wrapper.find('p');
        expect(paragraph.exists()).toBe(true);
        expect(paragraph.text()).toContain('Lorem, ipsum dolor sit amet consectetur adipisicing elit.');
    });

    it('renders the borders and layout structure', () => {
        const wrapper = mount(Hero);

        const topBorder = wrapper.find('.border-t-2.pt-8');
        expect(topBorder.exists()).toBe(true);

        const bottomBorder = wrapper.find('.border-t-2.mt-8');
        expect(bottomBorder.exists()).toBe(true);

        const flexRow = wrapper.find('.flex.md\\:flex-row');
        expect(flexRow.exists()).toBe(true);
        expect(flexRow.classes()).toContain('items-center');
    });
});
