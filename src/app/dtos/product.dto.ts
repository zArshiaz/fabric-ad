import {CommentDto} from './comment.dto';



export interface ProductDto {
  _id: string
  name: string
  slug: string
  shortDescription: string
  description: string
  categories: CategoryDto[]
  brand: string
  colorName: string
  pattern: string
  composition: string // در جیسان رشته است
  widthCm: number
  finish: string[]
  pricePerMeter: number
  price:number
  stockMeters: number
  images: ImageDto[]
  comments: CommentDto[]
  status: string
  publishedAt: string
  seo: SeoDto
  ratingAvg: number
  ratingCount: number
  discount: DiscountDto // در جیسان آبجکت است
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CategoryDto {
  _id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ImageDto {
  url: string
  alt?: string // اختیاری چون در جیسان بعضی وقت‌ها نیست
}

export interface SeoDto {
  metaTitle: string
  metaDescription: string
}

export interface DiscountDto {
  active: boolean
  percent: number
}

export interface PaginationDto {
  total: number
  page: number
  limit: number
  totalPages: number
}


export interface ProductFormDto {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  pricePerMeter: number;
  stockMeters: number;
  brand: string;
  colorName: string;
  pattern: string;
  widthCm: number;
  composition: string;
  seo: {
    metaTitle: string;
    metDescription: string;
  };
  discount?: {
    active: boolean;
    percent: number;
  };
  finish: string[];
  categories: {
    _id: string;
    name: string;
    selected: boolean;
  }[];
  status: "draft" | "active" | "archived";
  images: File[];
}

export interface AddProductRequestDto {
  name: string;
  slug?: string;
  shortDescription: string;
  description: string;
  pricePerMeter: number;
  stockMeters?: number;
  categories: string[]; // MongoId ها به صورت رشته
  brand: string;
  colorName: string;
  pattern?: string;
  composition?: string;
  widthCm?: number;
  finish?: string[];
  images: {
    url: string;
    alt?: string;
  }[];
  status?: "draft" | "active" | "archived";
  seo?: {
    metaTitle?: string; // حداکثر 70 کاراکتر
    metaDescription?: string; // حداکثر 160 کاراکتر
  };
  discount?: {
    active?: boolean;
    percent?: number; // 0 تا 100
  };
}

