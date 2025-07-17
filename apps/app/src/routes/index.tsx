import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Star, Download, Eye, ShoppingCart, User, Grid, List, TrendingUp, Zap, Crown } from 'lucide-react'
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
  trending?: boolean
  new?: boolean
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
    featured: true,
    trending: true
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
    tags: ['template', 'dashboard', 'charts', 'analytics'],
    new: true
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
    tags: ['navigation', 'menu', 'responsive', 'dropdown'],
    trending: true
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
    tags: ['forms', 'contact', 'upload', 'captcha'],
    new: true
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
    tags: ['loading', 'spinner', 'skeleton', 'animations'],
    trending: true
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
    tags: ['template', 'ecommerce', 'products', 'cart'],
    featured: true
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
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-xl bg-primary shadow-lg shadow-primary/25"></div>
              <div className="absolute inset-0 h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-primary/80 opacity-90"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">shopcn</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="relative text-foreground font-medium group">
              Components
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></div>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
              Templates
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
              Blocks
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
              Sell
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-muted/60 rounded-xl transition-all duration-300 hover:scale-110 group">
            <ShoppingCart className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              2
            </div>
          </button>
          <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
            <User className="h-5 w-5" />
            <span className="hidden sm:block">Sign In</span>
          </button>
          <button className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative font-medium">Sell Components</span>
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
    <section className="relative py-16 bg-gradient-to-br from-muted/40 via-muted/20 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
            Discover Premium
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              shadcn Components
            </span>
          </h1>
          <p className="text-xl text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto">
            Browse, purchase, and install high-quality UI components with a single command.
            Transform your projects with professional-grade components.
          </p>
        </div>
        
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-1 shadow-2xl">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
              <input
                type="text"
                placeholder="Search components, templates, or creators..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-transparent border-0 rounded-2xl focus:outline-none text-lg placeholder:text-muted-foreground/60"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="text-sm text-muted-foreground/80 flex items-center">
            <Zap className="h-4 w-4 mr-1" />
            Popular:
          </span>
          {popularTags.map((tag) => (
            <button 
              key={tag}
              onClick={() => onTagClick(tag)}
              className="relative text-sm px-4 py-2 bg-muted/60 hover:bg-muted/80 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/30 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative">{tag}</span>
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
    <section className="sticky top-16 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategoryClick(category.name)}
                className={`relative flex items-center space-x-2 whitespace-nowrap py-2 px-3 rounded-lg transition-all duration-300 group overflow-hidden ${
                  category.name === selectedCategory
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 hover:scale-105'
                }`}
              >
                {category.name === selectedCategory && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative font-medium">{category.name}</span>
                <span className={`relative text-xs px-2 py-1 rounded-full font-medium ${
                  category.name === selectedCategory 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-muted/80 text-muted-foreground'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2.5 hover:bg-muted/60 rounded-xl transition-all duration-300 hover:scale-110">
              <Filter className="h-4 w-4" />
            </button>
            <div className="border-l border-border/50 pl-3 flex space-x-1">
              <button 
                onClick={() => onViewModeChange('grid')}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  viewMode === 'grid' ? 'bg-muted text-foreground' : 'hover:bg-muted/60'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => onViewModeChange('list')}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  viewMode === 'list' ? 'bg-muted text-foreground' : 'hover:bg-muted/60'
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
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{components.length} Components</h2>
            <p className="text-sm text-muted-foreground mt-1">Discover the perfect components for your project</p>
          </div>
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none px-4 py-3 bg-background border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="price-low">Sort by Price (Low to High)</option>
              <option value="price-high">Sort by Price (High to Low)</option>
              <option value="rating">Sort by Rating</option>
              <option value="recent">Sort by Recent</option>
            </select>
          </div>
        </div>
        {components.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Search className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground text-xl font-medium mb-2">No components found</p>
            <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
          }>
            {components.map((component, index) => (
              <ComponentCard 
                key={component.id} 
                component={component} 
                viewMode={viewMode}
                index={index}
              />
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
  index: number
}

function ComponentCard({ component, viewMode, index }: ComponentCardProps) {
  if (viewMode === 'list') {
    return (
      <div 
        className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/20 flex items-center space-x-6"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative w-24 h-20 bg-gradient-to-br from-muted/60 to-muted/40 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="text-3xl opacity-40">🎨</div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors duration-300">{component.name}</h3>
                {component.featured && (
                  <Crown className="h-4 w-4 text-amber-500" />
                )}
                {component.trending && (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                )}
                {component.new && (
                  <Zap className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">by {component.creator}</p>
            </div>
            <div className="text-right ml-6">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${component.price}</div>
              <div className="flex items-center space-x-1 text-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{component.rating}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/90 mb-4 line-clamp-1">
            {component.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {component.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 bg-muted/60 rounded-full font-medium border border-border/30">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Download className="h-4 w-4" />
                <span className="font-medium">{component.downloads.toLocaleString()}</span>
              </div>
              <button className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group font-medium">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative">Purchase</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/20"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[3/2] bg-gradient-to-br from-muted/60 to-muted/30 flex items-center justify-center overflow-hidden">
        <div className="text-6xl opacity-30">🎨</div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <button className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Eye className="h-6 w-6 text-white" />
          </div>
        </button>
        <div className="absolute top-4 left-4 flex gap-2">
          {component.featured && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg">
              <Crown className="h-3 w-3" />
              Featured
            </div>
          )}
          {component.trending && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg">
              <TrendingUp className="h-3 w-3" />
              Trending
            </div>
          )}
          {component.new && (
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg">
              <Zap className="h-3 w-3" />
              New
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors duration-300">{component.name}</h3>
            <p className="text-sm text-muted-foreground">by {component.creator}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${component.price}</div>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{component.rating}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/90 mb-4 line-clamp-2 leading-relaxed">
          {component.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {component.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 bg-muted/60 rounded-full font-medium border border-border/30 hover:bg-muted transition-colors duration-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Download className="h-4 w-4" />
            <span className="font-medium">{component.downloads.toLocaleString()}</span>
          </div>
          <button className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group font-medium">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative">Purchase</span>
          </button>
        </div>
      </div>
    </div>
  )
}