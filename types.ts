
export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  tags: string[];
}

export interface OrderItem {
  mealId: string;
  quantity: number;
  deliveryDate: string;
}

export enum AppRoute {
  HOME = '/',
  MENU = '/menu',
  PHILOSOPHY = '/philosophy',
  CHECKOUT = '/checkout'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
