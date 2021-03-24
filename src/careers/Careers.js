import React, {useContext, useEffect, useState} from 'react';
import './Careers.css';
import axios from 'axios';
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {Card} from "../UI-components/card/Card";
import {Picture} from "../UI-components/picture/Picture";
import {Link} from "react-router-dom";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {ModalContext} from "../context/modal/ModalContext";
import {publicLinks} from "../utils/restLinks";
import {Animation} from "../animation/Animation";
import {logError} from "../error/errorHandler";

export function Careers() {
  const [vacancies, setVacancies] = useState([]);
  const [bakeries, setBakeries] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState(null);
  const [t] = useTranslation();
  const {modal, setModal} = useContext(ModalContext);

  useEffect(() => {
    getBakeries();
    getVacancies();
  }, [t]);

  const getVacancies = async () => {
    await axios.get(publicLinks.careers(i18n.language))
      .then(async (response) => {
        const {success, data, errors} = response.data;
        if (success && !errors) {
          setVacancies(data);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          })
        }
      }).catch((error) => console.log(error));
  };

  const getBakeries = async () => {
    await axios.get(publicLinks.bakeries(i18n.language))
      .then(async (response) => {
        const {success, data, errors} = response.data;
        if (success && !errors) {
          let updatedDataArray = [];
          data.forEach((item) => {
            let location = {
              name: item.name,
              street: item.street
            }
            updatedDataArray.push(location);
          })
          setBakeries(updatedDataArray);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          })
        }
      }).catch((error) => logError(error));
  };

  function handleChange(value) {
    if (value === 'all') {
      setFilteredVacancies(null)
    } else {
      let vac = vacancies.filter((item) =>
        item.name === value
      )
      setFilteredVacancies(vac);
    }
  }

  return (
    <LoadingOverlay
      active={vacancies.length === 0}
      text={t('overlay.getting')}>
      <div className='Careers-Page Nunito'>
        <header className='TopBlock'>
          <div className='Header Playfair'>
            <h1>{t('careers.header')}</h1>
          </div>
          <div className='Location-Select'>
            <label htmlFor='select-location' className='fill-width'>
              {t('careers.label.select')}
            </label>
            <select id='select-location' onChange={(event) => {
              handleChange(event.target.value)
            }} className='fill-width'>
              <optgroup className='helper'>
                <option value='all'>{t('careers.select.all')}</option>
                {bakeries &&
                bakeries.map((bakery) => {
                  return (
                    <option key={bakery.name} value={bakery.name}>
                      {`${bakery.name} - ${bakery.street}`}
                    </option>
                  );
                })}
              </optgroup>
            </select>
          </div>
        </header>
        <div className='MiddleBlock'>
          {filteredVacancies ?
            filteredVacancies.map((vacancy) => {
              return (
                <Card backType='gray' type='no-animation' key={vacancy.salary}>
                  <header className='fill-width fill-height'>
                    <h2>{vacancy.post}</h2>
                    <p className='h6-size'>
                      <span>{vacancy.post}</span> - <span>{vacancy.salary}</span>
                    </p>
                    <Link to='/contact-us' className='button-icon-footer button-success button'>
                      <Picture src='http://localhost:3000/img/icons/comment.svg' alt='contact us' imgClassName='icon'
                               className='icon'/>
                    </Link>
                  </header>
                  <div className='Vacancy-Details'>
                    <p>
                      {vacancy.details}
                    </p>
                  </div>
                </Card>
              );
            })
            : vacancies &&
            vacancies.map((vacancy) => {
              return (
                <Card backType='gray' type='no-animation' key={vacancy.salary}>
                  <header className='fill-width fill-height'>
                    <h2>{vacancy.post}</h2>
                    <p className='h6-size'>
                      <span>{vacancy.post}</span> - <span>{vacancy.salary}</span>
                    </p>
                    <Animation type='skew' onHover={true} onClick={true}>
                      <Link to='/contact-us' className='button-icon-footer button-success button'
                            aria-label='contact us'>
                        <Picture src='http://localhost:3000/img/icons/comment.svg' alt='' imgClassName='icon'
                                 className='icon'/>
                      </Link>
                    </Animation>
                  </header>
                  <div className='Vacancy-Details'>
                    <p>
                      {vacancy.details}
                    </p>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </LoadingOverlay>
  );
}
