import React, { useState, useEffect } from "react";

function Test() {
    const [data, setdata] = useState({
        Name: "",
        Age: 0,
        Date: "",
        programming: "",
    });

    useEffect(() => {
        fetch("/data").then((res) =>
            res.json().then((data) => {
                setdata({
                    name: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        );
    }, []);

    return (
        <div className=''>
            <header className=''>
                <h1>React and flask</h1>
                {/* Calling a data from setdata for showing */}
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
            </header>
        </div>
    );
}

export default Test