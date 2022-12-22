import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import './BikeCardDetails.scss';

export const MainBicycleForm = ({
  handleFormSubmit,
  bikeDetails,
  onInputChangeHandler,
  setIsDisabled,
  isDisabled,
}) => {
  const { pic, model, color, location } = bikeDetails;

  const areAllTheInputsFilled = pic && model && color && location;

  return (
    <form id='bike-form' onSubmit={handleFormSubmit}>
      <div className='form-input-container'>
        <label htmlFor='bike-picture'>Picture</label>
        <Input
          value={pic}
          onChange={onInputChangeHandler}
          type='text'
          id='bike-picture'
          name='pic'
        />
      </div>
      <div className='form-input-container'>
        <label htmlFor='bike-model'>Model</label>
        <Input
          value={model}
          onChange={onInputChangeHandler}
          type='text'
          id='bike-model'
          name='model'
        />
      </div>
      <div className='form-input-container'>
        <label htmlFor='bike-color'>Color</label>
        <Input
          value={color}
          onChange={onInputChangeHandler}
          type='text'
          id='bike-color'
          name='color'
        />
      </div>
      <div className='form-input-container'>
        <label htmlFor='bike-location'>Location</label>
        <Input
          value={location}
          onChange={onInputChangeHandler}
          type='text'
          id='bike-location'
          name='location'
        />
      </div>

      <Button
        className='submit-modal-button'
        color='success'
        variant='contained'
        type='submit'
        disabled={!areAllTheInputsFilled || isDisabled}
      >
        Submit
      </Button>
    </form>
  );
};
