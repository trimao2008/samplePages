import React from "react";

function Clock() {

    let [time, setTime] = React.useState(new Date());

    const handleClick = () => {
        setTime(addMinutes(time, 10));
        // time = addMinutes(time, 10);
    };

    return (
        <>
            <div>
                <p>{time.toLocaleTimeString()}</p>
                <button onClick={handleClick}>+ 10 Minutes</button>
            </div>
        </>
    );
}

function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

export default Clock;
