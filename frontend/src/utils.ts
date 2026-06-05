interface FetchBackendOptions {
    path: string;
}

interface FetchBackendResult<T> {
    success: boolean;
    body: T;
}

export const fetchBackend = async <T>(options: FetchBackendOptions): Promise<T> => {
    try {
        const response = await fetch(`http://localhost:4000${options.path}`);
        if (response.status !== 200) {
            return { success: false, body: null as T };
        }
        return { success: true, body: await response.json() };
    } catch (error: any) {
        console.error(error);
        return { success: false, body: null as T };
    }
};
