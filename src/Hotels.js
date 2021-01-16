import React, { useEffect, useState } from "react";
import facade from "./apiFacade.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, useRouteMatch, Switch } from "react-router-dom";
import Hotel from "./Hotel";

export default function AllHotels(props) {

    let { path, url } = useRouteMatch();

    const hotelsObj = [
        {
            id: "",
            name: "",
            address: "",
            email: "",
            phone: "",
            price: "",
            url: ""
        }
    ]


    const [hotels, setHotels] = useState(hotelsObj)
    const [input, setInput] = useState("");

    useEffect(() => {
        facade.fetchHotels().then(data => {
            setHotels(data)
        })
    }, [])

    const onChange = (evt) => {
        setInput(evt.target.value)
    }

    return (
        <div>
            <Switch>
                <Route exact path={path} >
                    <br />
                    <table className="table">
                        <thead>
                            <tr><th>Hotel name</th></tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotel) => (

                                <tr key={hotel.id}>
                                    <td>{hotel.name}</td>
                                    <td><button><Link to={`${url}/${hotel.id}`}> Details </Link></button></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </Route>
                <Route path={`${path}/:hotelId`}>
                    <Hotel loggedIn={props.loggedIn} />
                </Route>
            </Switch>



        </div >
    )


}
