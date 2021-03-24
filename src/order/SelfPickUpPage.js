import React, {useContext, useEffect, useState} from "react";
import {OrderFormContext} from "../context/orderForm/OrderFormContext";
import i18n from "i18next";
import axios from "axios";
import './OrderFrom.css';
import {NavigationButtons} from "./OrderForm";
import {useTranslation} from "react-i18next";
import {publicLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";

export const SelfPickUpPage = ({closeModal, next, page, prev}) => {
  const {orderForm, setOrderForm} = useContext(OrderFormContext);
  const [locations, setLocations] = useState([]);
  const [t] = useTranslation();

  useEffect(() => {
    getLocations();
  }, [t])

  const getLocations = () => {
    axios.get(publicLinks.bakeries(i18n.language))
      .then((response) => {
        const {success, data} = response.data;
        if (success) {
          let updatedDataArray = [];
          data.forEach((item) => {
            let location = {
              id: item.id,
              name: item.name,
              street: item.street
            }
            updatedDataArray.push(location);
          })
          setLocations(updatedDataArray);
        }
      }).catch((error) => logError(error));
  };

  return (
    <section className={'Select-Page fill-height fill-width ' + ((orderForm.delivery || page !== 4) ? 'none' : '')}>
      <header>
        <h1 className='h3-size'>
          {t('orderForm.selfPickUp.header')}
        </h1>
        <button onClick={() => closeModal()}
                type='button' className='button-error button-icon-footer Close-Button' aria-label='Close'>
          <img src='http://localhost:3000/img/icons/cross.svg' alt='Close icon'/>
        </button>
      </header>
      <form className='Form fill-width' method='POST'>
        <div className='Select-Container'>
          <select onChange={(event) => {
            setOrderForm({
              ...orderForm,
              bakery: event.target.value
            })
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
                           displayNext={true} displayPrev={true}
                           nextButtonDisabled={!orderForm.bakery || orderForm.bakery === "0"}
                           nextOnClickAction={() => next()}/>
      </form>
    </section>
  );
}