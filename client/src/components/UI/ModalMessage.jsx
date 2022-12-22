import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-details-slice';

import './ModalMessage.styles.scss';

const ModalMessage = ({ message }) => {
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (message) {
        setIsHidden(true);
        dispatch(uiActions.setModalDetails(''));
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
      setIsHidden(false);
    };
  }, [dispatch, message]);

  return (
    <React.Fragment>
      {message &&
        ReactDOM.createPortal(
          <div className='backdrop' hidden={isHidden}>
            <div className='modal'>{message}</div>
          </div>,
          document.getElementById('modal-root')
        )}
    </React.Fragment>
  );
};

export default ModalMessage;
