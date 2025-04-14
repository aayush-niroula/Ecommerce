import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'

interface FormData{
    name:string;
    description:string;
    brand :string;
    price:number;
    stock:number;
    imageUrl:string;
    categoryId:number
}
interface Category{
    id:number;
    name:string;
}

const Form:React.FC = () => {
    const [categories,setCategories]=useState<Category[]>([])
    const [imageFile,setImageFile]=useState<File | null>(null)
    const [imagePreview,setImagePreview]=useState<string|null>(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')
    const [message,setMessage]=useState('')
    const [formData,setFormData]=useState<FormData>({
        name:"",
        description:"",
        price:0,
        brand:"",
        stock:0,
        imageUrl:"",
        categoryId:0
        })

    useEffect(()=>{
       const fetchCategories=async()=>{
        try {
            const response = await axios.get<Category[]>("http://localhost:8000/api/v1/category/");
            setCategories(response.data)
            
        } catch (error) {
            console.log(error);
            
        }
       }
       fetchCategories()
    },[])

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
      if(!formData.name || !formData.brand||!formData.categoryId){
        throw new Error("please fill all required fields")
      }
        if(formData.price <=0){
            throw new Error("Price must be greater than )")
        }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('stock', formData.stock.toString());
      formDataToSend.append('categoryId', formData.categoryId.toString());

      if(imageFile){
        formDataToSend.append('image',imageFile)
      }
        await axios.post('http://localhost:8000/api/v1/product/add', 
            formDataToSend, {
              headers: {
                "Content-Type": 'multipart/form-data'
              }
            }
        )
        setMessage("Product Added succesfully")
        setFormData({
          name:"",
          description:"",
          price:0,
          brand:"",
          stock:0,
          imageUrl:"",
          categoryId:0
        })
        setImageFile(null)
        setImagePreview(null)
            
        } catch (error:any) {
          if(axios.isAxiosError(error)){
            setError(error.response?.data?.message || error.message)
          }else if(error instanceof Error){
            setError(error.message)
          }else{
            setError("An unexpected error occured")
          }
        }
        finally{
          setLoading(false)
        }
    }

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'stock' || name === 'categoryId' 
          ? Number(value)
          : value
      }));
    };

    const handleFileChange =(e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files && e.target.files[0]){
        const file= e.target.files[0]

        if(!file.type.startsWith('image/')){
          setError("Please upload an image file")
          return
        }
        if(file.size > 5*1024*1024){
          setError("File size must be less than 5MB")
        }
        setImageFile(file)
        setError('')

        const preview = new FileReader()
        preview.onloadend= ()=>{
          setImagePreview(preview.result as string)
        };
        preview.readAsDataURL(file)
      }
    }
  return (
<div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        {(error || message) && (
          <div className={`mb-6 p-4 rounded-lg ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {error || message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Brand and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product image
              </label>
              <div>
                {imagePreview &&(
                  <img src={imagePreview} alt='preview' className='mb-4 rounded-lg h-32 w-32 object-cover'/>
                  
                )}

                <label className='cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' >Choose File
                <input type="file"
                accept='image/*'
                onChange={handleFileChange} 
                className="sr-only"
                />
                </label>
                {imageFile && (
                  <p className='mt-2 text-sm text-gray-500'>{imageFile.name}({Math.round(imageFile.size /1024)}KB)</p>
                )}
                
              </div>
            
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form