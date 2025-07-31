import React, { useState, useEffect, type SetStateAction } from 'react';
import axios from 'axios';
import type { NotificationSchema } from "../../schemas/Notification";

interface NotificationsFilterProps {
    setFilteredNotifications:React.Dispatch<SetStateAction<NotificationSchema[]>>;
    notificationsList:NotificationSchema[];
}

export const NotificationsFilter = ({setFilteredNotifications, notificationsList}:NotificationsFilterProps) => {
    const [filters, setFilters] = useState({
        category: '',
        dateOrder: 'latest',
        readStatus: 'all'
    });

    const [notificationCategories, setNotificationCategories] = useState<string[]>([]);
    const [notificationCategoryFilter, setNotificationCategoryFilter] = useState<string|"all">("all");
    const [notificationIsReadFilter, setNotificationIsReadFilter] = useState<true|false>(false);

    // Fetch notification's categories
    useEffect(() => {
        const fetchNotificationsCategoriesList = async (setNotificationCategories:React.Dispatch<SetStateAction<string[]>>) => {
            const response = await axios.get("http://localhost:8600/api/social/notifications/categoriesList", {withCredentials:true});
            const data = response.data;

            setNotificationCategories(data.categories);
        }

        fetchNotificationsCategoriesList(setNotificationCategories);
    }, [])

    // Filter notifications
    useEffect(() => {
        setFilteredNotifications(notificationsList);
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div style={{backgroundColor: '#f5f5f5', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap'}}>
            <h3 style={{ margin: '0', color: '#333', fontSize: '16px', fontWeight: '600', marginRight: '8px'}}>Filters:</h3>
            
            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#555', whiteSpace: 'nowrap'}}>Category</label>
                <select name="category" value={filters.category} onChange={handleInputChange} style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: 'white', fontSize: '12px', width: '80px'}}> 
                    <option value="">All</option>
                    {notificationCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            
            {/* Date Order Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#555',
                    whiteSpace: 'nowrap'
                }}>Sort by</label>
                <select
                    name="dateOrder"
                    value={filters.dateOrder}
                    onChange={handleInputChange}
                    style={{
                        padding: '6px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white',
                        fontSize: '12px',
                        width: '80px'
                    }}
                >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
            
            {/* Read Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#555',
                    whiteSpace: 'nowrap'
                }}>Status</label>
                <select
                    name="readStatus"
                    value={filters.readStatus}
                    onChange={handleInputChange}
                    style={{
                        padding: '6px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white',
                        fontSize: '12px',
                        width: '80px'
                    }}
                >
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </div>
        </div>
    );
};