import { useState, useEffect, useMemo } from 'react';
import Select, { type SingleValue } from 'react-select';
import css from './Favorites.module.css'; // Создайте аналогичный файл стилей
import { useAuth } from '../../../hooks/useAuth';
import type { Nanny } from '../../NannyCard/NannyCard';
import { NanniesList } from '../../NanniesList/NanniesList';
import { getFavorites, toggleFavoriteApi } from '../../../services/favorites';
import { ref, get } from 'firebase/database';
import { db } from '../../../firebase/config';
import { customStyles, type FilterOption } from '../Nannies/SortSelect.styles'; // Проверьте путь к вашим стилям селекта

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'a-z', label: 'A to Z' },
  { value: 'z-a', label: 'Z to A' },
  { value: 'less-10', label: 'Less than 10$' },
  { value: 'greater-10', label: 'Greater than 10$' },
  { value: 'popular', label: 'Popular' },
  { value: 'not-popular', label: 'Not popular' },
  { value: 'all', label: 'Show all' },
];

function Favorites() {
  const { user } = useAuth();
  const [favoriteNannies, setFavoriteNannies] = useState<Nanny[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(FILTER_OPTIONS[0]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // 1. Получаем ID всех избранных нянь пользователя
        const userFavs = await getFavorites(user.uid);
        setFavorites(userFavs);

        // Фильтруем только те ключи, у которых значение true
        const favIds = Object.keys(userFavs).filter(key => userFavs[key]);

        if (favIds.length === 0) {
          setFavoriteNannies([]);
          return;
        }

        // 2. Получаем полный список нянь из базы и оставляем только избранных
        const snapshot = await get(ref(db, 'nannies'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const allList = Object.keys(data).map(key => ({ id: key, ...data[key] })) as Nanny[];

          const filteredFavs = allList.filter(nanny => favIds.includes(nanny.id));
          setFavoriteNannies(filteredFavs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritesData();
  }, [user]);

  // Логика сортировки и фильтрации внутри избранного
  const filteredNannies = useMemo(() => {
    let result = [...favoriteNannies];

    switch (selectedFilter.value) {
      case 'a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'less-10':
        result = result.filter(n => n.price_per_hour < 10);
        break;
      case 'greater-10':
        result = result.filter(n => n.price_per_hour >= 10);
        break;
      case 'popular':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'not-popular':
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return result;
  }, [favoriteNannies, selectedFilter]);

  const handleToggleFavorite = async (nannyId: string) => {
    if (!user) return;

    // На странице Favorites клик по сердечку всегда удаляет карточку
    setFavorites(prev => {
      const updated = { ...prev };
      delete updated[nannyId]; // Полностью удаляем ключ из объекта избранного
      return updated;
    });

    // Мгновенно убираем няню из локального списка на экране, чтобы интерфейс реагировал без задержек
    setFavoriteNannies(prev => prev.filter(nanny => nanny.id !== nannyId));

    // Отправляем запрос на удаление в Firebase API
    await toggleFavoriteApi(user.uid, nannyId, true);
  };

  const visibleNannies = filteredNannies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNannies.length;

  // Если пользователь не авторизован
  if (!user && !isLoading) {
    return (
      <div className="container">
        <p className={css.empty}>Please log in to view your favorite nannies.</p>
      </div>
    );
  }

  return (
    <section className={css.favorites}>
      <div className="container">
        {/* Показываем фильтр, только если у пользователя вообще есть избранные няни */}
        {favoriteNannies.length > 0 && (
          <div className={css.filters}>
            <h2 className={css.filtTitle}>Filters</h2>
            <div className={css.filtSelect}>
              <Select
                options={FILTER_OPTIONS}
                value={selectedFilter}
                styles={customStyles}
                onChange={(opt: SingleValue<FilterOption>) => {
                  if (opt) {
                    setSelectedFilter(opt);
                    setVisibleCount(3); // Сбрасываем пагинацию при изменении фильтра
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Если загрузка завершена и избранных нет, показываем заглушку */}
        {!isLoading && favoriteNannies.length === 0 ? (
          <p className={css.empty}>You haven't added any nannies to your favorites yet.</p>
        ) : (
          <NanniesList
            nannies={visibleNannies}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            hasMore={hasMore}
            onLoadMore={() => setVisibleCount(prev => prev + 3)}
            isLoading={isLoading}
          />
        )}
      </div>
    </section>
  );
}

export default Favorites;
