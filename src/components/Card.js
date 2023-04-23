import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
const Card = (props) => {
  const[qty,setQyt] = useState(1);
  const[size,setSize] = useState("")

  const priceRef = useRef()

  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOptions = Object.keys(options);
  // let foodItem = props.foodItems;
  // console.log(foodItem)



  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;

        break;
      }
    }
    // console.log(food)
    // console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id:props.foodItems._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({type:"ADD",
        id:props.foodItems._id,
        name:props.foodItems.name,
        price:finalPrice,
        qty:qty,
        size:size
        })
        return
      }
      return
    }

    await dispatch({type:"ADD",
    id:props.foodItems._id,
    name:props.foodItems.name,
    price:finalPrice,
    qty:qty,
    size:size
    })


    // setBtnEnable(true)

  }

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
        <div className="card mt-3" style={{width: '18rem', maxHeight:'360px'}}>
          {/* <img src="https://source.unsplash.com/random/100×100/?fruit" className="card-img-top" alt="..." /> */}
          <img  className="card-img-top" alt="..." src={props.foodItems.img} style={{width: '100%', height: '10rem'}}  />
          <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            <div className="container w-100">
                <select className='m-2 h-100 bg-success text-white' onClick={(e) => setQyt(e.target.value)}>
                  {Array.from(Array(6),(e,i) => {
                    return(
                      <option key={i+1} value={i+1}>{i+1}</option>
                    )
                  })}
                </select>
                
                <select className='m-2 h-100 bg-success text-white' ref={priceRef} onClick={(e) => setSize(e.target.value)}>
                  {priceOptions.map((data) => {
                    return (
                      <option key={data} value={data}>{data}</option>
                    )
                  })}
                </select>

                <div className='d-inline h-100 fs-5'>
                ₹{finalPrice}/-
                </div>
            </div>
            <hr />
            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
    </div>
  )
}

export default Card