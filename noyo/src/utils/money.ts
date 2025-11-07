const DEFAULT_CURRENCY = 'NPR';
const DEFAULT_LOCALE = 'ne-NP';


export function formatCurrency(amount: string | number, currency = DEFAULT_CURRENCY, locale = DEFAULT_LOCALE) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(Number(amount));
}
