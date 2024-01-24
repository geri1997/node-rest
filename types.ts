import { FeatureEnum } from "./feature.enum";

export type RequestBody = {
    minNumber: number;
    maxNumber: number;
    feature: FeatureEnum
}