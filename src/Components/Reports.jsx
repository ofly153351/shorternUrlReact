import React, { useEffect } from 'react'
import ReportsCard from './Material/ReportsCard'
import { getAllclick } from '../Util/api';

function Reports() {

    useEffect(() => {
        try {
            const FetchData = async () => {
                const res = await getAllclick()
                console.log(res);
            }
            FetchData()
        } catch (error) {
            console.error(error);
        }

    }, [])



    const labelReport = [
        { name: 'All Clicks', value: 0 },
        { name: 'Total Links', value: 0 },
        { name: 'Clicks Today', value: 0 }
    ];
    return (
        <div className="w-full  flex justify-center items-center   pb-10 ">
            <div className="w-full flex justify-around items-center max-w-xl bg-white rounded-lg shadow-lg p-2">
                {labelReport.map((item, index) => (
                    <ReportsCard key={index} label={item.name} data={item.value} />
                ))}
            </div>
        </div>
    )
}

export default Reports