import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainBicycleForm } from '../../components/Bike/MainBicycleForm';
import { createBicycle } from '../../services/bike.service';
import * as PATHS from './../../utils/paths';

import './AddNewBicycle.scss';

export const AddNewBicycle = () => {
  const [bicycleDetails, setBikeDetails] = useState({
    pic: '',
    model: '',
    color: '',
    location: '',
    rating: '',
    isAvailable: true,
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    setBikeDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    await createBicycle(bicycleDetails);
    navigate(PATHS.HOMEPAGE);
  };

  return (
    <div id='bicycle-form-container'>
      <MainBicycleForm
        handleFormSubmit={handleFormSubmission}
        bikeDetails={bicycleDetails}
        onInputChangeHandler={inputChangeHandler}
        handleClose={null}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
      />
    </div>
  );
};
