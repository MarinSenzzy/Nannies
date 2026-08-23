// services/favorites.ts
import { ref, get, set, remove } from 'firebase/database';
import { db } from '../firebase/config';

export const getFavorites = async (userId: string): Promise<Record<string, boolean>> => {
  const favRef = ref(db, `favorites/${userId}`);
  const snapshot = await get(favRef);
  return snapshot.exists() ? snapshot.val() : {};
};

export const toggleFavoriteApi = async (userId: string, nannyId: string, isFav: boolean) => {
  const itemRef = ref(db, `favorites/${userId}/${nannyId}`);
  if (isFav) {
    await remove(itemRef);
  } else {
    await set(itemRef, true);
  }
};
