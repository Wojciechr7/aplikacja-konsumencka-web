import {ImageAd} from './image';

export interface Ad {
    Title: string;
    Images: Array<ImageAd>;
    Description: string;
    PhoneNumber: string;
    Price: number;
    City: string;
    Street: string;
    Size: number;
    Category: string;
    Floor: number;
}
