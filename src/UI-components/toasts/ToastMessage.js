import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useTranslation } from 'react-i18next';
import { Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { timer } from 'rxjs';
import CloseButton from '../button/close/CloseButton';
import './ToastMessage.css';

export const ToastMessage = ({ className, onClose, show, showTime, toastHeader, toastText }) => {
  ToastMessage.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    showTime: PropTypes.number,
    toastHeader: PropTypes.string.isRequired,
    toastText: PropTypes.any.isRequired
  };

  ToastMessage.defaultProps = {
    className: null,
    onClose: '',
    show: false,
    showTime: 999999,
    toastHeader: '',
    toastText: 0
  };

  const [ t ] = useTranslation();
  const [activateAnimation, setActivateAnimation] = useState(false);

  const toastAnimation = useSpring({
    transform: activateAnimation ? 'translateY(0)' : 'translateY(1000px)'
  });

  useEffect(() => {
    timer(1000).subscribe(() => setActivateAnimation(true));
  }, [ show ]);

  return (
    <animated.div className="Toast-Wrapper Nunito" style={toastAnimation}>
      <Toast onClose={onClose} show={show} animation
        delay={showTime} className={className}>
        <Toast.Header className="J-C-S-B" closeButton={false}>
          <h2 className="h3-size">
            {toastHeader}
          </h2>
          <CloseButton onClick={onClose} animate ariaLabel={t('aria-label.removeItem')}/>
        </Toast.Header>
        <Toast.Body className="helper Flex J-C-C A-I-C F-F-C-N">
          {toastText}
        </Toast.Body>
      </Toast>
    </animated.div>
  );
};
