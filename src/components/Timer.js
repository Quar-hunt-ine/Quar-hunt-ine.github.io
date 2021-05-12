import React, { useEffect, useState } from 'react'

const Timer = () => {

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(`${year}-5-15, 19:00`) - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60))),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
    
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
        });

        const timerComponents = [];

        Object.keys(timeLeft).forEach((interval) => {
            if (!timeLeft[interval]) {
                return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div style={{marginRight: 'auto'}}>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    )
}

export default Timer
