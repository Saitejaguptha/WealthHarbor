import type { MetalPricePoint, MetalData } from '../types/metals';

export const generateMetalHistory = (basePrice: number, days: number = 30): MetalPricePoint[] => {
    const history: MetalPricePoint[] = [];
    const now = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);

        // Random walk for price
        const volatility = basePrice * 0.01;
        const change = (Math.random() - 0.5) * volatility;
        basePrice += change;

        history.push({
            date: date.toISOString().split('T')[0],
            price: parseFloat(basePrice.toFixed(2))
        });
    }

    return history;
};

export const getGoldData = (): MetalData => {
    const history = generateMetalHistory(7500); // Base price per gram in INR
    return {
        name: 'Gold',
        currentPrice: history[history.length - 1].price,
        currency: 'INR',
        unit: 'gram',
        history
    };
};

export const getSilverData = (): MetalData => {
    const history = generateMetalHistory(95); // Base price per gram in INR
    return {
        name: 'Silver',
        currentPrice: history[history.length - 1].price,
        currency: 'INR',
        unit: 'gram',
        history
    };
};
