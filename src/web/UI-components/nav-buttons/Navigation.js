import React from 'react';
import { useTranslation } from 'react-i18next';
import { Animation } from '../animation/Animation';
import ConfirmButton from '../button/ConfirmButton';
import PropTypes from 'prop-types';
import useWindowDimensions from '../../utils/useWindowDimensions';

export const Navigation = ({
  confirmAction,
  confirmDisabled,
  confirmError,
  currentPage,
  pagesCount,
  setCurrentPage,
  withConfirm }) => {
  Navigation.propTypes = {
    confirmAction: PropTypes.func,
    confirmDisabled: PropTypes.bool,
    confirmError: PropTypes.bool,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    setCurrentPage: PropTypes.func,
    withConfirm: PropTypes.bool
  };

  Navigation.defaultProps = {
    confirmAction: null,
    confirmDisabled: false,
    confirmError: false,
    currentPage: 1,
    pagesCount: 1,
    setCurrentPage: 1,
    withConfirm: false
  };
  const [ t ] = useTranslation();

  const PreviousButton = () => {
    if (currentPage !== 1) {
      return (
        <Animation onClick onHover type="bounce">
          <button
            type="button"
            className="Btn Btn-Sm Btn-S"
            onClick={() => setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1)}>
            {t('button.prev')}
          </button>
        </Animation>
      );
    }
    return null;
  };

  const NextButton = () => {
    const { width } = useWindowDimensions();

    if (currentPage < pagesCount) {
      return (
        <Animation onClick onHover type="bounce">
          <button
            className="Btn Btn-Sm Btn-S"
            onClick={() => setCurrentPage(currentPage >= 2 ? pagesCount : currentPage + 1)}>
            {t('button.next')}
          </button>
        </Animation>
      );
    }
    if (currentPage === pagesCount && withConfirm) {
      return (
        <ConfirmButton onClick={confirmAction}
          className={width < 481 ? 'Btn-Sm' : 'Btn-Sm-X-W'}
          disabled={confirmDisabled}
          error={confirmError} text={t('signUp.button.signUp')}
        />
      );
    }
    return null;
  };

  return (
    <div className={'Nav-Btns Flex A-I-C ' + (currentPage === 1 ? 'J-C-C' : 'J-C-S-B')}>
      <PreviousButton/>
      <NextButton/>
    </div>
  );
};
