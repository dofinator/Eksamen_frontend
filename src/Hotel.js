import React, { useEffect, useState } from "react";
import facade from "./apiFacade.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Link, Route, useRouteMatch, Switch } from "react-router-dom";


export default function Hotel(props) {
    let { path, url } = useRouteMatch();
    let { hotelId } = useParams();

    const [id, setId] = useState(hotelId)
    const loggedIn = facade.loggedIn()

    const hotelObj = {
        id: "",
        name: "",
        address: "",
        email: "",
        phone: "",
        price: "",
        url: ""
    }

    const bookingObj = {
        userName: "",
        startDate: "",
        nights: ""
    }

    const [hotel, setHotel] = useState(hotelObj)
    const [booking, setBooking] = useState(bookingObj)

    const getHotel = (evt) => {
        facade.fetchHotel(id).then(data => setHotel(data))
        console.log(hotelId)
    }

    const onChange = (evt) => {
        setBooking({ ...booking, [evt.target.id]: evt.target.value })
    }
    
    console.log(booking)

    const bookHotel = (evt) => {
        evt.preventDefault();
        setBooking({ ...booking, userName: facade.getUserName() })
        console.log(booking)
        facade.bookHotel(booking, hotel.id)
        setHotel(hotelObj)
    }

    const bookHotelNotLoggedIn = (evt) =>{
        evt.preventDefault();
        window.alert("You need to be logged in to book a hotel"+ {})
    }

    useEffect(() => {
        getHotel()
    }, [])

    return (
        <div>
            {!loggedIn ? (
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
                            <td><a href={hotel.url} target="_blank">{hotel.url}</a></td>
                        </tr>
                    </tbody>
                </table>
                
                <div>
                    <form className="form-horizontal">
                        <h4>Book hotel "{hotel.name}"</h4>
                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="startDate">
                                Enter number of nights
  </label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    id="nights"
                                    placeholder="Enter nights"
                                    
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="fName">
                                Enter check-in date
  </label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    id="startDate"
                                    placeholder="dd/mm/yy"
                                    
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-9">
                                <button onClick={bookHotelNotLoggedIn} type="submit" className="btn btn-primary">
                                    Book hotel
    </button>
                            </div>
                        </div>


                    </form>

                </div>
            </div>
                
            ) : (

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
                                </tr>
                            </tbody>
                        </table>
                        
                        <div>
                            <form className="form-horizontal">
                                <h2>Book hotel</h2>
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="startDate">
                                        Enter number of nights
          </label>
                                    <div className="col-sm-9">
                                        <input
                                            className="form-control"
                                            id="nights"
                                            placeholder="Enter nights"
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="fName">
                                        Enter check-in date
          </label>
                                    <div className="col-sm-9">
                                        <input
                                            className="form-control"
                                            id="startDate"
                                            placeholder="dd/mm/yy"
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-sm-offset-3 col-sm-9">
                                        <button onClick={bookHotel} type="submit" className="btn btn-primary">
                                            Book hotel
            </button>
                                    </div>
                                </div>


                            </form>

                        </div>
                    </div>
                )}
        </div>
    )



}