import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getAdminDashboardStats } from '../api/OrdersApi';

const useDashboardStats = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
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
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useDashboardStats;