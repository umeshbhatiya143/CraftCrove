import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import product from '@/models/product'
import Card from '@/components/card'


const Hoodies = ({ products }) => {
  // console.log(products.products)
  return (
    <div>
      <section className="pt-32 text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="flex gap-10 flex-wrap justify-center items-center">
            {Object.keys(products).length===0 && <div>Sorry all the hoodies are currently out of stock, New stocks coming soon, Stay tuned</div> }
            {Object.keys(products).map((item) => {
              return (
                <Card product = {products[item]}/>
              )
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
