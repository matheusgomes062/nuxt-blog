// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RelatedArticles from '@/components/blog/relatedArticles.vue'

describe('relatedArticles.vue', () => {
  it('renders the given articles', () => {
    const surround = [
      { _path: '/article-1', headline: 'Article 1', excerpt: 'Excerpt 1' },
      { _path: '/article-2', headline: 'Article 2', excerpt: 'Excerpt 2' },
      null,
      { _path: '/article-3', headline: 'Article 3', excerpt: 'Excerpt 3' }
    ]

    const wrapper = mount(RelatedArticles, {
      props: {
        surround
      },
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>'
          }
        }
      }
    })

    expect(wrapper.find('.blog-aside-title').text()).toBe('Continue Reading')

    const validArticles = surround.filter((a) => a !== null)
    const items = wrapper.findAll('li')
    expect(items.length).toBe(validArticles.length)

    items.forEach((item, index) => {
      const article = validArticles[index]
      const link = item.find('a')

      expect(link.text()).toBe(article.headline)
      // Now that we have properly stubbed NuxtLink, this should work:
      expect(link.attributes('href')).toBe(article._path + '/')

      const excerpt = item.find('p')
      expect(excerpt.exists()).toBe(true)
      expect(excerpt.text()).toBe(article.excerpt)
    })
  })

  it('does not render any list items if surround is empty', () => {
    const wrapper = mount(RelatedArticles, {
      props: {
        surround: []
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot/></a>'
          }
        }
      }
    })

    const items = wrapper.findAll('li')
    expect(items.length).toBe(0)
  })
})
