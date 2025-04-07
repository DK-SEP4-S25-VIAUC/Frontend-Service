import React, { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responseType, setResponseType] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                setResponseType(contentType);

                if (contentType && contentType.includes("application/json")) {
                    const result = await response.json();
                    setData(result);
                } else {
                    // if response is not json
                    const textResult = await response.text();
                    setData({ text: textResult });
                }
            } catch (error) {
                setError(error.message);
                console.error(`Error fetching from ${url}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error, responseType };
}

function ApiData({ title, url }) {
    const { data, loading, error, responseType } = useFetch(url);

    return (
        <div className="api-data-container">
            <h3>{title}</h3>

            {loading && <p>Loading data...</p>}

            {error && (
                <div className="error">
                    <p>Error fetching data: {error}</p>
                </div>
            )}

            {data && (
                <div className="data">
                    {responseType && <p><small>Response type: {responseType}</small></p>}
                    {data.text ? (
                        <div className="text-response">
                            <p>Response (as text):</p>
                            <pre>{data.text}</pre>
                        </div>
                    ) : (
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
}

function MultipleFetchExample() {
    return (
        <div className="multiple-fetch-container">
            <h2>API Data from Multiple Endpoints</h2>
            <br/>

                <ApiData
                    title="MAL API Data"
                    url="https://sep4api.azure-api.net/mal/Prototype/testEndpoint"
                />
            <br/>

            <ApiData
                title="IoT API Data"
                    url="https://sep4api.azure-api.net/mal/Prototype/secondEndpoint"
            />
        </div>
    );
}

export default MultipleFetchExample;