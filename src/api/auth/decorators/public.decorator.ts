import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_TAG = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_TAG, true);