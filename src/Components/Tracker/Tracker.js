import './style.css';
import React, { useState, useEffect } from "react";


const FundTable = () => {
    const [funds, setFunds] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        fetch("https://asn-tracker.paulvandenburg.nl/get_fund_data.php")
            .then((response) => response.json())
            .then((data) => {
                setFunds(data);
                if (data.length > 0) {
                    setDates(Object.keys(data[0].prices).sort().reverse());
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Koersen</th>
                        {dates.map((date) => (
                            <th key={date}>{date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {funds.map((fund) => (
                        <tr key={fund.fundId}>
                            <td className="lol" > {fund.fundName.slice(13)}</td>
                            {dates.map((date) => (
                                <td key={date}>
                                    {fund.prices[date] ? fund.prices[date].toFixed(2) : "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FundTable;