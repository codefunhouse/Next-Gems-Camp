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
    // Landing Page
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
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Hero Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
        defineField({
          name: 'ourProgrammes',
          title: 'Our Programmes',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'programmes',
              title: 'Programmes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Programme Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Icon Name',
                      type: 'string',
                      description: 'Name of the icon component (e.g., LaptopIcon, BagIcon)',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    }),
                    defineField({
                      name: 'imgUrl',
                      title: 'Programme Image',
                      type: 'image',
                      options: {hotspot: true},
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'whyChooseUs',
          title: 'Why Choose Us',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                    }),
                    defineField({
                      name: 'title',
                      title: 'Feature Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'desc',
                      title: 'Description',
                      type: 'text',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'teachingApproaches',
          title: 'Teaching Approaches',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'approaches',
              title: 'Approaches',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'icon',
                      title: 'Icon Name',
                      type: 'string',
                      description: 'Name of the icon component',
                    }),
                    defineField({
                      name: 'title',
                      title: 'Approach Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'faqs',
          title: 'FAQs',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'questions',
              title: 'Questions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                    }),
                    defineField({
                      name: 'answer',
                      title: 'Answer',
                      type: 'text',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'reviews',
          title: 'Reviews',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'reviews',
              title: 'Reviews List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Review Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Review Description',
                      type: 'text',
                    }),
                    defineField({
                      name: 'reviewer',
                      title: 'Reviewer',
                      type: 'string',
                    }),
                    defineField({
                      name: 'image',
                      title: 'Reviewer Image',
                      type: 'image',
                      options: {hotspot: true},
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'ctaSection',
          title: 'CTA Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    // Parent Page
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
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'infoDetails',
              title: 'Info Details',
              type: 'text',
            }),
            defineField({
              name: 'bgImage',
              title: 'Background Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
        defineField({
          name: 'learningAndEnrichment',
          title: 'Learning & Enrichment',
          type: 'object',
          fields: [
            defineField({
              name: 'leftData',
              title: 'Left Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'lists',
                  title: 'Lists',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'item',
                          title: 'List Item',
                          type: 'string',
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
            defineField({
              name: 'rightData',
              title: 'Right Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'imageUrl',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'travelVisasAndTransfers',
          title: 'Travel, Visas & Transfers',
          type: 'object',
          fields: [
            defineField({
              name: 'mainTitle',
              title: 'Main Title',
              type: 'string',
            }),
            defineField({
              name: 'mainDesc',
              title: 'Main Description',
              type: 'text',
            }),
            defineField({
              name: 'section1',
              title: 'Travel & Visa Support',
              type: 'object',
              fields: [
                defineField({
                  name: 'leftData',
                  title: 'Left Content',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'lists',
                      title: 'Lists',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'item',
                              title: 'List Item',
                              type: 'string',
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
                }),
                defineField({
                  name: 'rightData',
                  title: 'Right Content',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'imageUrl',
                      title: 'Image',
                      type: 'image',
                      options: {hotspot: true},
                    }),
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'section2',
              title: 'Airport Transfer Locations',
              type: 'object',
              fields: [
                defineField({
                  name: 'leftData',
                  title: 'Left Content',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'lists',
                      title: 'Lists',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'item',
                              title: 'List Item',
                              type: 'string',
                            }),
                            defineField({
                              name: 'nestedList',
                              title: 'Nested List',
                              type: 'array',
                              of: [
                                {
                                  type: 'object',
                                  fields: [
                                    defineField({
                                      name: 'item',
                                      title: 'Nested Item',
                                      type: 'string',
                                    }),
                                  ],
                                },
                              ],
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
                }),
                defineField({
                  name: 'rightData',
                  title: 'Right Content',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'imageUrl',
                      title: 'Image',
                      type: 'image',
                      options: {hotspot: true},
                    }),
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'accommodationAndWelfare',
          title: 'Accommodation & Welfare',
          type: 'object',
          fields: [
            defineField({
              name: 'leftData',
              title: 'Left Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'lists',
                  title: 'Lists',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'item',
                          title: 'List Item',
                          type: 'string',
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
            defineField({
              name: 'rightData',
              title: 'Right Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'imageUrl',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'safeguardingAndChildProtection',
          title: 'Safeguarding & Child Protection',
          type: 'object',
          fields: [
            defineField({
              name: 'leftData',
              title: 'Left Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'list',
                  title: 'List',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'item',
                          title: 'List Item',
                          type: 'string',
                        }),
                        defineField({
                          name: 'nestedList',
                          title: 'Nested List',
                          type: 'array',
                          of: [
                            {
                              type: 'object',
                              fields: [
                                defineField({
                                  name: 'item',
                                  title: 'Nested Item',
                                  type: 'string',
                                }),
                              ],
                            },
                          ],
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
            defineField({
              name: 'rightData',
              title: 'Right Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'imageUrl',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'whatsIncluded',
          title: "What's Included",
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'includedItems',
              title: 'Included Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'item',
                      title: 'Item',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'cta',
          title: 'CTA Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    // Agent Page
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
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'infoDetails',
              title: 'Info Details',
              type: 'text',
            }),
            defineField({
              name: 'bgImage',
              title: 'Background Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
        defineField({
          name: 'whyPartnerWithUs',
          title: 'Why Partner With Us',
          type: 'object',
          fields: [
            defineField({
              name: 'leftData',
              title: 'Left Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'lists',
                  title: 'Lists',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'item',
                          title: 'List Item',
                          type: 'string',
                        }),
                        defineField({
                          name: 'nestedList',
                          title: 'Nested List',
                          type: 'array',
                          of: [
                            {
                              type: 'object',
                              fields: [
                                defineField({
                                  name: 'item',
                                  title: 'Nested Item',
                                  type: 'string',
                                }),
                              ],
                            },
                          ],
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
            defineField({
              name: 'rightData',
              title: 'Right Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'imageUrl',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'programOverview',
          title: 'Program Overview',
          type: 'object',
          fields: [
            defineField({
              name: 'leftData',
              title: 'Left Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'lists',
                  title: 'Lists',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'item',
                          title: 'List Item',
                          type: 'string',
                        }),
                        defineField({
                          name: 'nestedList',
                          title: 'Nested List',
                          type: 'array',
                          of: [
                            {
                              type: 'object',
                              fields: [
                                defineField({
                                  name: 'item',
                                  title: 'Nested Item',
                                  type: 'string',
                                }),
                              ],
                            },
                          ],
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
            defineField({
              name: 'rightData',
              title: 'Right Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'imageUrl',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'travelAndTransfers',
          title: 'Travel & Transfers',
          type: 'object',
          fields: [
            defineField({
              name: 'leftData',
              title: 'Left Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'lists',
                  title: 'Lists',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'item',
                          title: 'List Item',
                          type: 'string',
                        }),
                        defineField({
                          name: 'nestedList',
                          title: 'Nested List',
                          type: 'array',
                          of: [
                            {
                              type: 'object',
                              fields: [
                                defineField({
                                  name: 'item',
                                  title: 'Nested Item',
                                  type: 'string',
                                }),
                              ],
                            },
                          ],
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
            defineField({
              name: 'rightData',
              title: 'Right Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'imageUrl',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'safeguardingAndCompliance',
          title: 'Safeguarding & Compliance',
          type: 'object',
          fields: [
            defineField({
              name: 'leftData',
              title: 'Left Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'upperDesc',
                  title: 'Upper Description',
                  type: 'text',
                }),
                defineField({
                  name: 'list',
                  title: 'List',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'item',
                          title: 'List Item',
                          type: 'string',
                        }),
                        defineField({
                          name: 'nestedList',
                          title: 'Nested List',
                          type: 'array',
                          of: [
                            {
                              type: 'object',
                              fields: [
                                defineField({
                                  name: 'item',
                                  title: 'Nested Item',
                                  type: 'string',
                                }),
                              ],
                            },
                          ],
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
            defineField({
              name: 'rightData',
              title: 'Right Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'imageUrl',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'agentSupport',
          title: 'Agent Support',
          type: 'object',
          fields: [
            defineField({
              name: 'leftData',
              title: 'Left Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'list',
                  title: 'List',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'item',
                          title: 'List Item',
                          type: 'string',
                        }),
                        defineField({
                          name: 'nestedList',
                          title: 'Nested List',
                          type: 'array',
                          of: [
                            {
                              type: 'object',
                              fields: [
                                defineField({
                                  name: 'item',
                                  title: 'Nested Item',
                                  type: 'string',
                                }),
                              ],
                            },
                          ],
                        }),
                      ],
                    },
                  ],
                }),
              ],
            }),
            defineField({
              name: 'rightData',
              title: 'Right Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'imageUrl',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'cta',
          title: 'CTA Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    // Canterbury Page
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
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'locationDetails',
              title: 'Location Details',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                    }),
                    defineField({
                      name: 'suffix',
                      title: 'Suffix',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'bgImageUrl',
              title: 'Background Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
        defineField({
          name: 'discoverCanterbury',
          title: 'Discover Canterbury',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {hotspot: true},
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'accommodation',
          title: 'Accommodation',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'bgImageUrl',
              title: 'Background Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'bgImageAlt',
              title: 'Background Image Alt Text',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'excursionCities',
          title: 'Excursion Cities',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'tabs',
              title: 'Tabs',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'citiesData',
              title: 'Cities Data',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'City Name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'images',
                      title: 'City Images',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'title',
                              title: 'Image Title',
                              type: 'string',
                            }),
                            defineField({
                              name: 'imageUrl',
                              title: 'Image',
                              type: 'image',
                              options: {hotspot: true},
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
      ],
    }),

    // Norfolk Page
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
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'locationDetails',
              title: 'Location Details',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'bgImageUrl',
              title: 'Background Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
        defineField({
          name: 'discoverSandringham',
          title: 'Discover Sandringham',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {hotspot: true},
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'accommodation',
          title: 'Accommodation',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'bgImageUrl',
              title: 'Background Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'bgImageAlt',
              title: 'Background Image Alt Text',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'excursionCities',
          title: 'Excursion Cities',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'tabs',
              title: 'Tabs',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'citiesData',
              title: 'Cities Data',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'City Name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'images',
                      title: 'City Images',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'title',
                              title: 'Image Title',
                              type: 'string',
                            }),
                            defineField({
                              name: 'imageUrl',
                              title: 'Image',
                              type: 'image',
                              options: {hotspot: true},
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
      ],
    }),

    // Footer
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
        defineField({
          name: 'quickLinks',
          title: 'Quick Links',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link URL',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'contact',
          title: 'Contact',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'contacts',
              title: 'Contacts',
              type: 'object',
              fields: [
                defineField({
                  name: 'email',
                  title: 'Email',
                  type: 'string',
                }),
                defineField({
                  name: 'phone',
                  title: 'Phone',
                  type: 'string',
                }),
                defineField({
                  name: 'location',
                  title: 'Location',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'socials',
          title: 'Socials',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'socials',
              title: 'Social Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'icon',
                      title: 'Icon Name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link URL',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
        }),
      ],
    }),
  ],
})
