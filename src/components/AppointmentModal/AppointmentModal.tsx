import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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

const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+380\d{9}$/, 'Format must be +380XXXXXXXXX'),
  childAge: yup.string().required("Child's age is required"),
  meetingTime: yup.string().required('Meeting time is required'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  parentName: yup.string().required("Parent's name is required"),
  comment: yup.string().optional(),
});

type FormData = yup.InferType<typeof schema>;

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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      meetingTime: '09 : 00',
    },
  });

  const selectedTime = watch('meetingTime');

  const onSubmit = (data: FormData) => {
    // console.log('Form data:', data);
    toast.success(`Appointment successfully sent! ${data.parentName}, we'll be in touch soon`);
    reset();
    onClose();
  };

  const onError = () => {
    toast.error('Please fill in all required fields correctly');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={css.title}>Make an appointment with a babysitter</h2>
      <p className={css.description}>
        Arranging a meeting with a caregiver for your child is the first step to creating a safe and
        comfortable environment. Fill out the form below so we can match you with the perfect care
        partner.
      </p>

      <div className={css.nannyInfo}>
        <img src={nanny.avatar_url} alt={nanny.name} className={css.avatar} />
        <div>
          <span className={css.nannyLabel}>Your nanny</span>
          <h4 className={css.nannyName}>{nanny.name}</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className={css.form} noValidate>
        <div className={css.grid}>
          <div className={css.fieldWrapper}>
            <input
              {...register('address')}
              placeholder="Address"
              className={`${css.input} ${errors.address ? css.inputError : ''}`}
            />
            {errors.address && <span className={css.errorText}>{errors.address.message}</span>}
          </div>

          <div className={css.fieldWrapper}>
            <input
              {...register('phone')}
              placeholder="+380"
              className={`${css.input} ${errors.phone ? css.inputError : ''}`}
            />
            {errors.phone && <span className={css.errorText}>{errors.phone.message}</span>}
          </div>

          <div className={css.fieldWrapper}>
            <input
              {...register('childAge')}
              placeholder="Child's age"
              className={`${css.input} ${errors.childAge ? css.inputError : ''}`}
            />
            {errors.childAge && <span className={css.errorText}>{errors.childAge.message}</span>}
          </div>

          <div className={`${css.timePickerContainer} ${css.fieldWrapper}`}>
            <div
              className={css.timeInputWrapper}
              onClick={() => setIsTimeDropdownOpen(prev => !prev)}
            >
              <input
                {...register('meetingTime')}
                readOnly
                placeholder="00:00"
                className={`${css.input} ${css.timeInput} ${errors.meetingTime ? css.inputError : ''}`}
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
                        setValue('meetingTime', slot, { shouldValidate: true });
                        setIsTimeDropdownOpen(false);
                      }}
                    >
                      {slot}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {errors.meetingTime && (
              <span className={css.errorText}>{errors.meetingTime.message}</span>
            )}
          </div>
        </div>

        <div className={css.fieldWrapper}>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={`${css.input} ${errors.email ? css.inputError : ''}`}
          />
          {errors.email && <span className={css.errorText}>{errors.email.message}</span>}
        </div>

        <div className={css.fieldWrapper}>
          <input
            {...register('parentName')}
            placeholder="Father's or mother's name"
            className={`${css.input} ${errors.parentName ? css.inputError : ''}`}
          />
          {errors.parentName && <span className={css.errorText}>{errors.parentName.message}</span>}
        </div>

        <div className={css.fieldWrapper}>
          <textarea
            {...register('comment')}
            placeholder="Comment"
            className={css.textarea}
            rows={4}
          />
        </div>

        <button type="submit" className={css.sendBtn}>
          Send
        </button>
      </form>
    </Modal>
  );
};
