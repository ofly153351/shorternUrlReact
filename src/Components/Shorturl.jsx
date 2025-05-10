import React, { useState, useEffect } from 'react'
import { createShortUrl, getAllCountThislinkclick, getCountlinkClick, incrementLinkcount, shortenUrl } from '../Util/api'
import { QRCodeCanvas } from 'qrcode.react';
import { useStore } from '../useStore/useStore';
import { LinkPreview } from './Material/Linkpreview';

function Shorturl() {
    const [beforeUrl, setBeforeUrl] = useState('')
    const [afterUrl, setAfterUrl] = useState('')
    const [success, setSuccess] = useState(false)
    const { user } = useStore()
    const [userClicked, setUserClicked] = useState(0);
    const [allThislink, setAllthislink] = useState(0)

    useEffect(() => {
        const fetchClickCount = async () => {
            // ตรวจสอบว่า userId มีหรือไม่
            if (user?.userId && afterUrl) {
                try {
                    const res = await getCountlinkClick(user.userId, afterUrl);
                    // console.log('User Clicked:', res.userClicked);
                    setUserClicked(res.userClicked);
                } catch (error) {
                    console.error("Failed to fetch click count:", error);
                }
            }

            // ดึงข้อมูลจำนวนคลิกทั้งหมดสำหรับลิงก์นี้
            if (afterUrl) {
                const all = await getAllCountThislinkclick(afterUrl)
                // console.log('Total Clicks for This Link:', all.totalClicked);
                setAllthislink(all.totalClicked)
            }
        };

        fetchClickCount();
    }, [user?.userId, afterUrl]);

    const handleClickLink = async (e) => {
        e.preventDefault();

        if (user?.userId) { // ตรวจสอบว่า user มี userId หรือไม่
            try {
                // เรียกใช้ incrementLinkcount เพิ่มจำนวนคลิก
                await incrementLinkcount(afterUrl, user.userId);

                // อัพเดต state จำนวนคลิกเพิ่มขึ้นทันที
                setUserClicked(prev => prev + 1);
                setAllthislink(prev => prev + 1);

                // เปิดลิงก์
                window.open(afterUrl, "_blank");
            } catch (error) {
                console.error('Error incrementing click count:', error);
            }
        } else {
            // หากไม่มี userId ก็ให้เปิดลิงก์โดยตรง
            window.open(afterUrl, "_blank");
        }
    }

    const handleShorten = async () => {
        if (beforeUrl) {
            try {
                const shortenedUrl = await shortenUrl(beforeUrl);

                if (shortenedUrl) {
                    setAfterUrl(shortenedUrl);
                    setSuccess(true);
                    let payload = {
                        userId: user.userId,
                        beforeLink: beforeUrl,
                        afterLink: shortenedUrl
                    };

                    const res = await createShortUrl(payload);
                    console.log(res);
                } else {
                    setSuccess(false);
                    alert('เกิดข้อผิดพลาดในการย่อ URL');
                }
            } catch (error) {
                console.log('Error shortening URL:', error);
            }
        } else {
            alert('กรุณากรอก URL');
        }
    }

    useEffect(() => {
        if (!beforeUrl) {
            setSuccess(false); // reset success state when the URL is cleared
        }
    }, [beforeUrl]);

    return (
        <div className="w-full flex justify-center items-center min-h-screen pt-20  ">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Create your short URL!</h2>
                <div className="flex mb-4">
                    <input
                        className="flex-1 rounded-l-md p-4 border border-gray-300"
                        type="text"
                        placeholder="Enter your URL"
                        value={beforeUrl}
                        onChange={(e) => setBeforeUrl(e.target.value)}
                    />
                    <button
                        onClick={handleShorten}
                        className="p-4 bg-[#A86523] text-white rounded-r-md hover:bg-[#E9A319] hover:duration-300"
                    >
                        Shorten Url
                    </button>
                </div>

                {success && (
                    <div className="mt-4 space-y-2 duration-200 ">
                        <LinkPreview url={beforeUrl} />
                        <div>
                            <span className="font-medium">Before URL:</span>{' '}
                            <div className="max-w-[400px] truncate inline-block align-bottom">
                                <a
                                    className="text-blue-500 underline"
                                    href={beforeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {beforeUrl}
                                </a>
                            </div>
                        </div>
                        <div>
                            <span className="font-medium">After Shorten URL:</span>{' '}
                            <a
                                className="text-green-600 underline"
                                href={afterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleClickLink} // ใช้ฟังก์ชันที่สร้างขึ้นมา
                            >
                                {afterUrl === 'undefined' ? 'เกิดข้อผิดพลาด' : afterUrl}
                            </a>
                        </div>
                        {user?.userId && ( // เงื่อนไขแสดงข้อมูลจำนวนคลิก
                            <div className="flex justify-center items-center gap-10">
                                <span>Your Clicked : {userClicked} Times</span>
                                <span>All Clicked This link : {allThislink} Times </span>
                            </div>
                        )}
                        <div className="py-3 grid justify-center gap-2">
                            <span>QR Code</span>
                            <QRCodeCanvas value={afterUrl} size={200} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shorturl;