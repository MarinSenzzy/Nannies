import { useState } from 'react';
import css from './NannyCard.module.css';
import img from '../../assets/icons.svg';
import { calculateAge } from '../../utils/calculateAge';
export interface Nanny {
  id: string;
  name: string;
  avatar_url: string;
  location: string;
  rating: number;
  price_per_hour: number;
  birthday: string;
  experience: string;
  kids_age: string;
  characters: string[];
  education: string;
  about: string;
  reviews?: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
}

interface NannyCardProps {
  nanny: Nanny;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function NannyCard({ nanny, isFavorite, onToggleFavorite }: NannyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={css.card}>
      <div className={css.avatarWrapper}>
        <img src={nanny.avatar_url} alt={nanny.name} className={css.avatar} />
        <span className={css.onlineBadge} />
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <div>
            <p className={css.subtitle}>Nanny</p>
            <h3 className={css.name}>{nanny.name}</h3>
          </div>

          <ul className={css.meta}>
            <li>
              <svg
                width={16}
                height={16}
                className={css.icon}
                style={{
                  stroke: '#000',
                  fill: 'transparent',
                }}
              >
                <use href={`${img}#icon-map-pin`} />
              </svg>
              {nanny.location}
            </li>
            <li>
              <svg width={16} height={16} className={css.icon}>
                <use href={`${img}#icon-star`} />
              </svg>
              Rating: {nanny.rating}
            </li>
            <li>
              Price / 1 hour: <strong className={css.price}>{nanny.price_per_hour}$</strong>
            </li>
            <button
              type="button"
              className={css.heartBtn}
              onClick={() => onToggleFavorite(nanny.id)}
            >
              {isFavorite ? (
                <svg width={26} height={24} className={css.icon}>
                  <use href={`${img}#icon-heart-h`} />
                </svg>
              ) : (
                <svg
                  width={26}
                  height={24}
                  className={css.icon}
                  style={{
                    stroke: '#000',
                    fill: 'transparent',
                  }}
                >
                  <use href={`${img}#icon-heart-n`} />
                </svg>
              )}
            </button>
          </ul>
        </div>

        <ul className={css.tags}>
          <li className={css.tagItem}>
            <p>
              <span className={css.tagTittle}>Age: </span>
              <span style={{ textDecoration: 'underline' }}>{calculateAge(nanny.birthday)}</span>
            </p>
          </li>
          <li className={css.tagItem}>
            <p>
              <span className={css.tagTittle}>Experience:</span> {nanny.experience}
            </p>
          </li>
          <li className={css.tagItem}>
            <p>
              <span className={css.tagTittle}>Kids Age:</span> {nanny.kids_age}
            </p>
          </li>
          <li className={css.tagItem}>
            <p>
              <span className={css.tagTittle}> Characters:</span> {nanny.characters?.join(', ')}
            </p>
          </li>
          <li className={css.tagItem}>
            <p>
              <span className={css.tagTittle}>Education:</span> {nanny.education}
            </p>
          </li>
        </ul>

        <p className={css.about}>{nanny.about}</p>

        {!isExpanded ? (
          <button type="button" className={css.readMoreBtn} onClick={() => setIsExpanded(true)}>
            Read more
          </button>
        ) : (
          <div className={css.expandedContent}>
            <ul className={css.reviews}>
              {nanny.reviews?.map((rev, idx) => (
                <li key={idx} className={css.reviewItem}>
                  <div className={css.reviewerAvatar}>{rev.reviewer[0]}</div>
                  <div>
                    <p className={css.reviewerName}>{rev.reviewer}</p>
                    <p className={css.reviewerRating}>
                      <svg width={16} height={16} className={css.icon}>
                        <use href={`${img}#icon-star`} />
                      </svg>
                      {rev.rating}
                    </p>
                    <p className={css.reviewComment}>{rev.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button type="button" className={css.appointmentBtn}>
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
