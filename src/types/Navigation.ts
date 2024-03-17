import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductDTO } from "./Products";

export type StackParamList = {
    Menu: undefined;
    Details: ProductDTO;
};

export type MenuStackProps = NativeStackScreenProps<StackParamList, "Menu">;

export type DetailsStackProps = NativeStackScreenProps<StackParamList, "Details">;