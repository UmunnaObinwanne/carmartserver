import uploadFeature from '@adminjs/upload';

import File from '../models/FileModel.js'
import { componentLoader } from '../components/components.js';

const localProvider = {
  bucket: 'public',
  opts: {
    baseUrl: '/uploads',
    },
};

export const files = {
  resource: File,
    options: {
      key: 's3Key',
    properties: {
      s3Key: {
        type: 'string',
      },
      bucket: {
        type: 'string',
      },
      mime: {
        type: 'string',
      },
    },
  },
  features: [uploadFeature({
    componentLoader,
    provider: { local: { bucket: 'public', opts: {} } },
    properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
    validation: { mimeTypes: ['image/png'] },
  })],
};