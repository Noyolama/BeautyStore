export const simplifyDate = (val: Date | string) => {
    if(!val) return null;

    return new Date(val).toLocaleDateString();
}