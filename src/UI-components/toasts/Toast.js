import React, {useEffect, useState} from "react";
import {Toast} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import CloseButton from "../button/close/CloseButton";
import './Toast.css';
import {timer} from "rxjs";
import {useSpring, animated} from "react-spring";
import PropTypes from "prop-types";

export const ToastMessage = ({className, onClose, show, showTime, toastHeader, toastText}) => {

  ToastMessage.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    showTime: PropTypes.number,
    toastHeader: PropTypes.string.isRequired,
    toastText: PropTypes.string.isRequired
  };

  ToastMessage.defaultProps = {
    className: null,
    onClose: '',
    show: false,
    showTime: 999999,
    toastHeader: '',
    toastText: 0,
  };

  const [t] = useTranslation();
  const [activateAnimation, setActivateAnimation] = useState(false);

  useEffect(() => {
    timer(1000).subscribe(() => setActivateAnimation(true))
  }, [show])

  const toastAnimation = useSpring({
    transform: activateAnimation ? 'translateY(0)' : 'translateY(1000px)'
  });

  return (
    <animated.div className='Toast-Wrapper Nunito' style={toastAnimation}>
      <Toast onClose={onClose} show={show} animation={true} delay={showTime} className={className}>
        <Toast.Header className='J-C-S-B' closeButton={false}>
          <h2 className='h3-size'>
            {toastHeader}
          </h2>
          <CloseButton onClick={onClose} animate={true} ariaLabel={t('aria-label.removeItem')}/>
        </Toast.Header>
        <Toast.Body className='helper Flex J-C-C A-I-C F-F-C-N'>
          {toastText}
        </Toast.Body>
      </Toast>
    </animated.div>
  );
}