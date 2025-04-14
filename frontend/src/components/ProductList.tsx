import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setAllProducts } from '../redux/productSlice';
import LeftSideBar from './LeftSideBar';
import Form from './Form';

const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);

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

    return (
        <div className="flex h-screen overflow-hidden max-w-full ">
            {/* Sidebar */}
            <aside className="w-64  left-0 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
                <LeftSideBar />
            </aside>
    
            {/* Main Content */}
            <main className="flex-1  max-w-full overflow-y-auto bg-gray-100 p-8">
                <div className="max-w-full">
                    <h2 className="text-2xl font-bold mb-6">All Products</h2>
    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                imageUrl={product.imageUrl}
                                name={product.name}
                                price={product.price}
                                stock={product.stock}
                                description={product.description}
                                onClick={() => navigate("/")}
                            />
                        ))}
                    </div>
    
                </div>
            </main>
                    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mx-auto">
                        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                        <Form />
                    </div>
        </div>
    );
}    

export default ProductList