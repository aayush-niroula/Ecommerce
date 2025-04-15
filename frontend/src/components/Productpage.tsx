import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Heart, ShoppingCart, Truck, Shield, Star, ChevronDown, ChevronUp, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import{ toast }from 'sonner'

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
}
interface Review{
  id: number;
  userId: number | null;
  rating: number;
  comment: string;
  productId: number | null;
  user:{
    name:string
  }
  createdAt?: string;
}

interface ReviewsResponse {
message:string
reviews:Review[]
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cachedProduct = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(!cachedProduct);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandDescription, setExpandDescription] = useState(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const dispatch = useDispatch<AppDispatch>()

  const productImages = [product?.imageUrl].filter(Boolean);


  const handleAddToCart =(quantity:number)=>{
    if(product){
    dispatch(addToCart({
      userId:DUMMY_USER_ID,
      productId:Number(product.id),
      quantity:quantity
      
    }))
    toast.success(`${product.name} added to cart`)
     
    }

  }

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/product/get/${id}`);
        
        setProduct(response.data.product);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductById()

  }, [cachedProduct, id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get<ReviewsResponse>(`http://localhost:8000/api/v1/review/${id}`);
      console.log(response.data);
      
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [id]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
const DUMMY_USER_ID=1
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReview.trim() || !product) return;

        try {
      await axios.post(`http://localhost:8000/api/v1/review/user/${DUMMY_USER_ID}/product/${product.id}`,{
        rating:userRating,
        comment:userReview
      },{
        headers:{
            "Content-Type":"application/json"
        }
      }) 
      setUserReview("");
      setUserRating(0);
      fetchReviews();
    
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const calculateAverageRating = () => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }
  console.log(product);
  if(!product){
    return <div>Loading......</div>
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "We couldn't find the product you're looking for."}</p>
          <Button
            onClick={() => navigate("/shop")}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-pink-500 transition-colors mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-4 sm:p-8">
            <div className="lg:col-span-2">
              <div className="flex flex-col space-y-4">
                <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-100">
                  <img
                    src={productImages[selectedImage] || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((img, index) => (
                    <div
                      key={index}
                      className={`aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                        selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img || "/placeholder.jpg"}
                        alt={`Product view ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col">
              <div className="mb-4">
                <div className="text-sm font-medium text-pink-500 uppercase tracking-wider mb-1">
                  {product.brand}
                 
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(Math.round(calculateAverageRating()))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.stock > 0 ? (
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="mb-8">
                <div className="text-gray-700">
                  <p className={expandDescription ? '' : 'line-clamp-3'}>
                    {product.description}
                  </p>
                  {product.description?.length > 150 && (
                    <button
                      onClick={() => setExpandDescription(!expandDescription)}
                      className="text-pink-500 text-sm font-medium mt-2 flex items-center hover:text-pink-600"
                    >
                      {expandDescription ? (
                        <>Read less <ChevronUp size={16} className="ml-1" /></>
                      ) : (
                        <>Read more <ChevronDown size={16} className="ml-1" /></>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-gray-700 mr-3">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={product.stock <= quantity}
                    className="px-3 py-1 border-l border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 font-medium rounded-md"
                  disabled={product.stock <= 0}
                >
                  Buy Now
                </Button>
                <Button
                  className="flex-1 border-2 border-pink-500 bg-white text-pink-500 hover:bg-pink-50 py-3 font-medium rounded-md flex items-center justify-center gap-2"
                  disabled={product.stock <= 0} onClick={()=>handleAddToCart(quantity)}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-12 h-12 border-gray-300 rounded-md flex items-center justify-center"
                >
                  <Heart size={20} className="text-gray-500 hover:text-pink-500" />
                </Button>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <Truck size={20} className="text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Free Shipping</h3>
                      <p className="text-xs text-gray-500">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <Shield size={20} className="text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">1 Year Warranty</h3>
                      <p className="text-xs text-gray-500">100% Guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Customer Reviews */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`${
                            star <= userRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          } hover:text-yellow-400 cursor-pointer`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    placeholder="Share your experience with this product..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md px-6 py-2 flex items-center gap-2"
                  >
                    Submit Review <Send size={16} />
                  </Button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.user.name}</span>
                      <span className="text-sm text-gray-500">{review.createdAt ? new Date(review.createdAt).toLocaleTimeString():"Unknown"}</span>
                    </div>
                    <div className="flex mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;