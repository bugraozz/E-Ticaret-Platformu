"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setSelectedCategory, setPriceRange, setSortBy } from "@/lib/features/products/productsSlice"
import { useTranslations } from "next-intl"
import { Filter, X } from "lucide-react"

export function ProductFilters() {
  const dispatch = useAppDispatch()
  const { categories, selectedCategory, priceRange, sortBy } = useAppSelector((state) => state.products)
  const t = useTranslations("filters")
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category))
  }

  const handlePriceRangeChange = (value: number[]) => {
    dispatch(setPriceRange([value[0], value[1]]))
  }

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value as any))
  }

  const clearFilters = () => {
    dispatch(setSelectedCategory("all"))
    dispatch(setPriceRange([0, 1000]))
    dispatch(setSortBy("default"))
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full">
          <Filter className="h-4 w-4 mr-2" />
          {t("filters")}
        </Button>
      </div>

      {/* Filters */}
      <div className={`space-y-6 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* Sort */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">{t("sortBy")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">{t("default")}</SelectItem>
                <SelectItem value="price-asc">{t("priceLowToHigh")}</SelectItem>
                <SelectItem value="price-desc">{t("priceHighToLow")}</SelectItem>
                <SelectItem value="rating">{t("rating")}</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">{t("categories")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category === "all" ? t("allCategories") : category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">{t("priceRange")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          <X className="h-4 w-4 mr-2" />
          {t("clearFilters")}
        </Button>
      </div>
    </>
  )
}
