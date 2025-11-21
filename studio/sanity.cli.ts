import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId:
      process.env.VITE_SANITY_PROJECT_ID || (process.env.SANITY_STUDIO_PROJECT_ID as string),
    dataset: process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})
