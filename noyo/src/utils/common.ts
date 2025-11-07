export const getInitials: (name: string | null) => string = (name: string | null) => {
    return name ? name
        .split(" ")
        .filter(word => word.length > 0)
        .map(word => word[0].toUpperCase())
        .join("") : 'N/A'
}