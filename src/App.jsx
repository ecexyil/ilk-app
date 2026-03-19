import { useState } from 'react'
import './App.css'
import WelcomeScreen from './components/WelcomeScreen'
import IngredientsScreen from './components/IngredientsScreen'
import ChefSelectScreen from './components/ChefSelectScreen'
import LoadingScreen from './components/LoadingScreen'
import RecipeScreen from './components/RecipeScreen'
import { generateRecipe } from './data/mockGenerator'

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [ingredients, setIngredients] = useState([])
  const [photo, setPhoto] = useState(null)
  const [selectedChef, setSelectedChef] = useState(null)
  const [recipe, setRecipe] = useState(null)
  const [savedRecipes, setSavedRecipes] = useState([])

  const addIngredient = (ing) => setIngredients(prev => [...prev, ing])
  const removeIngredient = (ing) => setIngredients(prev => prev.filter(i => i !== ing))

  const startGeneration = (chef) => {
    const activeChef = chef || selectedChef
    setScreen('loading')
    setTimeout(() => {
      const result = generateRecipe(ingredients, activeChef.id)
      setRecipe(result)
      setScreen('recipe')
    }, 2400)
  }

  const handleContinueFromChefs = () => {
    if (selectedChef) startGeneration(selectedChef)
  }

  const handleRegenerate = () => {
    setScreen('loading')
    setTimeout(() => {
      const result = generateRecipe(ingredients, selectedChef.id)
      setRecipe(result)
      setScreen('recipe')
    }, 2000)
  }

  const handleSave = () => {
    if (!recipe) return
    setSavedRecipes(prev => {
      const exists = prev.some(r => r.title === recipe.title && r.chef?.id === recipe.chef?.id)
      return exists
        ? prev.filter(r => !(r.title === recipe.title && r.chef?.id === recipe.chef?.id))
        : [recipe, ...prev]
    })
  }

  const handleStartOver = () => {
    setIngredients([])
    setPhoto(null)
    setSelectedChef(null)
    setRecipe(null)
    setScreen('welcome')
  }

  const isSaved =
    recipe != null &&
    savedRecipes.some(r => r.title === recipe.title && r.chef?.id === recipe.chef?.id)

  return (
    <div className="app">
      {screen === 'welcome' && (
        <WelcomeScreen onStart={() => setScreen('ingredients')} />
      )}

      {screen === 'ingredients' && (
        <IngredientsScreen
          ingredients={ingredients}
          onAddIngredient={addIngredient}
          onRemoveIngredient={removeIngredient}
          onPhotoUpload={setPhoto}
          photo={photo}
          onContinue={() => setScreen('chefs')}
          onBack={() => setScreen('welcome')}
        />
      )}

      {screen === 'chefs' && (
        <ChefSelectScreen
          selectedChef={selectedChef}
          onSelectChef={setSelectedChef}
          onContinue={handleContinueFromChefs}
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
    </div>
  )
}
