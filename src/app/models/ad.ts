import {ImageAd} from './image';

export interface Ad {
    id?: number;
    title?: string;
    images?: Array<ImageAd>;
    description?: string;
    phoneNumber?: string;
    price: number;
    city: string;
    street: string;
    size: number;
    category: string;
    floor?: number;
}
