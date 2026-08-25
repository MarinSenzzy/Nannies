import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Nanny } from '../NannyCard/NannyCard';
import css from './AppointmentModal.module.css';
import { Modal } from '../Modal/Modal';
import img from '../../assets/icons.svg';
import toast from 'react-hot-toast';
interface AppointmentModalProps {
  nanny: Nanny;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  address: string;
  phone: string;
  childAge: string;
  meetingTime: string;
  email: string;
  parentName: string;
  comment: string;
}

const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  const startHour = 6;
  const endHour = 21;

  for (let hour = startHour; hour <= endHour; hour++) {
    const formattedHour = String(hour).padStart(2, '0');

    slots.push(`${formattedHour} : 00`);

    if (hour !== endHour) {
      slots.push(`${formattedHour} : 30`);
    }
  }

  return slots;
};
const TIME_SLOTS = generateTimeSlots();

export const AppointmentModal = ({ nanny, isOpen, onClose }: AppointmentModalProps) => {
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      meetingTime: '09 : 00',
    },
  });

  const selectedTime = watch('meetingTime');

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    toast.success('Appointment successfully sent!');
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className={css.title}>Make an appointment with a babysitter</h2>
        <p className={css.description}>
          Arranging a meeting with a caregiver for your child is the first step to creating a safe
          and comfortable environment. Fill out the form below so we can match you with the perfect
          care partner.
        </p>

        <div className={css.nannyInfo}>
          <img src={nanny.avatar_url} alt={nanny.name} className={css.avatar} />
          <div>
            <span className={css.nannyLabel}>Your nanny</span>
            <h4 className={css.nannyName}>{nanny.name}</h4>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.grid}>
            <input
              {...register('address', { required: true })}
              placeholder="Address"
              className={css.input}
            />
            <input
              {...register('phone', { required: true })}
              placeholder="+380"
              className={css.input}
            />
            <input
              {...register('childAge', { required: true })}
              placeholder="Child's age"
              className={css.input}
            />

            <div className={css.timePickerContainer}>
              <div
                className={css.timeInputWrapper}
                onClick={() => setIsTimeDropdownOpen(prev => !prev)}
              >
                <input
                  {...register('meetingTime')}
                  readOnly
                  placeholder="00:00"
                  className={`${css.input} ${css.timeInput}`}
                />
                <svg width="20" height="20" className={css.clockIcon}>
                  <use href={`${img}#icon-clock`} />
                </svg>
              </div>

              {isTimeDropdownOpen && (
                <div className={css.timeDropdown}>
                  <p className={css.dropdownTitle}>Meeting time</p>
                  <ul className={css.timeList}>
                    {TIME_SLOTS.map(slot => (
                      <li
                        key={slot}
                        className={`${css.timeOption} ${selectedTime === slot ? css.selected : ''}`}
                        onClick={() => {
                          setValue('meetingTime', slot);
                          setIsTimeDropdownOpen(false);
                        }}
                      >
                        {slot}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            className={css.input}
          />
          <input
            {...register('parentName', { required: true })}
            placeholder="Father's or mother's name"
            className={css.input}
          />
          <textarea
            {...register('comment')}
            placeholder="Comment"
            className={css.textarea}
            rows={4}
          />

          <button type="submit" className={css.sendBtn}>
            Send
          </button>
        </form>
      </Modal>
    </>
  );
};
