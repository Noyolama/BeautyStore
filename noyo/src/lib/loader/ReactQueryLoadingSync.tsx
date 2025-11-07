import { useLoading } from "@/context/LoadingContext";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect } from "react";

const ReactQueryLoadingSync = () => {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    const { setLoading } = useLoading();

    useEffect(() => {
        const anyLoading = isFetching > 0 || isMutating > 0;
        setLoading(anyLoading);
    }, [isFetching, isMutating, setLoading]);

    return null;
};

export default ReactQueryLoadingSync;
