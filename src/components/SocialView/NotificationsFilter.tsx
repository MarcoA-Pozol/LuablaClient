import React, { useState, useEffect, type SetStateAction } from 'react';
import axios from 'axios';
import type { NotificationSchema } from "../../schemas/Notification";

interface NotificationsFilterProps {
    setFilteredNotifications:React.Dispatch<SetStateAction<NotificationSchema[]>>;
    notificationsList:NotificationSchema[];
}

export const NotificationsFilter = ({setFilteredNotifications, notificationsList}:NotificationsFilterProps) => {
    const [notificationCategories, setNotificationCategories] = useState<string[]>([]);
    const [notificationCategoryFilter, setNotificationCategoryFilter] = useState<string|"all">("all");
    const [notificationReadStatusFilter, setNotificationReadStatusFilter] = useState<string|"read"|"unread"|"all">("all");
    const [dateOrderFilter, setDateOrderFilter] = useState<string|"oldest"|"latest">("latest");

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
        let result;

        result = notificationsList

        if (notificationCategoryFilter !== "all") {
            result = result.filter(notification => notification.category_label === notificationCategoryFilter);
        }

        if (notificationReadStatusFilter !== "all") {
            result = result.filter(notification => notification.read_status === notificationReadStatusFilter);
        }

        setFilteredNotifications(result);
    }, [notificationCategoryFilter, notificationReadStatusFilter])

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNotificationCategoryFilter(e.target.value);
    };

    const handleReadStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNotificationReadStatusFilter(e.target.value);
    };

    const handleDateOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDateOrderFilter(e.target.value);
    };


    return (
        <div style={{backgroundColor: '#f5f5f5', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap'}}>
            <h3 style={{ margin: '0', color: '#333', fontSize: '16px', fontWeight: '600', marginRight: '8px'}}>Filters:</h3>
            
            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#555', whiteSpace: 'nowrap'}}>Category</label>
                <select name="category" value={notificationCategoryFilter} onChange={handleCategoryChange} style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: 'white', fontSize: '12px', width: '80px'}}> 
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
                    value={dateOrderFilter}
                    onChange={handleDateOrderChange}
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
                    value={notificationReadStatusFilter}
                    onChange={handleReadStatusChange}
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