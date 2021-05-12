import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import { OrderFormContext } from '../context/orderForm/OrderFormContext';
import CloseButton from '../UI-components/button/close/CloseButton';
import { publicLinks } from '../utils/restLinks';
import { logError } from '../error/errorHandler';
import { NavigationButtons } from './OrderForm';

// eslint-disable-next-line react/prop-types
export const SelfPickUpPage = ({ closeModal, next, page, prev }) => {
  const [locations, setLocations] = useState([]);
  const [ t ] = useTranslation();
  const { orderForm, setOrderForm } = useContext(OrderFormContext);

  useEffect(() => {
    getLocations();
  }, [ t ]);

  const getLocations = () => {
    axios.get(publicLinks.bakeries(i18n.language))
      .then((response) => {
        const { success, data } = response.data;

        if (success) {
          let updatedDataArray = [];

          data.forEach((item) => {
            let location = {
              id: item.id,
              name: item.name,
              street: item.street
            };

            updatedDataArray.push(location);
          });
          setLocations(updatedDataArray);
        }
      }).catch((error) => logError(error));
  };

  return (
    <section className={`Select-Page Flex J-C-S-B F-F-C-N F-H F-W 
    ${((orderForm.delivery || page !== 4) ? 'None' : '')}`}>
      <header className="Flex A-I-C F-F-R-N J-C-S-B T-L">
        <h1 className="h3-size">
          {t('orderForm.selfPickUp.header')}
        </h1>
        <CloseButton onClick={closeModal} animate ariaLabel={t('ariaLabel.close')}/>
      </header>
      <div className="Flex A-S-C F-F-C-N J-C-S-B F-W F-H">
        <div className="Select-Container A-S-C F-H Flex A-I-C J-C-C F-F-C-N">
          <select onChange={(event) => {
            setOrderForm({
              ...orderForm,
              bakery: event.target.value
            });
          }}>
            <option value={0}>
              -- Select a bakery for pick-up
            </option>
            {locations.map((option) => {
              return (
                <option key={option.name} value={option.name}>
                  {option.name} - {option.street}
                </option>
              );
            })}
          </select>
        </div>
        <NavigationButtons page={page} nextButtonText={t('button.submit')} prevOnClickAction={() => prev()}
          displayNext displayPrev
          nextButtonDisabled={!orderForm.bakery || orderForm.bakery === '0'}
          nextOnClickAction={() => next()}
        />
      </div>
    </section>
  );
};
