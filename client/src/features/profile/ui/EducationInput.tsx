import styled from '@emotion/styled';
import { UseFieldArrayRemove, UseFormRegister, useWatch, Control } from 'react-hook-form';
import { CreateProfileRequest } from '@/entities/profile/model/types';

interface EducationInputProps {
  index: number;
  control: Control<CreateProfileRequest>;
  register: UseFormRegister<CreateProfileRequest>;
  remove: UseFieldArrayRemove;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 20px;
  border: 1px solid #EEEEEE;
  border-radius: 12px;
  background: white;
  
  .education-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  
  .school-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .date-range {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 240px;
  }
  
  .input-field {
    width: 100%;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 15px;
    color: #333333;
    
    &::placeholder {
      color: #999999;
    }
    
    &:hover {
      border-color: #DDDDDD;
    }
    
    &:focus {
      border-color: #3182F6;
      outline: none;
    }
  }
  
  .date-input {
    width: 140px;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 15px;
    color: #333333;
    
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
    
    &:hover {
      border-color: #DDDDDD;
    }
    
    &:focus {
      border-color: #3182F6;
      outline: none;
    }
  }
  
  .attending-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    
    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin: 0;
      cursor: pointer;
    }
    
    label {
      font-size: 14px;
      color: #666666;
      cursor: pointer;
    }
  }
  
  .delete-button {
    width: 44px;
    height: 44px;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    background: white;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
      border-color: #DDDDDD;
      color: #666666;
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export function EducationInput({ index, register, remove, control }: EducationInputProps) {
  const isAttending = useWatch({
    control,
    name: `education.${index}.isAttending`
  });

  return (
    <Container>
      <div className="education-header">
        <div className="school-info">
          <input
            className="input-field"
            placeholder="학교명"
            {...register(`education.${index}.schoolName`)}
          />
          <input
            className="input-field"
            placeholder="전공 및 학위 (ex: 정영학과 학사)"
            {...register(`education.${index}.major`)}
          />
        </div>

        <div className="date-range">
          <input
            type="month"
            className="date-input"
            {...register(`education.${index}.startDate`)}
          />
          <span style={{ color: '#999999' }}>-</span>
          {!isAttending && (
            <input
              type="month"
              className="date-input"
              {...register(`education.${index}.endDate`)}
            />
          )}
          {isAttending && (
            <div
              style={{
                width: '140px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                color: '#3182F6',
                fontSize: '15px'
              }}
            >
              재학중
            </div>
          )}
        </div>

        <button
          type="button"
          className="delete-button"
          onClick={() => remove(index)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="attending-checkbox">
        <input
          type="checkbox"
          id={`attending-${index}`}
          {...register(`education.${index}.isAttending`)}
        />
        <label htmlFor={`attending-${index}`}>현재 재학중</label>
      </div>
    </Container>
  );
} 