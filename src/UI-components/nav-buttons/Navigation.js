import {Animation} from "../../animation/Animation";
import ConfirmButton from "../button/ConfirmButton";
import React from "react";
import {useTranslation} from "react-i18next";

export const Navigation = ({confirmAction, confirmDisabled, confirmError, currentPage, pagesCount, setCurrentPage, withConfirm}) => {
  const [t] = useTranslation();

  const PreviousButton = () => {
    if (currentPage !== 1) {
      return (
        <Animation onClick={true} onHover={true} type='bounce'>
          <button
            type='button'
            className='button button-small button-secondary'
            onClick={() => setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1)}>
            {t('button.prev')}
          </button>
        </Animation>
      );
    }
    return null;
  }

  const NextButton = () => {
    if (currentPage < pagesCount) {
      return (
        <Animation onClick={true} onHover={true} type='bounce'>
          <button
            className='button button-small button-secondary'
            onClick={() => setCurrentPage(currentPage >= 2 ? pagesCount : currentPage + 1)}>
            {t('button.next')}
          </button>
        </Animation>
      );
    }
    if (currentPage === pagesCount && withConfirm) {
      return (
        <ConfirmButton onClick={confirmAction}
                       className={width < 481 ? 'button-small' : 'button-small-x-wide'}
                       disabled={confirmDisabled}
                       error={confirmError} text={t('signUp.button.signUp')}/>
      );
    }
    return null;
  }
  return (<div className={'NavigationButtons Flex A-I-C ' + (currentPage === 1 ? 'J-C-C' : 'J-C-S-B')}>
    <PreviousButton/>
    <NextButton/>
  </div>)
};
