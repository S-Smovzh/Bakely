import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../context/modal/ModalContext';

export default function useOutsideClick(id, actionToCall) {
  const elementRef = useRef(null);
  const { modal } = useContext(ModalContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if ((modal.cateringModal
        && modal.locationModal
        && modal.internalError
        && modal.clientsOrder
        && modal.usersOrder) === false) {
        if (elementRef.current
          && !(elementRef.current.contains(event.target)
            || (document.getElementById(id)
              && document.getElementById(id).contains(event.target)))) {
          actionToCall();
        }
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [actionToCall, elementRef, id, modal.cateringModal, modal.clientsOrder,
    modal.internalError, modal.locationModal, modal.usersOrder]);

  return [ elementRef ];
}
