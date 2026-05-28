import { useEffect, useState } from "react";

export function useAsyncData<T>(
    fetcher: () => Promise<T>, 
    initialData: T
) {
    const [data, setData] = useState<T>(initialData);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<Error | null>(null);

    async function load() {
        try {
            setLoading(true);
            setError(null);

            const result = await fetcher();

            setData(result);
        } catch (err) {
            console.error(err);

            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return {
        data,
        loading,
        error,
        reload: load,
    };
}