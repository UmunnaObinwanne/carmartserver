import Page from '../models/pageModel.js';
import uploadFeature from '@adminjs/upload';
import { componentLoader } from '../components/components.js';

const localProvider = {
  bucket: 'public/uploads', // Directory where files will be stored
  opts: {
    baseUrl: '/uploads', // Base URL for accessing files
  },
};

const PageResource = {
  resource: Page,
  options: {
    properties: {
      content: {
        type: 'richtext',
      },
      slug: {
        isVisible: { edit: true, list: true, filter: true, show: true },
        position: 2,
        isDisabled: false,
      },
      title: {
        isTitle: true,
        position: 1,
      },
      featuredImage: {
        type: 'string',
        isVisible: { list: true, filter: true },
        label: 'Featured Image', // Custom label for the upload field
        custom: {
          description: 'Upload the main image for this page (Max size: 2MB)', // Optional description
        },
      },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        key: 'featuredImage', // Maps to `featuredImage` field in your model
        mimeType: 'mimeType',
        filePath: 'public/uploads',
        file: 'file',
      },
      validation: { mimeTypes: ['image/png', 'image/jpeg', 'image/gif'] },
    }),
  ],
};

export default PageResource;
