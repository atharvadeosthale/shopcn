import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Star, Download, Eye, ShoppingCart, User, Grid, List } from 'lucide-react'
import { useState, useMemo } from 'react'

export const Route = createFileRoute('/')({
  component: Marketplace,
})

interface Component {
  id: number
  name: string
  creator: string
  price: number
  rating: number
  downloads: number
  description: string
  category: string
  tags: string[]
  featured?: boolean
}

const MOCK_COMPONENTS: Component[] = [
  {
    id: 1,
    name: 'Premium Button Pack',
    creator: 'shadcn-pro',
    price: 12,
    rating: 4.9,
    downloads: 1247,
    description: 'Advanced button variants with animations and micro-interactions',
    category: 'Buttons',
    tags: ['buttons', 'animations', 'variants', 'hover-effects'],
    featured: true
  },
  {
    id: 2,
    name: 'Advanced Data Table',
    creator: 'ui-master',
    price: 24,
    rating: 4.8,
    downloads: 892,
    description: 'Feature-rich data table with sorting, filtering, and pagination',
    category: 'Data Display',
    tags: ['table', 'data', 'sorting', 'pagination'],
    featured: true
  },
  {
    id: 3,
    name: 'Dashboard Template Pro',
    creator: 'design-studio',
    price: 49,
    rating: 5.0,
    downloads: 456,
    description: 'Complete dashboard template with charts and analytics',
    category: 'Templates',
    tags: ['template', 'dashboard', 'charts', 'analytics']
  },
  {
    id: 4,
    name: 'Form Builder Kit',
    creator: 'form-experts',
    price: 18,
    rating: 4.7,
    downloads: 723,
    description: 'Dynamic form components with validation and step wizards',
    category: 'Forms',
    tags: ['forms', 'validation', 'wizard', 'input']
  },
  {
    id: 5,
    name: 'Navigation Mega Menu',
    creator: 'nav-designs',
    price: 15,
    rating: 4.6,
    downloads: 634,
    description: 'Responsive mega menu with dropdown animations',
    category: 'Navigation',
    tags: ['navigation', 'menu', 'responsive', 'dropdown']
  },
  {
    id: 6,
    name: 'Modal & Dialog System',
    creator: 'modal-pro',
    price: 21,
    rating: 4.9,
    downloads: 1089,
    description: 'Advanced modal system with stacking and focus management',
    category: 'Feedback',
    tags: ['modal', 'dialog', 'overlay', 'focus']
  },
  {
    id: 7,
    name: 'Animated Card Collection',
    creator: 'card-master',
    price: 16,
    rating: 4.5,
    downloads: 821,
    description: 'Beautiful card components with hover animations and layouts',
    category: 'Layout',
    tags: ['cards', 'animations', 'layout', 'grid']
  },
  {
    id: 8,
    name: 'Icon Button Set',
    creator: 'icon-studio',
    price: 8,
    rating: 4.3,
    downloads: 1456,
    description: 'Icon buttons with various styles and interactions',
    category: 'Buttons',
    tags: ['buttons', 'icons', 'minimal', 'interactions']
  },
  {
    id: 9,
    name: 'Contact Form Pro',
    creator: 'form-experts',
    price: 14,
    rating: 4.8,
    downloads: 567,
    description: 'Professional contact form with file uploads and captcha',
    category: 'Forms',
    tags: ['forms', 'contact', 'upload', 'captcha']
  },
  {
    id: 10,
    name: 'Sidebar Navigation',
    creator: 'nav-designs',
    price: 19,
    rating: 4.7,
    downloads: 743,
    description: 'Collapsible sidebar with multi-level navigation',
    category: 'Navigation',
    tags: ['navigation', 'sidebar', 'collapsible', 'multi-level']
  },
  {
    id: 11,
    name: 'Chart Dashboard',
    creator: 'chart-pro',
    price: 32,
    rating: 4.9,
    downloads: 389,
    description: 'Interactive charts and graphs for data visualization',
    category: 'Data Display',
    tags: ['charts', 'graphs', 'data', 'visualization']
  },
  {
    id: 12,
    name: 'Loading Spinner Pack',
    creator: 'loading-ui',
    price: 6,
    rating: 4.4,
    downloads: 2134,
    description: 'Collection of animated loading spinners and skeletons',
    category: 'Feedback',
    tags: ['loading', 'spinner', 'skeleton', 'animations']
  },
  {
    id: 13,
    name: 'Grid Layout System',
    creator: 'layout-master',
    price: 25,
    rating: 4.6,
    downloads: 512,
    description: 'Flexible grid system with responsive breakpoints',
    category: 'Layout',
    tags: ['grid', 'layout', 'responsive', 'breakpoints']
  },
  {
    id: 14,
    name: 'E-commerce Template',
    creator: 'ecom-designs',
    price: 89,
    rating: 4.8,
    downloads: 234,
    description: 'Complete e-commerce template with product listings and cart',
    category: 'Templates',
    tags: ['template', 'ecommerce', 'products', 'cart']
  },
  {
    id: 15,
    name: 'Toast Notification System',
    creator: 'notify-pro',
    price: 11,
    rating: 4.7,
    downloads: 876,
    description: 'Customizable toast notifications with multiple variants',
    category: 'Feedback',
    tags: ['toast', 'notifications', 'alerts', 'variants']
  }
]

type SortOption = 'popularity' | 'price-low' | 'price-high' | 'rating' | 'recent'

function Marketplace() {
  const [components] = useState<Component[]>(MOCK_COMPONENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Components')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()
    categoryMap.set('All Components', components.length)
    
    components.forEach(component => {
      const count = categoryMap.get(component.category) || 0
      categoryMap.set(component.category, count + 1)
    })
    
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }))
  }, [components])

  const popularTags = useMemo(() => {
    const tagMap = new Map<string, number>()
    components.forEach(component => {
      component.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    })
    
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([tag]) => tag)
  }, [components])

  const filteredAndSortedComponents = useMemo(() => {
    let filtered = components

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(component => 
        component.name.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query) ||
        component.creator.toLowerCase().includes(query) ||
        component.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    if (selectedCategory !== 'All Components') {
      filtered = filtered.filter(component => component.category === selectedCategory)
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.downloads - a.downloads
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'recent':
          return b.id - a.id
        default:
          return 0
      }
    })

    return sorted
  }, [components, searchQuery, selectedCategory, sortBy])

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag)
    setSelectedCategory('All Components')
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SearchHero 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          popularTags={popularTags}
          onTagClick={handleTagClick}
        />
        <CategoryNav 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <ComponentGrid 
          components={filteredAndSortedComponents}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
        />
      </main>
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary"></div>
            <span className="text-xl font-bold">shopcn</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground font-medium">
              Components
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Blocks
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Sell
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <User className="h-5 w-5" />
            <span className="hidden sm:block">Sign In</span>
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Sell Components
          </button>
        </div>
      </div>
    </header>
  )
}

interface SearchHeroProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  popularTags: string[]
  onTagClick: (tag: string) => void
}

function SearchHero({ searchQuery, onSearchChange, popularTags, onTagClick }: SearchHeroProps) {
  return (
    <section className="py-12 bg-muted/30">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Premium shadcn Components
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse, purchase, and install high-quality UI components with a single command
          </p>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components, templates, or creators..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-muted-foreground">Popular:</span>
          {popularTags.map((tag) => (
            <button 
              key={tag}
              onClick={() => onTagClick(tag)}
              className="text-sm px-3 py-1 bg-muted hover:bg-muted/80 rounded-full transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

interface CategoryNavProps {
  categories: Array<{ name: string; count: number }>
  selectedCategory: string
  onCategoryClick: (category: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

function CategoryNav({ categories, selectedCategory, onCategoryClick, viewMode, onViewModeChange }: CategoryNavProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-6 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategoryClick(category.name)}
                className={`flex items-center space-x-2 whitespace-nowrap py-2 px-3 rounded-lg transition-colors ${
                  category.name === selectedCategory
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs bg-background/20 px-1.5 py-0.5 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <div className="border-l border-border pl-2 flex space-x-1">
              <button 
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ComponentGridProps {
  components: Component[]
  sortBy: SortOption
  onSortChange: (sortBy: SortOption) => void
  viewMode: 'grid' | 'list'
}

function ComponentGrid({ components, sortBy, onSortChange, viewMode }: ComponentGridProps) {
  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'popularity': return 'Sort by Popularity'
      case 'price-low': return 'Sort by Price (Low to High)'
      case 'price-high': return 'Sort by Price (High to Low)'
      case 'rating': return 'Sort by Rating'
      case 'recent': return 'Sort by Recent'
    }
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{components.length} Components</h2>
            <p className="text-sm text-muted-foreground">Showing filtered results</p>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price-low">Sort by Price (Low to High)</option>
            <option value="price-high">Sort by Price (High to Low)</option>
            <option value="rating">Sort by Rating</option>
            <option value="recent">Sort by Recent</option>
          </select>
        </div>
        {components.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No components found matching your criteria</p>
            <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {components.map((component) => (
              <ComponentCard key={component.id} component={component} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

interface ComponentCardProps {
  component: Component
  viewMode: 'grid' | 'list'
}

function ComponentCard({ component, viewMode }: ComponentCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="group bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-200 flex items-center space-x-4">
        <div className="w-24 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="text-2xl text-muted-foreground/20">🎨</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-semibold text-lg leading-tight">{component.name}</h3>
              <p className="text-sm text-muted-foreground">by {component.creator}</p>
            </div>
            <div className="text-right ml-4">
              <div className="text-lg font-bold">${component.price}</div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{component.rating}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
            {component.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {component.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Download className="h-4 w-4" />
                <span>{component.downloads.toLocaleString()}</span>
              </div>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="relative aspect-[3/2] bg-muted flex items-center justify-center">
        <div className="text-6xl text-muted-foreground/20">🎨</div>
        <button className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Eye className="h-6 w-6 text-white" />
        </button>
        {component.featured && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{component.name}</h3>
            <p className="text-sm text-muted-foreground">by {component.creator}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">${component.price}</div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{component.rating}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {component.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {component.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Download className="h-4 w-4" />
            <span>{component.downloads.toLocaleString()}</span>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
            Purchase
          </button>
        </div>
      </div>
    </div>
  )
}