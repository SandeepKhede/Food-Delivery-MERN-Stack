import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from 'react-bootstrap/Carousel';
const Home = () => {

  const[foodCat,setFoodCat] = useState([])
  const[foodItem,setFoodItem] = useState([])
  const[search,setSearch] = useState('')

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      }
    });

    response = await response.json();
    // console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData();
  },[])

  return (
    <div>
        <div><Navbar /></div>
        {/* <div><Carousal /></div> */}

        <div id='carousel'>
    <Carousel fade >
      <Carousel.Item>
      <img src="https://source.unsplash.com/random/1250*700/?burger" className="d-block w-100" style={{filter:'brightness(30%)'}} alt="..."/> 
        <Carousel.Caption>
          <div>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {setSearch(e.target.value)}}/>
            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
          </form>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://source.unsplash.com/random/1250*700/?cake" className="d-block w-100" style={{filter:'brightness(30%)'}} alt="..."/> 

        <Carousel.Caption>
        <div>
          <div className="d-flex justify-content-center" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {setSearch(e.target.value)}}/>
            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
          </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://source.unsplash.com/random/1250*700/?bread" className="d-block w-100" style={{filter:'brightness(30%)'}} alt="..."/> 

        <Carousel.Caption>
        <div>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {setSearch(e.target.value)}} />
            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
          </form>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>

        <div className='container'>
          {foodCat !== [] ? foodCat.map((data) => {
            return (
              <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodName={filterItems.name} options={filterItems.options[0]} imgSrc={filterItems.img}/>
                      </div>
                    )
                  }) : <div>No data found</div>}
              </div>
              
            )
          }):''}
        </div>
        <div><Footer /></div>
    </div>
  )
}

export default Home