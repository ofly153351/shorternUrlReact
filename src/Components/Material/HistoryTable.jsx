import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { incrementLinkcount } from '../../Util/api';
import { useStore } from '../../useStore/useStore';

function HistoryTable({ data }) {
    const { user } = useStore();

    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        setLocalData(data); // sync ข้อมูล props เข้าสู่ state ภายใน component
    }, [data]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="history table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">BeforeLink</TableCell>
                        <TableCell align="center">AfterLink</TableCell>
                        <TableCell align="center">Create At</TableCell>
                        <TableCell align="center">Your Click Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {localData && localData.length > 0 ? (
                        localData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.beforeLink}</TableCell>
                                <TableCell align="center">
                                    <a
                                        href={row.afterLink}
                                        className="text-[#A86523] hover:text-[#E9A319]"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await incrementLinkcount(row.afterLink, user.userId);
                                            setLocalData(prev =>
                                                prev.map((item, i) =>
                                                    i === index
                                                        ? { ...item, Clicked: (item.Clicked || 0) + 1 }
                                                        : item
                                                )
                                            );
                                            window.open(row.afterLink, '_blank');
                                        }}
                                    >
                                        {row.afterLink}
                                    </a>
                                </TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                                <TableCell align="center">{row.Clicked}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No history found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default HistoryTable;