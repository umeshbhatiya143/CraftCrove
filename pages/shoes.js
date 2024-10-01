import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import product from '@/models/product'
import Card from '@/components/card'


const Shoes = ({ products }) => {
  // console.log(products.products)
  return (
    <section className="pt-6 text-gray-600 body-font">
    <div className="container mx-auto">
      <div className="flex justify-center w-full text-3xl font-bold text-pink-500 mb-10">Our Premium Shoes</div>
      <div className="flex gap-10 flex-wrap mb-10 justify-center">
        {Object.keys(products).map((item,index) => {
          return (

            <Card product = {products[item]} key={index}/>
          )
        })}
      </div>
    </div>
  </section>
  )
}

export default Shoes

export async function getServerSideProps(context) {
  // const res = await fetch("http://localhost:3000/api/getProducts")
  // const products = await res.json()
  //console.log(JSON.parse(JSON.stringify(products)))
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await product.find({ category: 'Shoes' })
  let Mugs = {}
  for (let item of products) {
    if (item.title in Mugs) {
      if (!Mugs[item.title].size.includes(item.size) && item.availableQty > 0) {
        Mugs[item.title].color.push(item.color)
      }
      if (!Mugs[item.title].size.includes(item.size) && item.availableQty > 0) {
        Mugs[item.title].size.push(item.size)
      }
    }
    else {
      Mugs[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        Mugs[item.title].color = [item.color]
        Mugs[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(Mugs)) }, // will be passed to the page component as props
  }
}
