import { useState } from "react";

export const GetEmployeesData = () => {
    const [data, setData] = useState<string>("");
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5ODMzNzY2LCJpYXQiOjE3NDk4MzE5NjYsImp0aSI6ImMyNDMxZTRhNTI5MTRmZWZhZjA3MWMzY2U4MjU4NDFmIiwidXNlcl9pZCI6OX0.pTeXh8_zk5ScpDHhmIkcJOAGZqwZCciO30y3pe88nJY";

    const handleClick = async () => {
        const response = await fetch("http://localhost:8600/api/employees", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        setData(JSON.stringify(json)); 
        console.log(data);
    }

    return (
        <div>
            <button onClick={handleClick}>Fetch Data</button>
            {data && <p>{data}</p>}
        </div>
    );
}