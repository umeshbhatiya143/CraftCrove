import React from 'react'
import mongoose from 'mongoose'
import product from '@/models/product'
import Card from '@/components/card'


const Stickers = ({ products }) => {
  // console.log(products.products)
  return (
    <div>
      <section className="pt-32 text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="flex gap-10 flex-wrap -m-4 justify-center items-center">
            {Object.keys(products).length===0 && <div>Sorry all the Stickers are currently out of stock, New stocks coming soon, Stay tuned</div> }
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

export default Stickers

export async function getServerSideProps(context) {
  // const res = await fetch("http://localhost:3000/api/getProducts")
  // const products = await res.json()
  //console.log(JSON.parse(JSON.stringify(products)))
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await product.find({ category: 'Stickers' })
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
