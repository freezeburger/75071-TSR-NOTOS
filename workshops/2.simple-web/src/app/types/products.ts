import { Currency, QrCodeUri, TextShort, TextUnbounded, Timestamp } from "./generics"
import { Root } from "./root"

/**
 * Example categories: "electronics", "furniture", "clothing", "toys", "books", etc.
 */
export type ProductCategory = 'beauty' | 'fragrances' | 'furniture' | 'groceries';

export type OpenCategory = `custom:${string}` | ProductCategory;

export type Tags = string[];

export type AvailabilityStatus = string;

export interface Product extends Root {
  title: TextShort
  category: ProductCategory
  price: Currency
  discountPercentage: number
  rating: number
  stock: number
  tags: Tags
  brand: Capitalize<TextShort> | undefined
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: AvailabilityStatus;
  reviews: Review[]
  returnPolicy: TextUnbounded
  minimumOrderQuantity: number
  meta: Meta
  images: string[]
  thumbnail: string
}

export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Meta {
  createdAt: Timestamp
  updatedAt: Timestamp
  barcode: string
  qrCode: QrCodeUri
}


