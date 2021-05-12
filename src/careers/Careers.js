import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import axios from 'axios';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import { ModalContext } from '../context/modal/ModalContext';
import Picture from '../UI-components/picture/Picture';
import { Animation } from '../animation/Animation';
import { Card } from '../UI-components/card/Card';
import { publicLinks } from '../utils/restLinks';
import { logError } from '../error/errorHandler';
import Head from '../head/Head';
import './Careers.css';

export default function Careers() {
  const [vacancies, setVacancies] = useState([]);
  const [bakeries, setBakeries] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState(null);
  const [ t ] = useTranslation();
  const { modal, setModal } = useContext(ModalContext);

  useEffect(() => {
    if (bakeries.length === 0) {
      getBakeries();
    }
    if (vacancies.length === 0) {
      getVacancies();
    }
  }, [ t ]);

  const getVacancies = async () => {
    await axios.get(publicLinks.careers(i18n.language))
      .then((response) => {
        const { success, data, errors } = response.data;

        if (success && !errors) {
          setVacancies(data);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  };

  const getBakeries = async () => {
    await axios.get(publicLinks.bakeries(i18n.language))
      .then((response) => {
        const { success, data, errors } = response.data;

        if (success && !errors) {
          let updatedDataArray = [];

          data.forEach((item) => {
            let location = {
              name: item.name,
              street: item.street
            };

            updatedDataArray.push(location);
          });
          setBakeries(updatedDataArray);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  };

  function handleChange(value) {
    if (value === 'all') {
      setFilteredVacancies(null);
    } else {
      let vac = vacancies.filter((item) => item.name === value);

      setFilteredVacancies(vac);
    }
  }

  return (
    <LoadingOverlay
      active={vacancies.length === 0}
      text={t('overlay.getting')}>
      <Head title={t('contactUs.seo.title')} description={t('contactUs.seo.description')}/>
      <div className="Careers-Page Nunito Grid">
        <header className="B-T Grid">
          <div className="Header Flex J-C-C A-I-C T-C Playfair">
            <h1>{t('careers.header')}</h1>
          </div>
          <div className="Location-Select Flex J-C-C A-I-C F-F-C-N">
            <label htmlFor="select-location" className="F-W">
              {t('careers.label.select')}
            </label>
            <select id="select-location" onChange={(event) => {
              handleChange(event.target.value);
            }} className="F-W">
              <optgroup className="helper">
                <option value="all">{t('careers.select.all')}</option>
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
        <div className="B-M">
          <ul className="F-W Flex A-I-C F-F-R-W">
            {filteredVacancies ?
              filteredVacancies.map((vacancy, index) => {
                return (
                  <li key={index} className="Flex">
                    <Card backType="gray" type="no-animation">
                      <header className="F-W F-H Grid">
                        <h2>{vacancy.post}</h2>
                        <p className="h6-size Flex J-C-S-B A-I-C F-F-R-N F-W">
                          <span>{vacancy.post}</span> - <span>{vacancy.salary}</span>
                        </p>
                        <Animation type="skew" onHover onClick>
                          <Link to={`/${i18n.language}/contact-us`}
                            className="Btn-I-F Btn-Su Btn"
                            aria-label="contact us">
                            <Picture src="http://localhost:3000/img/icons/comment.svg" alt="" imgClassName="Icon"
                              className="Icon"
                            />
                          </Link>
                        </Animation>
                      </header>
                      <div className="Flex J-C-C A-I-C">
                        <p>
                          {vacancy.details}
                        </p>
                      </div>
                    </Card>
                  </li>
                );
              })
              : vacancies &&
              vacancies.map((vacancy) => {
                return (
                  <Card backType="gray" type="no-animation" key={vacancy.salary}>
                    <header className="F-W F-H">
                      <h2>{vacancy.post}</h2>
                      <p className="h6-size Flex J-C-S-B A-I-C F-F-R-N F-W">
                        <span>{vacancy.post}</span> - <span>{vacancy.salary}</span>
                      </p>
                      <Animation type="skew" onHover onClick>
                        <Link to={`/${i18n.language}/contact-us`}
                          className="Btn-I-F Btn-Su Btn"
                          aria-label="contact us">
                          <Picture src="http://localhost:3000/img/icons/comment.svg" alt="" imgClassName="Icon"
                            className="Icon"
                          />
                        </Link>
                      </Animation>
                    </header>
                    <div className="Flex J-C-C A-I-C">
                      <p>
                        {vacancy.details}
                      </p>
                    </div>
                  </Card>
                );
              })}
          </ul>
        </div>
      </div>
    </LoadingOverlay>
  );
}
