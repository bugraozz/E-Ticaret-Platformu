import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  loading: boolean
  error: string | null
  selectedCategory: string
  priceRange: [number, number]
  sortBy: "price-asc" | "price-desc" | "rating" | "default"
  searchQuery: string
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  loading: false,
  error: null,
  selectedCategory: "all",
  priceRange: [0, 1000],
  sortBy: "default",
  searchQuery: "",
}

// Async thunks
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products")
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
})

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
})

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      state.filteredProducts = filterAndSortProducts(state)
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
      state.filteredProducts = filterAndSortProducts(state)
    },
    setSortBy: (state, action: PayloadAction<ProductsState["sortBy"]>) => {
      state.sortBy = action.payload
      state.filteredProducts = filterAndSortProducts(state)
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredProducts = filterAndSortProducts(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.filteredProducts = action.payload
        // Set initial price range based on products
        const prices = action.payload.map((p: Product) => p.price)
        state.priceRange = [Math.min(...prices), Math.max(...prices)]
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = ["all", ...action.payload]
      })
  },
})

// Helper function to filter and sort products
function filterAndSortProducts(state: ProductsState): Product[] {
  const filtered = state.products.filter((product) => {
    const categoryMatch = state.selectedCategory === "all" || product.category === state.selectedCategory
    const priceMatch = product.price >= state.priceRange[0] && product.price <= state.priceRange[1]
    const searchMatch = state.searchQuery === "" || 
      product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(state.searchQuery.toLowerCase())
    return categoryMatch && priceMatch && searchMatch
  })

  // Sort products
  switch (state.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filtered.sort((a, b) => b.rating.rate - a.rating.rate)
      break
    default:
      // Keep original order
      break
  }

  return filtered
}

export const { setSelectedCategory, setPriceRange, setSortBy, setSearchQuery } = productsSlice.actions
export default productsSlice.reducer
