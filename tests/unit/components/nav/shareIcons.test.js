// @vitest-environment nuxt
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ShareIcons from '@/components/nav/shareIcons.vue';
import Twitter from '@/components/icons/twitter.vue';
import Pinterest from '@/components/icons/pinterest.vue';
import Linkedin from '@/components/icons/linkedin.vue';
import Facebook from '@/components/icons/facebook.vue';
import Gmail from '@/components/icons/gmail.vue';

describe('ShareIcons.vue', () => {
    const baseProps = {
        headline: 'Test Headline',
        excerpt: 'Test Excerpt',
        path: '/test-path'
    };

    const baseUrl = 'https://example.com';
    const encodedUrl = encodeURIComponent(baseUrl + baseProps.path);

    const expectedLinks = {
        Linkedin: `https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${encodedUrl}&title=${encodeURI(
            baseProps.headline
        )}&summary=${encodeURI(baseProps.excerpt)}`,
        Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            'Check out this article about ' + baseProps.headline
        )}&url=${encodedUrl}`,
        Facebook: `https://facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        Gmail: `mailto:?subject=${encodeURI(baseProps.headline)}&body=Check%20out%20this%20article%20about%20${encodeURI(
            baseProps.headline
        )},%20${encodedUrl}`,
        Pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}`
    };

    it('renders all social icons correctly', () => {
        const wrapper = mount(ShareIcons, { props: baseProps });

        // Check for the correct number of icons
        const icons = wrapper.findAll('a');
        expect(icons.length).toBe(5);

        // Verify each icon component exists
        expect(wrapper.findComponent(Linkedin).exists()).toBe(true);
        expect(wrapper.findComponent(Twitter).exists()).toBe(true);
        expect(wrapper.findComponent(Facebook).exists()).toBe(true);
        expect(wrapper.findComponent(Gmail).exists()).toBe(true);
        expect(wrapper.findComponent(Pinterest).exists()).toBe(true);
    });

    it('generates the correct href for each social icon', () => {
        const wrapper = mount(ShareIcons, { props: baseProps });

        // Verify href attributes
        const links = wrapper.findAll('a');
        expect(links[0].attributes('href')).toBe(expectedLinks.Linkedin);
        expect(links[1].attributes('href')).toBe(expectedLinks.Twitter);
        expect(links[2].attributes('href')).toBe(expectedLinks.Facebook);
        expect(links[3].attributes('href')).toBe(expectedLinks.Gmail);
        expect(links[4].attributes('href')).toBe(expectedLinks.Pinterest);
    });

    it('opens links in a new tab with proper security attributes', () => {
        const wrapper = mount(ShareIcons, { props: baseProps });

        const links = wrapper.findAll('a');
        links.forEach(link => {
            expect(link.attributes('target')).toBe('_blank');
            expect(link.attributes('rel')).toBe('noopener noreferer');
        });
    });
});
