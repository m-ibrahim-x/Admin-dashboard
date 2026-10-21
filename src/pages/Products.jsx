import ProductsFilters from "../components/pages/Products/ProductsFilters"
import ProductsHeader from "../components/pages/Products/ProductsHeader"
import ProductCard from "../components/ui/ProductCard"
import { getProducts, searchProducts } from "../api/productApi"
import { useEffect, useMemo, useState } from "react"
import { Box, Star, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"
import ProductsSkeleton from "../skeleton/pages/Products/ProductsSkeleton";
import ProductsError from "../error/pages/Products/ProductsError";

export const Products = () => {

  // all products
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // filters & search
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [subcategory, setSubcategory] = useState("")

  // stats
  const statsData = useMemo(() => [
  {
    id: "total",
    label: "Total",
    value: String(products.length),
    icon: <Box className="size-5" strokeWidth={1.8} />,
    iconClassName:
      "border border-brand-active/20 bg-active-bg text-brand-active",
  },
  {
    id: "featured",
    label: "Featured",
    value: String(products.filter((product) => product.featured).length),
    icon: <Star className="size-5" strokeWidth={1.8} />,
    iconClassName:
      "border border-brand-active/20 bg-active-bg text-brand-active",
  },
  {
    id: "in-stock",
    label: "In Stock",
    value: String(products.filter((product) => Number(product.stock) > 0).length),
    icon: <CheckCircle2 className="size-5" strokeWidth={1.8} />,
    iconClassName:
      "border border-brand-active/20 bg-active-bg text-brand-active",
  },
  {
    id: "out-of-stock",
    label: "Out of Stock",
    value: String(
      products.filter(
        (product) =>
          product.stock !== null &&
          product.stock !== undefined &&
          product.stock !== "" &&
          Number(product.stock) <= 0
      ).length
    ),
    icon: <XCircle className="size-5" strokeWidth={1.8} />,
    iconClassName:
      "border border-status-danger/20 bg-status-danger/10 text-status-danger",
  },
  ], [products])

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await getProducts()
        setProducts(response.data.products)
        console.log(response.data);  
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch products'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  },[])

  // handle filters
  const handleApplyFilters = async (filters) => {
    try {
      setLoading(true)
      setError(null)

      const { search = "", category = "all", subcategory ="" } = filters

      const activeFilters = 
        search.trim() !== "" || 
        category !== "all" || 
        subcategory !== ""
      const response = activeFilters 
      ? await searchProducts(filters) 
      : await getProducts()

      setProducts(response.data.products)
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to search products"

      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  
  // loading
  if (loading) {
    return <ProductsSkeleton />;
  }

  // error
  if (error || !products) {
    return <ProductsError message={error}  />;
  }
  
  return (
    <div className="space-y-4 p-5">
      <ProductsHeader StatsData={statsData} />
      <ProductsFilters
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        category={category}
        onCategoryChange={(e) => setCategory(e.target.value)}
        subcategory={subcategory}
        onSubcategoryChange={(e) => setSubcategory(e.target.value)}
        onApplyFilters={handleApplyFilters}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

export default Products
