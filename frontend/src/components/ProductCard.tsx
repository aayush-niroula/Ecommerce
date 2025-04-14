import React from 'react'

interface ProductCardProps{
    imageUrl?: string,
    name: string;
    price: number;
    stock:number;
    description:string;
    onClick :()=>void;
}


const ProductCard:React.FC<ProductCardProps> = ({imageUrl,name,price,onClick}) => {

  return (
    <div className='bg-white shadow p-4 rounded-2xl hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer' onClick={onClick}>
    <img src={imageUrl} className='w-full h-48 object-cover rounded-xl'/>
    <h3 className='text-lg font-semibold mt-2'>{name}</h3>
    <p className='text-gray-700 font-medium m-1'>{price.toFixed(2)}</p>


    </div>
  )
}

export default ProductCard