const DEFAULT_CURRENCY = 'USD';
const DEFAULT_LOCALE = 'en-US';


export function formatCurrency(amount: string | number, currency = DEFAULT_CURRENCY, locale = DEFAULT_LOCALE) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(Number(amount));
}
