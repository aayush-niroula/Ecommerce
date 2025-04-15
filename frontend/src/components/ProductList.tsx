import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {  setAllProducts } from '../redux/productSlice';
import LeftSideBar from './LeftSideBar';
import Form from './Form';
import { Search, Filter, X } from 'lucide-react';

const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/product/get");
                dispatch(setAllProducts(res.data.products));
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [dispatch]);

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
   
    const handleClick = (product : any)=>{
        navigate(`/product/${product.id}`)
    }
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden flex justify-between items-center bg-white p-4 shadow-sm">
                <button 
                    onClick={toggleFilters}
                    className="flex items-center gap-2 text-gray-600 font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    <Filter size={18} />
                    Filters
                </button>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                </div>
            </div>

            {/* Sidebar - Hidden on mobile unless toggled */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 bg-white shadow-md md:shadow-none overflow-y-auto fixed md:sticky top-0 h-screen z-10`}>
                <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="font-bold text-lg">Filters</h2>
                    <button onClick={toggleFilters} className="text-gray-500">
                        <X size={24} />
                    </button>
                </div>
                <LeftSideBar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header with search and add button on desktop */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">All Products</h1>
                            <p className="text-gray-500 mt-1">Browse our collection of premium products</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
                            {/* Search bar - hidden on mobile (shown at top) */}
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 w-64"
                                />
                            </div>
                            
                            <button
                                onClick={toggleAddForm}
                                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                                {showAddForm ? 'Hide Form' : 'Add Product'}
                            </button>
                        </div>
                    </div>
                     
                    {/* Add Product Form - Conditionally rendered */}
                    {showAddForm && (
                        <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Product</h2>
                            <Form />
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products
                                .filter(product => 
                                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        imageUrl={product.imageUrl}
                                        name={product.name}
                                        price={product.price}
                                        stock={product.stock}
                                        description={product.description}
                                        onClick={()=>handleClick(product)}
                                    />
                                ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                <div className="bg-gray-100 rounded-full p-6 mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-700 mb-2">No Products Found</h3>
                                <p className="text-gray-500 max-w-md">
                                    We couldn't find any products. Try adjusting your search or add a new product.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductList;