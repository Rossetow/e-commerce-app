import { DropdownData } from "expo-select-dropdown";

export interface PaymentMethod {
    id: string,
    cardNumber: string,
    cardExpire: string,
    adress: string,
    state: DropdownData<string,string> | null,
    city: DropdownData<string,string> | null,
}