import React from 'react'
import mongoose from 'mongoose'
import product from '@/models/product'
import Card from '@/components/card'


const Jeans = ({ products }) => {
  // console.log(products.products)
  return (
    <section className="pt-6 text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="text-4xl mb-10 text-center font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">Our Premium Jeans</div>
          <div className="flex gap-1 flex-wrap mb-10 justify-center">
            {Object.keys(products).map((item, index) => {
              return (

                <Card product = {products[item]} key={index}/>
              )
            })}
          </div>
        </div>
      </section>
  )
}

export default Jeans

export async function getServerSideProps(context) {
  // const res = await fetch("http://localhost:3000/api/getProducts")
  // const products = await res.json()
  //console.log(JSON.parse(JSON.stringify(products)))
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await product.find({ category: 'Jeans' })
  let Stickers = {}
  for (let item of products) {
    if (item.title in Stickers) {
      if (!Stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        Stickers[item.title].color.push(item.color)
      }
      if (!Stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        Stickers[item.title].size.push(item.size)
      }
    }
    else {
      Stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        Stickers[item.title].color = [item.color]
        Stickers[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(Stickers)) }, // will be passed to the page component as props
  }
}
