import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVisitors();
    }, []);

    const fetchVisitors = async () => {
        try {
            const { data, error } = await supabase
                .from('daily_visitors')
                .select('*')
                .order('visit_date', { ascending: false })
                .limit(30);

            if (error) throw error;
            setVisitors(data || []);
        } catch (error) {
            console.error('Error fetching visitors:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h1>Admin Dashboard</h1>
            <div className="dashboard-widgets">
                <div className="widget">
                    <h3>Visitor Statistics (Last 30 Days)</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="visitor-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Visitors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitors.map((day) => (
                                    <tr key={day.id}>
                                        <td>{day.visit_date}</td>
                                        <td>{day.visitor_count}</td>
                                    </tr>
                                ))}
                                {visitors.length === 0 && (
                                    <tr>
                                        <td colSpan="2">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
