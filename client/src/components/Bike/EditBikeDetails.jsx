import { useState, useEffect } from 'react';
import { createBicycle } from '../../services/bike.service';
import { MainBicycleForm } from './MainBicycleForm';

export const EditBikeDetails = ({
  closeModalHandler,
  updateHandler,
  setShow,
  ...bike
}) => {
  const [bikeDetails, setBikeDetails] = useState({
    pic: '',
    model: '',
    color: '',
    rating: '',
    location: '',
    _id: '',
  });

  useEffect(() => {
    for (const prop in bike) {
      setBikeDetails((prev) => {
        return {
          ...prev,
          [prop]: bike[prop],
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await createBicycle(bikeDetails);
    updateHandler(response);
    setShow(false);
  };

  const onInputChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBikeDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <MainBicycleForm
      handleFormSubmit={handleFormSubmit}
      bikeDetails={bikeDetails}
      onInputChangeHandler={onInputChangeHandler}
      closeModalHandler={closeModalHandler}
    />
  );
};
