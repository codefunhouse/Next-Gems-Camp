import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Camp website version 1',

  projectId: process.env.VITE_SANITY_PROJECT_ID || (process.env.SANITY_STUDIO_PROJECT_ID as string),
  dataset: process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
