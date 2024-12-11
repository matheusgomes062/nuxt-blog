import { mount } from '@vue/test-utils';
import Section from '@/components/section.vue';
import { describe, it, expect } from 'vitest';

describe('Section Component', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Section, {
            props: { id: 'test-id' },
        });

        const component = wrapper.find('section');
        expect(component.exists()).toBe(true);
        expect(component.attributes('id')).toBe('test-id');
        expect(component.classes()).toContain('px-section_x_sm');
        expect(component.classes()).toContain('py-section_y_sm');
        expect(component.classes()).not.toContain('full-height');
        expect(component.classes()).not.toContain('full-height--forced');
    });

    it('renders with the specified type', () => {
        const wrapper = mount(Section, {
            props: { id: 'test-id', type: 'div' },
        });

        const component = wrapper.find('div');
        expect(component.exists()).toBe(true);
    });

    it('applies the full-height class when fullHeight is true', () => {
        const wrapper = mount(Section, {
            props: { id: 'test-id', fullHeight: true },
        });

        const component = wrapper.find('section');
        expect(component.classes()).toContain('full-height');
    });

    it('applies the full-height--forced class when forcedHeight is true', () => {
        const wrapper = mount(Section, {
            props: { id: 'test-id', forcedHeight: true },
        });

        const component = wrapper.find('section');
        expect(component.classes()).toContain('full-height--forced');
    });

    it('applies both full-height and full-height--forced when both are true', () => {
        const wrapper = mount(Section, {
            props: { id: 'test-id', fullHeight: true, forcedHeight: true },
        });

        const component = wrapper.find('section');
        expect(component.classes()).toContain('full-height');
        expect(component.classes()).toContain('full-height--forced');
    });

    it('renders the slot content', () => {
        const wrapper = mount(Section, {
            props: { id: 'test-id' },
            slots: {
                default: '<p>Slot Content</p>',
            },
        });

        expect(wrapper.html()).toContain('<p>Slot Content</p>');
    });
});
