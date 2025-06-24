interface Root{
    id: number
    description: string
}


export interface Product extends Root{
    title: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: Dimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
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

/**
* Eg. 2025-04-30T09:41:02.053Z
* 
* @example
* {
*   "createdAt": "2025-04-30T09:41:02.053Z"
* }
*/
type Timestamp = string;

type QrCodeUri = `https://cdn.dummyjson.com/public/${string}.png`;
  
export interface Meta {
    createdAt: Timestamp
    updatedAt: Timestamp
    barcode: string
    qrCode: QrCodeUri
}
  

