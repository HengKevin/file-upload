import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { fileMimetypeFilter } from './file-mimetype-filter';

export function ApiFile(
  fieldName = 'file',
  required = false,
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}

export function ApiImageFile(filename = 'image', required = false) {
  return ApiFile(filename, required, {
    fileFilter: fileMimetypeFilter('image'),
  });
}

export function ApiPdfFile(filename = 'image', required = false) {
  return ApiFile(filename, required, {
    fileFilter: fileMimetypeFilter('pdf'),
  });
}
