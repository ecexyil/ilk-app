import { useState } from 'react'
import './App.css'
import WelcomeScreen   from './components/WelcomeScreen'
import IngredientsScreen from './components/IngredientsScreen'
import ChefSelectScreen  from './components/ChefSelectScreen'
import LoadingScreen    from './components/LoadingScreen'
import RecipeScreen     from './components/RecipeScreen'
import SearchScreen     from './components/SearchScreen'
import CookbookScreen   from './components/CookbookScreen'
import ProfileScreen    from './components/ProfileScreen'
import BottomNav        from './components/BottomNav'
import { generateRecipe } from './data/mockGenerator'

export default function App() {
  const [screen,       setScreen]       = useState('welcome')
  const [activeTab,    setActiveTab]    = useState('home')
  const [ingredients,  setIngredients]  = useState([])
  const [photo,        setPhoto]        = useState(null)
  const [selectedChef, setSelectedChef] = useState(null)
  const [recipe,       setRecipe]       = useState(null)
  const [savedRecipes, setSavedRecipes] = useState([])

  /* ── ingredient helpers ── */
  const addIngredient    = (ing) => setIngredients(prev => [...prev, ing])
  const removeIngredient = (ing) => setIngredients(prev => prev.filter(i => i !== ing))

  /* ── open the scan/cook flow ── */
  const openScanFlow = () => {
    setIngredients([])
    setPhoto(null)
    setSelectedChef(null)
    setRecipe(null)
    setScreen('ingredients')
  }

  /* ── generation ── */
  const startGeneration = (chef) => {
    const activeChef = chef || selectedChef
    setScreen('loading')
    setTimeout(() => {
      setRecipe(generateRecipe(ingredients, activeChef.id))
      setScreen('recipe')
    }, 2400)
  }

  const handleRegenerate = () => {
    setScreen('loading')
    setTimeout(() => {
      setRecipe(generateRecipe(ingredients, selectedChef.id))
      setScreen('recipe')
    }, 2000)
  }

  /* ── save toggle ── */
  const handleSave = () => {
    if (!recipe) return
    setSavedRecipes(prev => {
      const exists = prev.some(r => r.title === recipe.title && r.chef?.id === recipe.chef?.id)
      return exists
        ? prev.filter(r => !(r.title === recipe.title && r.chef?.id === recipe.chef?.id))
        : [recipe, ...prev]
    })
  }

  /* ── navigation ── */
  const handleStartOver = () => {
    setIngredients([])
    setPhoto(null)
    setSelectedChef(null)
    setRecipe(null)
    setActiveTab('home')
    setScreen('welcome')
  }

  /* ── home screen shortcuts ── */
  const handleIngredientQuickStart = (preIngredients) => {
    setIngredients(preIngredients)
    setSelectedChef(null)
    setScreen('chefs')
  }

  const handleChefQuickPick = (chef) => {
    setSelectedChef(chef)
    setIngredients([])
    setScreen('ingredients')
  }

  const handleViewSaved = (savedRecipe) => {
    setRecipe(savedRecipe)
    setSelectedChef(savedRecipe.chef)
    setScreen('recipe')
  }

  const isSaved =
    recipe != null &&
    savedRecipes.some(r => r.title === recipe.title && r.chef?.id === recipe.chef?.id)

  const isInFlow = screen !== 'welcome'

  return (
    <div className="app">

      {/* ── TAB VIEWS (visible when not in a flow) ── */}
      {!isInFlow && (
        <div className="app-tabs">
          {activeTab === 'home' && (
            <WelcomeScreen
              onStart={openScanFlow}
              onIngredientQuickStart={handleIngredientQuickStart}
              onChefQuickPick={handleChefQuickPick}
              onViewSaved={handleViewSaved}
              savedRecipes={savedRecipes}
            />
          )}
          {activeTab === 'search' && (
            <SearchScreen onQuickStart={handleIngredientQuickStart} />
          )}
          {activeTab === 'cookbook' && (
            <CookbookScreen
              savedRecipes={savedRecipes}
              onViewRecipe={handleViewSaved}
            />
          )}
          {activeTab === 'profile' && (
            <ProfileScreen savedCount={savedRecipes.length} />
          )}
        </div>
      )}

      {/* ── FLOW SCREENS (full-screen, no nav) ── */}
      {screen === 'ingredients' && (
        <IngredientsScreen
          ingredients={ingredients}
          onAddIngredient={addIngredient}
          onRemoveIngredient={removeIngredient}
          onPhotoUpload={setPhoto}
          photo={photo}
          onContinue={() => setScreen('chefs')}
          onBack={handleStartOver}
        />
      )}
      {screen === 'chefs' && (
        <ChefSelectScreen
          selectedChef={selectedChef}
          onSelectChef={setSelectedChef}
          onContinue={() => selectedChef && startGeneration(selectedChef)}
          onBack={() => setScreen('ingredients')}
        />
      )}
      {screen === 'loading' && selectedChef && (
        <LoadingScreen chef={selectedChef} />
      )}
      {screen === 'recipe' && recipe && (
        <RecipeScreen
          recipe={recipe}
          onRegenerate={handleRegenerate}
          onChangeChef={() => setScreen('chefs')}
          onStartOver={handleStartOver}
          onSave={handleSave}
          isSaved={isSaved}
        />
      )}

      {/* ── BOTTOM NAV (hidden during flow) ── */}
      {!isInFlow && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onFabPress={openScanFlow}
          savedCount={savedRecipes.length}
        />
      )}

    </div>
  )
}
