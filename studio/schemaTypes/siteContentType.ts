import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteContentType = defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  icon: TagIcon,
  preview: {
    select: {
      title: 'landingPage.heroSection.title',
    },
  },
  fields: [
    defineField({
      name: 'landingPage',
      title: 'Landing Page',
      type: 'object',
      fields: [
        defineField({
          name: 'heroSection',
          title: 'Hero Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'titleTextVariant',
              title: 'Title text variant',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'color',
                      title: 'Color',
                      type: 'string',
                      description: 'Enter a color value (hex, rgb, or color name)',
                      initialValue: '#000000',
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'desc',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'btn1Text',
              title: 'Button 1 Text',
              type: 'string',
            }),

            defineField({
              name: 'imgSrc',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'canterburyPage',
      title: 'Canterbury Page',
      type: 'object',
      fields: [
        defineField({
          name: 'heroSection',
          title: 'Hero Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'norfolkPage',
      title: 'Norfolk Page',
      type: 'object',
      fields: [
        defineField({
          name: 'heroSection',
          title: 'Hero Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'parentPage',
      title: 'Parent Page',
      type: 'object',
      fields: [
        defineField({
          name: 'heroSection',
          title: 'Hero Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'agentPage',
      title: 'Agent Page',
      type: 'object',
      fields: [
        defineField({
          name: 'heroSection',
          title: 'Hero Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'about',
          title: 'About Text',
          type: 'text',
        }),
      ],
    }),
  ],
})
