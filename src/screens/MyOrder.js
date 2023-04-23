import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const MyOrder = () => {

    const[orderData,setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        // console.log(localStorage.getItem('userEmail'));
        await fetch('http://localhost:5000/api/myorderData',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setOrderData(response.orderData)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    },[])

    // console.log(orderData)



  return (
    <>
        <div>
            <Navbar />
        </div>

        <div className='container'>
                <div className="row">
                    {orderData ? orderData.map((item) => {
                        return (
                            item.map((arrData,i) => {
                                return (
                                    <div key={i} >
                                    {arrData.Order_date ? <div className='m-auto mt-5'>

                                        {item = arrData.Order_date}
                                        <hr />
                                    </div> :

                                        <div className='col-12 col-md-6 col-lg-3' >
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                {/* <img src={arrData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">{arrData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{arrData.qty}</span>
                                                        <span className='m-1'>{arrData.size}</span>
                                                        <span className='m-1'>{item}</span>
                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                            ₹{arrData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>



                                    }

                                </div>
                                )
                            })
                        )
                    }):""}
                </div>
        </div>

        <div>
            <Footer />
        </div>
    </>
  )
}
