import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import product from '@/models/product'


const Hoodies = ({ products }) => {
  // console.log(products.products)
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center items-center">
            {Object.keys(products).length===0 && <div>Sorry all the hoodies are currently out of stock, New stocks coming soon, Stay tuned</div> }
            {Object.keys(products).map((item) => {
              return <Link href={`/product/${products[item].slug}`} key={products[item]._id} className="flex lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg h-78 rounded overflow-hidden item-center"><div >
                
                  <img alt="ecommerce" className="m-auto md:m-0 h-[38vh]" src={products[item].img} />
                
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">{products[item].price}</p>
                  <div className='mt-1'>
                    {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1 '>S</span>}
                    {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1 '>M</span>}
                    {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1 '>L</span>}
                    {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1 '>XL</span>}
                    {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1 '>XXL</span>}
                  </div>
                  <div className="mt-1">
                    {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
                </div>
              </div>
              </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hoodies

export async function getServerSideProps(context) {
  // const res = await fetch("http://localhost:3000/api/getProducts")
  // const products = await res.json()
  //console.log(JSON.parse(JSON.stringify(products)))
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await product.find({ category: 'Hoodies' })
  let Hoodies = {}
  for (let item of products) {
    if (item.title in Hoodies) {
      if (!Hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        Hoodies[item.title].color.push(item.color)
      }
      if (!Hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        Hoodies[item.title].size.push(item.size)
      }
    }
    else {
      Hoodies[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        Hoodies[item.title].color = [item.color]
        Hoodies[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(Hoodies)) }, // will be passed to the page component as props
  }
}
