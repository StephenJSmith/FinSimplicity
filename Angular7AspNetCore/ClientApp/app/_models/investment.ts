export interface Investment {
    id: number;
    investmentCode: string;
    investmentName: string;
    market: string;
    currency: string;
    price: number;
    priceUpdatedUtc: Date;
}