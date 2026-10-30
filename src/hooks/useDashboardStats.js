
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getAdminDashboardStats } from '../api/OrdersApi';

const useDashboardStats = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dashboard statistics
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await getAdminDashboardStats();
            setData(response.data.dashboard);
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                'Failed to load dashboard statistics.';

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
};

export default useDashboardStats;
