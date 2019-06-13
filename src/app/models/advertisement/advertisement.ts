import {ImageAd} from './image';

export interface Advertisement {
    id?: number;
    title?: string;
    images?: Array<ImageAd>;
    image?: ImageAd;
    description?: string;
    phoneNumber?: string;
    price: number;
    city: number;
    street: string;
    size: number;
    category: string;
    floor?: number;
    userId?: string;
    verification: boolean;
    voivodeship: string;
}
