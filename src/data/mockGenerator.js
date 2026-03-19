import { chefs } from './chefs.js'

const detectCategory = (ingredients) => {
  const joined = ingredients.map(i => i.toLowerCase()).join(' ')
  if (joined.match(/pasta|spaghetti|penne|fettuccine|linguine|noodle/)) return 'pasta'
  if (joined.match(/chicken|breast|thigh|drumstick/)) return 'chicken'
  if (joined.match(/\begg\b|\beggs\b/)) return 'eggs'
  if (joined.match(/\brice\b/)) return 'rice'
  if (joined.match(/potato|potatoes/)) return 'potato'
  if (joined.match(/salmon|fish|tuna|cod|shrimp|prawn/)) return 'fish'
  if (joined.match(/beef|steak|mince|ground beef/)) return 'beef'
  if (joined.match(/tomato|pepper|zucchini|courgette|aubergine|eggplant/)) return 'veggie'
  return 'default'
}

const baseRecipes = {
  pasta: {
    title: 'Garlic & Herb Pasta',
    time: '20 min',
    servings: '2',
    suggestedIngredients: ['pasta', 'garlic', 'olive oil', 'parmesan', 'fresh parsley', 'black pepper', 'sea salt'],
    steps: [
      'Bring a large pot of heavily salted water to a rolling boil.',
      'Cook pasta until al dente — taste it 2 minutes before the package says.',
      'While pasta cooks, heat olive oil in a wide pan over medium heat. Add minced garlic and cook until fragrant and just golden, about 1–2 minutes.',
      'Reserve a full cup of starchy pasta water before draining — this is your secret sauce.',
      'Drain pasta and add directly to the garlic pan over low heat. Toss vigorously, adding pasta water splash by splash until a silky, glossy sauce coats every strand.',
      'Remove from heat. Fold in parmesan generously, add fresh parsley, crack black pepper over the top. Taste and adjust salt.',
    ],
  },
  chicken: {
    title: 'Pan-Seared Chicken with Herbs',
    time: '30 min',
    servings: '2',
    suggestedIngredients: ['chicken breasts', 'garlic cloves', 'olive oil', 'rosemary', 'thyme', 'lemon', 'sea salt', 'cracked pepper'],
    steps: [
      'Pat chicken completely dry with paper towels — moisture is the enemy of a golden crust. Season generously on all sides with salt and pepper.',
      'Heat olive oil in a cast iron or heavy-bottomed pan over high heat until it just begins to smoke.',
      'Lay chicken in — do not move it. Press gently to ensure full contact. Sear for 4–5 minutes undisturbed.',
      'Flip. Add smashed garlic cloves and herb sprigs to the pan. They will sizzle and perfume the whole kitchen.',
      'Baste the chicken repeatedly with the fragrant pan juices. Cook another 4–5 minutes until internal temp reaches 74°C (165°F).',
      'Squeeze lemon over the chicken. Rest for 5 full minutes before slicing — this keeps every drop of juice inside.',
    ],
  },
  eggs: {
    title: 'Perfect Soft Scrambled Eggs',
    time: '10 min',
    servings: '1–2',
    suggestedIngredients: ['eggs', 'unsalted butter', 'sea salt', 'cracked pepper', 'fresh chives', 'sourdough toast'],
    steps: [
      'Crack eggs directly into a cold non-stick pan — do not pre-whisk.',
      'Add a generous knob of butter and place over the lowest heat possible.',
      'Using a silicone spatula, slowly fold the eggs in large, lazy strokes as the butter melts and eggs begin to set around the edges.',
      'This is slow cooking — 5 to 7 minutes. Do not rush. The residual heat will finish them.',
      'Remove from heat while they still look slightly underdone and glossy. They will set perfectly in 30 seconds on the plate.',
      'Season with sea salt and pepper immediately. Top with fresh chives. Serve on warm toast.',
    ],
  },
  rice: {
    title: 'Fragrant Golden Rice Bowl',
    time: '30 min',
    servings: '2',
    suggestedIngredients: ['basmati rice', 'onion', 'garlic', 'olive oil', 'vegetable broth', 'turmeric', 'bay leaf', 'fresh herbs'],
    steps: [
      'Rinse rice under cold water until the water runs completely clear — removes excess starch for fluffy, separate grains.',
      'Heat olive oil in a saucepan over medium heat. Add diced onion and cook until soft and translucent, about 5 minutes.',
      'Add minced garlic and a pinch of turmeric. Stir for 60 seconds — it should smell incredible.',
      'Add rice and toast for 2 minutes, stirring constantly. Every grain should be coated in oil.',
      'Pour in broth (2:1 ratio to rice). Add bay leaf. Bring to a boil, then immediately reduce to the lowest possible simmer. Cover tightly.',
      'Cook 15 minutes. Remove from heat. Rest covered for 5 more minutes — do not lift the lid. Fluff with a fork and fold in fresh herbs.',
    ],
  },
  potato: {
    title: 'Crispy Golden Smashed Potatoes',
    time: '45 min',
    servings: '2–3',
    suggestedIngredients: ['small potatoes', 'olive oil', 'garlic', 'rosemary', 'sea salt', 'cracked pepper', 'parmesan'],
    steps: [
      'Boil whole small potatoes in heavily salted water for 20 minutes until completely tender when pierced.',
      'Preheat oven to 230°C (450°F). Drain potatoes and let steam dry on a baking tray for 5 minutes.',
      'Using the bottom of a glass or your palm, smash each potato flat — aim for about 1cm thick.',
      'Drizzle generously with olive oil. Season with salt, pepper, and scatter rosemary over the top.',
      'Roast for 20–25 minutes until deeply golden and shatteringly crispy on the edges.',
      'Remove from oven. Rub each one immediately with a cut garlic clove. Shower with parmesan. Serve straight from the tray.',
    ],
  },
  fish: {
    title: 'Pan-Seared Salmon with Lemon Butter',
    time: '15 min',
    servings: '2',
    suggestedIngredients: ['salmon fillets', 'olive oil', 'unsalted butter', 'garlic', 'lemon', 'capers', 'dill', 'sea salt'],
    steps: [
      'Pat salmon fillets completely dry. Score the skin lightly three times to prevent curling. Season generously with salt.',
      'Heat olive oil in a heavy pan over high heat until it shimmers and just starts to smoke.',
      'Place salmon skin-side down. Press gently with a spatula for 30 seconds to keep full skin contact. Cook 4 minutes without touching.',
      'Flip. The skin should be deep golden and crisp. Reduce heat to medium.',
      'Add butter, garlic, and capers. As butter foams and turns golden, tilt the pan and baste the salmon continuously for 2 minutes.',
      'Rest 2 minutes off heat. Serve with a squeeze of fresh lemon and torn dill over the top.',
    ],
  },
  beef: {
    title: 'Seared Beef with Pan Sauce',
    time: '25 min',
    servings: '2',
    suggestedIngredients: ['beef steaks', 'olive oil', 'butter', 'garlic', 'rosemary', 'sea salt', 'cracked pepper'],
    steps: [
      'Bring beef to room temperature 30 minutes before cooking — cold beef steams instead of searing. Season heavily with salt and pepper.',
      'Heat a cast iron pan until it is smoking. Add a thin coat of oil.',
      'Lay beef in — you need to hear a fierce sizzle. Do not touch it for 2–3 minutes depending on thickness.',
      'Flip once. Add butter, garlic, and rosemary to the pan.',
      'Baste continuously as butter foams. Cook to your preferred doneness: 1 min more for rare, 2 for medium-rare.',
      'Rest on a warm plate, loosely tented with foil, for half the cooking time. Slice against the grain. Drizzle with pan juices.',
    ],
  },
  veggie: {
    title: 'Roasted Vegetable Medley',
    time: '35 min',
    servings: '2',
    suggestedIngredients: ['mixed vegetables', 'olive oil', 'garlic', 'red onion', 'cherry tomatoes', 'balsamic vinegar', 'fresh basil', 'sea salt'],
    steps: [
      'Preheat oven to 220°C (425°F). Chop all vegetables into similar-sized pieces for even cooking.',
      'Toss generously with olive oil, salt, and pepper. Do not be shy — every piece needs coating.',
      'Spread in a single layer across one or two baking trays. Overcrowding causes steaming, not roasting.',
      'Roast 20 minutes. Add sliced garlic and cherry tomatoes. Return for another 10 minutes.',
      'Drizzle with balsamic vinegar in the last 5 minutes — it will caramelize beautifully.',
      'Transfer to a serving plate. Scatter fresh basil leaves. Taste and finish with a pinch of flaky salt.',
    ],
  },
  default: {
    title: "Chef's Pantry Special",
    time: '25 min',
    servings: '2',
    suggestedIngredients: ['olive oil', 'garlic', 'onion', 'sea salt', 'cracked pepper', 'lemon', 'fresh herbs'],
    steps: [
      'Inventory your ingredients and sort by cooking time — things that take longest go in first.',
      'Heat olive oil in a wide pan. Build a flavour base with aromatics: onion and garlic over medium heat until soft.',
      'Add your heartiest ingredients first. Season every layer — a pinch of salt at each stage builds real depth.',
      'Add softer ingredients toward the end to prevent overcooking.',
      'Finish with acid — a squeeze of lemon or a splash of vinegar lifts and brightens the whole dish.',
      'Taste. Adjust salt, acid, and heat. Plate intentionally — height and garnish matter more than you think.',
    ],
  },
}

const chefVoice = {
  fiery: {
    getIntro: (title) =>
      `Listen up. We're making ${title} and it better be PERFECT. I've seen home cooks ruin dishes like this and frankly it's embarrassing. Every step I give you matters. Do. Not. Skip.`,
    stepComments: [
      "Don't you DARE rush this step.",
      'This is where amateurs fail. You are not an amateur. Prove it.',
      'Season it properly. Bland food is an insult to the ingredients.',
      "If the pan isn't screaming hot, start over.",
      'Eyes on the pan. EYES. ON. THE. PAN.',
      "YES. That's what I'm talking about. Keep going.",
    ],
    outro:
      "That's how you cook with RESPECT for your ingredients. Now taste it. If it's anything less than exceptional, you missed something. Be honest with yourself and do better next time. 🔥",
  },
  nonna: {
    getIntro: (title) =>
      `Ah, caro mio! Come, sit. Let me show you how to make ${title} the way my mother taught me, and her mother before her. You know the secret? Love. Always love. And never — never — skip the olive oil.`,
    stepComments: [
      'In Italy, we never hurry. The food, it knows when it is ready.',
      'My grandmother always said — season with love and even simple food sings.',
      'Mamma mia, smell that! This is what real cooking smells like.',
      "Don't be afraid! The kitchen is a place of joy, not fear.",
      'Take your time. This is not a race. Enjoy the process.',
      "Brava! You're doing beautifully, just like a real Italian.",
    ],
    outro:
      "Magnifico! Now call everyone to the table immediately. Food this good cannot wait. Mangia, mangia! And remember — the best ingredient is always the company you share it with. Cin cin! 🍷",
  },
  gymbro: {
    getIntro: (title) =>
      `YO BRO! We are making ${title} and this meal is going to ABSOLUTELY SHRED your macros. I pre-ran the numbers and honestly? The protein content is INSANE. Let's GET IT. No cap — this is a game changer for your gains.`,
    stepComments: [
      'BRO the technique here is KEY for nutrient preservation. Science.',
      'High heat = Maillard reaction = superior amino acid availability. Look it up.',
      'Stay hydrated while this cooks. Water is an anabolic trigger. Drink it now.',
      'This step is non-negotiable. It is literally where the GAINS happen.',
      "LETS GOOO that looks absolutely DIALED IN bro.",
      "I'm not even kidding, the smell alone is going to spike your testosterone.",
    ],
    outro:
      "YOOO you absolute UNIT! That meal is going to hit completely different post-workout. Remember: calories are king, protein is queen, and today you cooked like an absolute CHAMPION. Hit the gym. Eat this. Repeat. LFG! 💪",
  },
  vegan: {
    getIntro: (title) =>
      `Take a breath. Ground yourself in this moment. Today we are creating ${title} — a dish that honours the earth and everything she has given us. Each ingredient carries its own energy. Let's be intentional about how we bring them together.`,
    stepComments: [
      'Notice the colour, the texture. This is pure, living food.',
      'Breathe in the aroma. Cooking is a form of mindfulness.',
      'Slow down here. The food responds to the energy you bring to it.',
      'Every plant-based ingredient is a gift from the earth. Treat it with care.',
      'Feel the warmth, the transformation. This is alchemy.',
      'Beautiful. You are completely in flow right now.',
    ],
    outro:
      "Namaste. You have created something that nourishes not just your body, but your connection to the planet. Take a moment to appreciate this meal — the farmers, the earth, the sunlight that grew it. Eat slowly. Savour every bite. You deserve this. 🌿",
  },
}

export function generateRecipe(ingredients, chefId) {
  const category = detectCategory(ingredients)
  const base = baseRecipes[category]
  const voice = chefVoice[chefId]
  const chef = chefs.find(c => c.id === chefId)

  // Merge user ingredients with suggested ones, keeping user ingredients first
  const userLower = ingredients.map(i => i.toLowerCase())
  const extraSuggestions = base.suggestedIngredients.filter(
    s => !userLower.some(u => s.toLowerCase().includes(u) || u.includes(s.toLowerCase()))
  )
  const allIngredients = [...ingredients, ...extraSuggestions]

  const steps = base.steps.map((instruction, i) => ({
    instruction,
    comment: i % 2 === 1 ? voice.stepComments[i % voice.stepComments.length] : null,
  }))

  return {
    title: base.title,
    intro: voice.getIntro(base.title),
    time: base.time,
    servings: base.servings,
    ingredients: allIngredients,
    steps,
    outro: voice.outro,
    chef,
  }
}
