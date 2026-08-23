import { NannyCard, type Nanny } from '../NannyCard/NannyCard';
import css from './NanniesList.module.css';

interface NanniesListProps {
  nannies: Nanny[];
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

export function NanniesList({
  nannies,
  favorites,
  onToggleFavorite,
  hasMore,
  onLoadMore,
  isLoading,
}: NanniesListProps) {
  if (nannies.length === 0 && !isLoading) {
    return <p className={css.empty}>No nannies found for this filter.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.list}>
        {nannies.map(nanny => (
          <NannyCard
            key={nanny.id}
            nanny={nanny}
            isFavorite={!!favorites[nanny.id]}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {hasMore && (
        <button type="button" onClick={onLoadMore} disabled={isLoading} className={css.loadMoreBtn}>
          {isLoading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
