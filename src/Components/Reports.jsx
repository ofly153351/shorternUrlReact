import React, { useEffect, useState } from 'react'
import ReportsCard from './Material/ReportsCard'
import { getAllclick } from '../Util/api';

function Reports() {
    const [totalClicks, setTotalClicks] = useState('')
    const [totalLinks, setTotlaLinks] = useState('')
    const [totalLinksToday, setTotalLinksToday] = useState('')



    useEffect(() => {
        try {
            const FetchData = async () => {
                const res = await getAllclick()
                console.log("reports", res?.data || []);
                setTotalLinksToday(res?.data?.totalLinksToday)
                setTotlaLinks(res?.data?.totalLinks)
                setTotalClicks(res?.data?.totalClicks)
            }
            FetchData()
        } catch (error) {
            console.error(error);
        }

    }, [])



    const labelReport = [
        { name: 'All Clicks', value: totalClicks || 0 },
        { name: 'All Links', value: totalLinks || 0 },
        { name: 'Link Today', value: totalLinksToday || 0 }
    ];


    return (
        <div className="w-full  flex justify-center items-center   pb-10 ">
            <div className="w-full flex  justify-around items-center max-w-xl bg-white rounded-lg shadow-lg p-2">
                {labelReport.map((item, index) => (
                    <ReportsCard key={index} label={item.name} data={item.value} />
                ))}
            </div>
        </div>
    )
}

export default Reports