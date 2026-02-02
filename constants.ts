
import { Meal } from './types';

export const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Pikes Peak Protein Bowl',
    description: 'Local grass-fed bison, tri-color quinoa, roasted root vegetables, and a chimichurri drizzle.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    protein: 42,
    carbs: 35,
    fats: 14,
    calories: 450,
    category: 'dinner',
    tags: ['High Protein', 'Gluten-Free']
  },
  {
    id: '2',
    name: 'Garden of the Gods Harvest',
    description: 'Roasted butternut squash, organic kale, toasted pepitas, and ginger-glazed chickpeas.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    protein: 18,
    carbs: 52,
    fats: 12,
    calories: 380,
    category: 'lunch',
    tags: ['Vegan', 'Fiber-Rich']
  },
  {
    id: '3',
    name: 'Manitou Muscle Mash',
    description: 'Grilled lemon-herb chicken breast with smashed sweet potatoes and garlicky green beans.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600',
    protein: 38,
    carbs: 28,
    fats: 9,
    calories: 360,
    category: 'dinner',
    tags: ['Lean', 'Low Carb']
  },
  {
    id: '4',
    name: 'Front Range Power Frittata',
    description: 'Pasture-raised eggs, local goat cheese, baby spinach, and sun-dried tomatoes.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    protein: 24,
    carbs: 8,
    fats: 18,
    calories: 310,
    category: 'breakfast',
    tags: ['Keto-Friendly', 'Vegetarian']
  },
  {
    id: '5',
    name: 'Broadmoor Salmon Sensation',
    description: 'Wild-caught salmon with asparagus spears and a zesty lemon-dill cauliflower rice.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    protein: 32,
    carbs: 12,
    fats: 22,
    calories: 410,
    category: 'dinner',
    tags: ['Omega-3', 'Low Carb']
  },
  {
    id: '6',
    name: 'Cheyenne Mountain Turkey Chili',
    description: 'Hearty turkey and bean chili simmered with Colorado-grown peppers and spices.',
    image: 'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?auto=format&fit=crop&q=80&w=600',
    protein: 30,
    carbs: 38,
    fats: 7,
    calories: 345,
    category: 'lunch',
    tags: ['High Protein', 'Hearty']
  }
];

export const SYSTEM_INSTRUCTION = `You are the Farm-To-Fit Assistant, a friendly and motivating nutrition expert for a meal delivery service in Colorado Springs. 
You help users with:
1. Recommending meals based on fitness goals (Weight Loss, Muscle Gain, Performance).
2. Explaining ingredients and sourcing (we use local CO farms).
3. Assisting with delivery windows and ordering.
The current menu includes items like Pikes Peak Protein Bowl, Garden of the Gods Harvest, and Manitou Muscle Mash.
Always maintain a natural, encouraging tone. If a user asks to "order", guide them to the checkout page or confirm their choices for a verbal order.`;
