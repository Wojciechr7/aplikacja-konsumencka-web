import {ImageAd} from './image';

export interface Ad {
/*    id?: number;
    TitleFormControl: string;
    CategoryFormControl: string;
    CityFormControl: string;
    NeighbourFormControl: string;
    StreetFormControl: string;
    PhoneNumberFormControl: string;
    SizeFormControl: string;
    FloorFormControl: string;
    PriceFormControl: string;
    TypeFormControl: string;
    DescriptionFormControl: string;*/
    Images: Array<ImageAd>;
    Desctiption: string;
    PhoneNumber: string;
    Price: number;
    Adress: string;
    Size: number;
    Categories: string;
}
