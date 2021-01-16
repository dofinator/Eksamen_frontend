import React, { useEffect, useState } from "react";
import facade from "./apiFacade.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Link, Route, useRouteMatch, Switch } from "react-router-dom";


export default function Hotel() {
    let { path, url } = useRouteMatch();
    let { hotelId } = useParams();

    const [id, setId] = useState(hotelId)

    const hotelObj = {
        id: "",
        name: "",
        address: "",
        email: "",
        phone: "",
        price: "",
        url: ""
    }

    const [hotel, setHotel] = useState(hotelObj)

    const getHotel = (evt) => {
        facade.fetchHotel(id).then(data => setHotel(data))
        console.log(hotelId)
    }

    useEffect(() => {
        getHotel()

    })

    return (
        <div>
            <table className="table">
                <thead>
                    <tr><th>Hotel name</th><th>Address</th><th>Email</th><th>Phone</th><th>Price pr. night</th><th>Link</th></tr>
                </thead>
                <tbody>

                    <tr key={hotel.id}>
                        <td>{hotel.name}</td>
                        <td>{hotel.address}</td>
                        <td>{hotel.email}</td>
                        <td>{hotel.phone}</td>
                        <td>{hotel.price}</td>
                        <td>{hotel.url}</td>
                        <td><button><Link to={`${url}/${hotel.id}`}> Book hotel </Link></button></td>
                    </tr>


                </tbody>
            </table>

        </div>
    )



}