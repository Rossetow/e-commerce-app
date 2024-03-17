import { DropdownData } from "expo-select-dropdown";
import { StateDTO } from "./States";
import { CityDTO } from "./Cities";

export interface PaymentMethod {
    id: string,
    cardNumber: string,
    cardExpire: string,
    adress: string,
    state: StateDTO | null,
    city: CityDTO | null,
}