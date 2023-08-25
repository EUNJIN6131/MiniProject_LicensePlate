import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Box, Button } from "@mui/material";
import dayjs from 'dayjs';

export default function Calendar() {
    const [dateRange, setDateRange] = React.useState([null, null]);
    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [dateButtonText, setDateButtonText] = React.useState('');

    const handleShortcutClick = (shortcut) => {
        const today = new Date();
        const { getValue, label } = shortcut;

        const [startDate, endDate] = getValue();
        setDateRange([startDate, endDate]);
        setCalendarDate(today);
        setDateButtonText(label);
    };

    const shortcuts = [
        {
            label: '오늘',
            getValue: () => {
                const today = dayjs();
                return [today.startOf('day'), today.endOf('day')];
            },
        },
        {
            label: '1주',
            getValue: () => {
                const today = dayjs();
                const oneWeekAgo = today.subtract(1, 'week');
                return [oneWeekAgo, today];
            },
        },
        {
            label: '2주',
            getValue: () => {
                const today = dayjs();
                const twoWeeksAgo = today.subtract(2, 'week');
                return [twoWeeksAgo, today];
            },
        },
        {
            label: '1개월',
            getValue: () => {
                const today = dayjs();
                const oneMonthAgo = today.subtract(1, 'month');
                return [oneMonthAgo, today];
            },
        },
        {
            label: '6개월',
            getValue: () => {
                const today = dayjs();
                const sixMonthsAgo = today.subtract(6, 'month');
                return [sixMonthsAgo, today];
            },
        },
    ];

    const handleQuerySubmit = () => {
        console.log('Selected Date Range:', dateRange);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', gap: '8px' }}>
                {shortcuts.map((shortcut, index) => (
                    <Button
                    key={index}
                    onClick={() => handleShortcutClick(shortcut)}
                    variant="contained"
                    sx={{
                        border:'1px solid black',
                        backgroundColor: '#DDDDDD',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#CCCCCC', 
                        },
                    }}
                >
                    {shortcut.label}
                </Button>
                ))}
            </Box>
            <p>조회날짜: {dateButtonText}</p>
            <DateRangePicker
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                calendarDate={calendarDate}
                localeText={{ start: 'start date', end: 'end date' }}
            />
            <Button onClick={handleQuerySubmit} variant="contained" sx={{ mt:3, width:'100%',
                        border:'1px solid black',
                        backgroundColor: '#DDDDDD', 
                        color: 'black', 
                        '&:hover': {
                            backgroundColor: '#CCCCCC', 
                        },
                    }}>
                조회하기
            </Button>
        </LocalizationProvider>
    );
}
