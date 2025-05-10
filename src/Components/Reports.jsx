import React, { useEffect, useState } from 'react'
import ReportsCard from './Material/ReportsCard'
import { getAllclick } from '../Util/api';
import Loading from './Material/Loading';

function Reports() {
    const [totalClicks, setTotalClicks] = useState('')
    const [totalLinks, setTotlaLinks] = useState('')
    const [totalLinksToday, setTotalLinksToday] = useState('')
    const [LoadingReport, setLoadingReport] = useState(true)

    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await getAllclick()
                console.log("reports", res?.data || []);
                setTotalLinksToday(res?.data?.totalLinksToday)
                setTotlaLinks(res?.data?.totalLinks)
                setTotalClicks(res?.data?.totalClicks)

                if (res) {
                    setLoadingReport(false)
                }
            } catch (error) {
                console.error(error);
                setLoadingReport(false); // Set loading to false even if there is an error
            }
        }
        FetchData()
    }, [])

    const labelReport = [
        { name: 'All Clicks', value: totalClicks || 0 },
        { name: 'All Links', value: totalLinks || 0 },
        { name: 'Link Today', value: totalLinksToday || 0 }
    ];

    return (
        <div className="w-full flex justify-center items-center pb-10">
            <div className="w-full flex justify-around items-center max-w-xl bg-white rounded-lg shadow-lg p-2">
                {LoadingReport ? (
                    <div><Loading /></div> // Or a spinner, or any other indicator
                ) : (
                    labelReport.map((item, index) => (
                        <ReportsCard key={index} label={item.name} data={item.value} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Reports;