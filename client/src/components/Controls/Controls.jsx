import { useState } from 'react';
import { deleteBike } from '../../services/bike.service';
import { EditBikeFormModal } from '../UI/Modal/EditBikeFormModal';
import { setBikeDataThunk } from './../../store/bike-data-slice';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './Controls.styles.scss';

export const Controls = ({ bikeId, getListUpdated, ...bike }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const deleteBikeHandler = async () => {
    const response = await deleteBike(bikeId);
    if (response.status) {
      dispatch(setBikeDataThunk());
    } else {
      alert('Bike has not been deleted...');
    }
  };

  const updateHandler = (response) => {
    if (response.status) {
      dispatch(setBikeDataThunk());
    } else {
      alert('Bike has not been updated...');
    }
  };

  const editBikeButtonHandler = () => {
    setShow(true);
  };

  const closeModalHandler = () => setShow(false);

  return (
    <div className='controlsContianer'>
      <div className='controls-container-buttons'>
        <Button
          color='secondary'
          variant='contained'
          onClick={() => editBikeButtonHandler(bikeId)}
        >
          Edit
        </Button>
        <Button
          color='warning'
          variant='contained'
          onClick={() => deleteBikeHandler(bikeId)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <EditBikeFormModal
          show={show}
          closeModalHandler={closeModalHandler}
          updateHandler={updateHandler}
          setShow={setShow}
          {...bike}
        />
      </div>
    </div>
  );
};
