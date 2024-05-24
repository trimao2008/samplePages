import React from "react";

const { useState, useEffect } = React;

function HookSample() {
    const [loading, setLoading] = useState(Boolean);
    const [data, setData] = useState<any | null>(null)
    const [page, setPage] = useState(1);
    const [test, setTest] = useState(String);
    function loadData() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (page === 1) {
                setTest('trimao')
                setData([1, 2, 3, 4, 5]);
            } else if (page === 2) {
                setTest('qamt')
                setData([6, 7, 8, 9, 10]);
            } else {
                setTest('')
                setData(null);
            }
        }, 1000);
    }

    useEffect(loadData, [page, test]);

    function handleNext() {
        setPage((currentPage) => currentPage + 1);
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {data && <pre>{JSON.stringify(data, null, 1)}</pre>}
            <span>Current Page: {page} {test}</span>
            <button onClick={handleNext}>Next</button>
        </>
    );
}

export default HookSample;