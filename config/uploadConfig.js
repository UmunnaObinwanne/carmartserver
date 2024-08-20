/*

import uploadFeature from '@adminjs/upload';
import path from 'path';


import File from '../models/fileModel.js';
import { componentLoader } from '../components/components.js';

// Define the local provider configuration
const localProvider = {
  bucket: 'public/files', // This is the folder where files will be stored
  opts: {
    baseUrl: '/uploads', // Base URL for accessing files
  },
};

const uploadOptions = {
  resource: File,
  options: {
    properties: {
      s3Key: { type: 'string' },
      bucket: { type: 'string' },
      mime: { type: 'string' },
          comment: { type: 'textarea', isSortable: false },
      },
       key: 's3Key',
  },
  features: [
    uploadFeature({
      provider: { local: localProvider },
      validation: { mimeTypes: ['image/png', 'image/jpeg', 'image/gif'] },
      // Ensure 'key' is provided. This property indicates the path in the storage where files are stored.
      key: 's3Key',
    }),
  ],
};

export default uploadOptions;


*/