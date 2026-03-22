import type { MetalPricePoint, MetalData } from '../../types/metals';
import { roundToMaxDecimals, DISPLAY_MAX_DECIMALS } from '../../utils/numberFormat';

export const generateMetalHistory = (basePrice: number, days: number = 30): MetalPricePoint[] => {
    const history: MetalPricePoint[] = [];
    const now = new Date();
    let price = basePrice;

    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);

        const volatility = price * 0.01;
        price += (Math.random() - 0.5) * volatility;

        history.push({
            date: date.toISOString().split('T')[0],
            price: roundToMaxDecimals(price, DISPLAY_MAX_DECIMALS)
        });
    }

    return history;
};

export const getGoldData = (): MetalData => {
    const history = generateMetalHistory(7500);
    return {
        name: 'Gold',
        currentPrice: history[history.length - 1].price,
        currency: 'INR',
        unit: 'gram',
        history
    };
};

export const getSilverData = (): MetalData => {
    const history = generateMetalHistory(95);
    return {
        name: 'Silver',
        currentPrice: history[history.length - 1].price,
        currency: 'INR',
        unit: 'gram',
        history
    };
};
