import { useState } from 'react';
import NoImage from '/images/no-image.jpg'

export const CustomImage = (props: any) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full">
            {/* Loader (spinner or skeleton) */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
                </div>
            )}

            {/* Actual image */}
            <img
                {...props}
                src={props?.src || NoImage}
                className={`${props?.className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)} // fallback for errors
            />
        </div>
    );
}
