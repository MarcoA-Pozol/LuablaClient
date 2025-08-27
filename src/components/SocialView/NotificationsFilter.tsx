import React, { useState, useEffect, type SetStateAction } from 'react';
import axios from 'axios';
import type { NotificationSchema } from "../../schemas/Notification";
import { useTranslation } from "react-i18next";
import { useBaseApiUrl } from '../../hooks/useBaseApiUrl';

interface NotificationsFilterProps {
    setFilteredNotifications:React.Dispatch<SetStateAction<NotificationSchema[]>>;
    notificationsList:NotificationSchema[];
}

export const NotificationsFilter = ({setFilteredNotifications, notificationsList}:NotificationsFilterProps) => {
    const [notificationCategories, setNotificationCategories] = useState<string[]>([]);
    const [notificationCategoryFilter, setNotificationCategoryFilter] = useState<string|"All">("All");
    const [notificationReadStatusFilter, setNotificationReadStatusFilter] = useState<string|"Read"|"Unread"|"All">("All");
    const [dateOrderFilter, setDateOrderFilter] = useState<string|"Oldest First"|"Latest First">("Latest First");
    const { t } = useTranslation();

    // Fetch notification's categories
    useEffect(() => {
        const fetchNotificationsCategoriesList = async (setNotificationCategories:React.Dispatch<SetStateAction<string[]>>) => {
            const response = await axios.get(useBaseApiUrl("/social/notifications/categoriesList"), {withCredentials:true});
            const data = response.data;

            setNotificationCategories(data.categories);
        }

        fetchNotificationsCategoriesList(setNotificationCategories);
    }, [])

    // Filter notifications
    useEffect(() => {
        let result;

        result = [...notificationsList];

        if (notificationCategoryFilter === "All") {
            result = [...notificationsList];
        } else {
            result = result.filter(notification => notification.category_label === notificationCategoryFilter);
        }

        if (notificationReadStatusFilter === "All") {
            result = result;
        } else {
            result = result.filter(notification => notification.read_status === notificationReadStatusFilter);
        }

        result = [...result].sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();

            return dateOrderFilter === "Latest First" ? dateB - dateA : dateA - dateB;
        });

        setFilteredNotifications(result);
    }, [notificationCategoryFilter, notificationReadStatusFilter, dateOrderFilter])

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
            <h3 style={{ margin: '0', color: '#333', fontSize: '16px', fontWeight: '600', marginRight: '8px'}}>{t("Filters")}:</h3>
            
            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#555', whiteSpace: 'nowrap'}}>{t("Category")}</label>
                <select name="category" value={notificationCategoryFilter} onChange={handleCategoryChange} style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: 'white', fontSize: '12px', width: '80px'}}> 
                    <option value="All">{t("All")}</option>
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
                }}>{t("Sort by")}</label>
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
                    <option value="Latest First">{t("Latest First")}</option>
                    <option value="Oldest First">{t("Oldest First")}</option>
                </select>
            </div>
            
            {/* Read Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#555',
                    whiteSpace: 'nowrap'
                }}>{t("Status")}</label>
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
                    <option value="All">{t("All")}</option>
                    <option value="Read">{t("Read")}</option>
                    <option value="Unread">{t("Unread")}</option>
                </select>
            </div>
        </div>
    );
};