import { useEffect, useState, useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "../ui/carousel";

interface GalleryProps {
    images: {
        url: string
    }[],
}

const GalleryMode = ({ images }: GalleryProps) => {
    const [mainApi, setMainApi] = useState<CarouselApi>();
    const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const imageList = useMemo(() => {
        if (images?.length > 0) {
            return images
        } else {
            return [{
                url: '/images/no-image.jpg'
            }]
        }
    }, [images])

    const mainImage = useMemo(
        () =>
            imageList.map((image, index) => (
                <CarouselItem key={index} className="w-full h-auto">
                    <img
                        className="w-full"
                        src={image.url}
                        alt={`Carousel Main Image ${index + 1}`}
                    />
                </CarouselItem>
            )),
        [imageList],
    );

    const thumbnailImages = useMemo(
        () =>
            imageList.map((image, index) => (
                <CarouselItem
                    key={index}
                    className="relative aspect-square w-full basis-1/4"
                    onClick={() => handleClick(index)}
                >
                    <img
                        className={`${index === current ? "border-2" : ""}`}
                        src={image.url}
                        alt={`Carousel Thumbnail Image ${index + 1}`}
                    />
                </CarouselItem>
            )),
        [imageList, current],
    );

    useEffect(() => {
        if (!mainApi || !thumbnailApi) {
            return;
        }

        const handleTopSelect = () => {
            const selected = mainApi.selectedScrollSnap();
            setCurrent(selected);
            thumbnailApi.scrollTo(selected);
        };

        const handleBottomSelect = () => {
            const selected = thumbnailApi.selectedScrollSnap();
            setCurrent(selected);
            mainApi.scrollTo(selected);
        };

        mainApi.on("select", handleTopSelect);
        thumbnailApi.on("select", handleBottomSelect);

        return () => {
            mainApi.off("select", handleTopSelect);
            thumbnailApi.off("select", handleBottomSelect);
        };
    }, [mainApi, thumbnailApi]);

    const handleClick = (index: number) => {
        if (!mainApi || !thumbnailApi) {
            return;
        }
        thumbnailApi.scrollTo(index);
        mainApi.scrollTo(index);
        setCurrent(index);
    };

    return (
        <div className="w-96 max-w-xl sm:w-auto">
            <Carousel setApi={setMainApi}>
                <CarouselContent className="m-1">{mainImage}</CarouselContent>
            </Carousel>
            <Carousel setApi={setThumbnailApi}>
                <CarouselContent className="m-1">{thumbnailImages}</CarouselContent>
            </Carousel>
        </div>
    );
};

export default GalleryMode;