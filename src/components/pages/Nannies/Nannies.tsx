import { useState, useEffect, useMemo } from 'react';
import Select, { type SingleValue } from 'react-select';
import css from './Nannies.module.css';
import { useAuth } from '../../../hooks/useAuth';
import type { Nanny } from '../../NannyCard/NannyCard';
import { NanniesList } from '../../NanniesList/NanniesList';
import { getFavorites, toggleFavoriteApi } from '../../../services/favorites';
import {
  ref,
  // query,
  // orderByKey,
  // orderByChild,
  // limitToFirst,
  // startAfter,
  get,
} from 'firebase/database';
import { db } from '../../../firebase/config';
import { customStyles, type FilterOption } from './SortSelect.styles';
import { AuthWarning } from '../../AuthWarning/AuthWarning';
import { LoginModal } from '../../AuthForm/LoginForm';

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'a-z', label: 'A to Z' },
  { value: 'z-a', label: 'Z to A' },
  { value: 'less-10', label: 'Less than 10$' },
  { value: 'greater-10', label: 'Greater than 10$' },
  { value: 'popular', label: 'Popular' },
  { value: 'not-popular', label: 'Not popular' },
  { value: 'all', label: 'Show all' },
];
function Nannies() {
  const { user } = useAuth();
  const [allNannies, setAllNannies] = useState<Nanny[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const [isAuthWarningOpen, setIsAuthWarningOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, 'nannies'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const list = Object.keys(data).map(key => ({ id: key, ...data[key] })) as Nanny[];
          setAllNannies(list);
        }
        if (user) {
          const userFavs = await getFavorites(user.uid);
          setFavorites(userFavs);
        }
      } catch (err) {
        // console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredNannies = useMemo(() => {
    let result = [...allNannies];

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
  }, [allNannies, selectedFilter]);

  const handleToggleFavorite = async (nannyId: string) => {
    if (!user) {
      setIsAuthWarningOpen(true);
      return;
    }
    const isFav = !!favorites[nannyId];
    setFavorites(prev => ({ ...prev, [nannyId]: !isFav }));
    await toggleFavoriteApi(user.uid, nannyId, isFav);
  };

  const visibleNannies = filteredNannies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNannies.length;
  return (
    <>
      <section className={css.nannies}>
        <div className="container">
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
                    setVisibleCount(3);
                  }
                }}
              />
            </div>
          </div>
          <NanniesList
            nannies={visibleNannies}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            hasMore={hasMore}
            onLoadMore={() => setVisibleCount(prev => prev + 3)}
            isLoading={isLoading}
          />
        </div>
      </section>
      <AuthWarning
        isOpen={isAuthWarningOpen}
        onClose={() => setIsAuthWarningOpen(false)}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

export default Nannies;
