export const getInitials: (name: string | null) => string = (name: string | null) => {
    return name ? name
        .split(" ")
        .filter(word => word.length > 0)
        .map(word => word[0].toUpperCase())
        .join("") : 'N/A'
}

export function generateUniqueId(id: string) {
    return `id-${id}-${Date.now()}`;
}

export function base64Decode(base64: any) {
    if (!base64) {
        console.error("Base64 string is null or undefined");
        return null;
    }
    try {
        const standardBase64 = base64.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = atob(standardBase64);
        return JSON.parse(decoded);
    } catch (error) {
        console.error("Error decoding base64 string:", error);
        return null;
    }
}