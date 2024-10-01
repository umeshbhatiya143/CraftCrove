import React from 'react'
import mongoose from 'mongoose'
import product from '@/models/product'
import Card from '@/components/card'


const Tshirts = ({ products }) => {
  // console.log(products.products)
  return (

      <section className="pt-6 text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="flex justify-center w-full text-3xl font-bold text-pink-500 mb-10">Our Premium Tshirts</div>
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

export default Tshirts

export async function getServerSideProps(context) {
  // const res = await fetch("http://localhost:3000/api/getProducts")
  // const products = await res.json()
  //console.log(JSON.parse(JSON.stringify(products)))
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await product.find({ category: 'Tshirts' })
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}
