import React from 'react'

function ReportsCard({ label, data }) {
    console.log(data);

    return (

        <div className='flex justify-center items-center p-4 bg-white rounded-lg shadow-md'>
            <div className='grid gap-2 h-fit w-[30%]  items-center justify-center text-center'>
                <span className='text-lg font-bold text-gray-700'>{label}</span>
                <span className='text-xl font-semibold text-[#A86523]'>{data}</span>
            </div>
        </div>
    )
}

export default ReportsCard