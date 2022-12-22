import './Modal.scss';
import { EditBikeDetails } from '../../Bike/EditBikeDetails';
import Button from '@mui/material/Button';

export const EditBikeFormModal = ({
  show,
  closeModalHandler,
  handleSubmit,
  updateHandler,
  setShow,
  ...bike
}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className='modal-container'>
      <div className={showHideClassName}>
        <section className='modal-main'>
          <EditBikeDetails
            closeModalHandler={closeModalHandler}
            updateHandler={updateHandler}
            setShow={setShow}
            {...bike}
          />
          <Button
            className='close-modal-button'
            color='secondary'
            type='button'
            onClick={closeModalHandler}
          >
            Close
          </Button>
        </section>
      </div>
    </div>
  );
};
