import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import i18n from 'i18next';
import axios from 'axios';
import minus from '../../assets/images/icons/minus.svg';
import plus from '../../assets/images/icons/plus.svg';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import { Animation } from '../UI-components/animation/Animation';
import { ModalContext } from '../context/modal/ModalContext';
import { structuredDataList } from '../utils/structuredData';
import { Overlay } from '../UI-components/overlay/Overlay';
import useWindowDimensions from '../utils/isTouchDevice';
import CartContext from '../context/cart/CartContext';
import { Card } from '../UI-components/card/Card';
import { publicLinks } from '../utils/restLinks';
import { logError } from '../error/errorHandler';
import Head from '../head/Head';
import './ProductPage.css';

import (/* webpackChunkName: "shopAll", webpackPrefetch: true */ './ShopAll');
import (/* webpackChunkName: "prodList", webpackPrefetch: true */ './ProductsList');

export default function ProductPage(props) {
  const [ t ] = useTranslation();
  const [ingredients, setIngredients] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [maxPerOrder, setMaxPerOrder] = useState(new Map([]));
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  const { modal, setModal } = useContext(ModalContext);
  const location = useLocation();
  const { width } = useWindowDimensions();
  // eslint-disable-next-line react/prop-types
  const id = props.match.params.id;
  // eslint-disable-next-line react/prop-types
  const type = props.match.params.type;

  useEffect(() => {
    getProduct();
    getIngredients();
    getSimilar();
  }, [ t ]);

  useEffect(() => {
    setProduct([]);
    setSelectValue('');
    setMaxPerOrder(new Map([]));
    setTotalPrice(0.00);
    setQuantity(1);
  }, [ location ]);

  useEffect(() => {
    const maximum = maxPerOrder.get(selectValue);

    if (quantity > maximum) {
      setQuantity(maximum);
    }
  }, [ selectValue ]);

  async function getProduct() {
    product.length === 0 && await axios.get(publicLinks.productsById(i18n.language, id))
      .then(response => {
        const { success, data } = response.data;

        if (success) {
          setProduct(data[0]);
          let tempMap = new Map([]);
          const options = data[0].options;
          const maxPerOrder = data[0].maxPerOrder;

          for (let i = 0; i < options.length; i++) {
            tempMap.set(options[i], maxPerOrder[i]);
          }
          setMaxPerOrder(tempMap);
          setSelectValue(data[0].options[0]);
          data[0].selectedOption = data[0].options[0];
          setTotalPrice(data[0].discount ? data[0].price * (100 - data[0].discount) / 100 : data[0].price);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  }

  async function getIngredients() {
    ingredients.length === 0 &&  await axios.get(publicLinks.ingredientsByproductId(i18n.language, id))
      .then(response => {
        const { success, data } = response.data;

        if (success) {
          setIngredients(data);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  }

  async function getSimilar() {
    similarProducts.length === 0 &&  await axios.get(publicLinks.similarProducts(i18n.language, type, id))
      .then(response => {
        const { success, data } = response.data;

        if (success) {
          setSimilarProducts(data);
        } else {
          setModal({
            ...modal,
            internalError: true
          });
        }
      }).catch((error) => logError(error));
  }

  const increment = () => {
    const maximum = maxPerOrder.get(selectValue);

    if (quantity < maximum) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  function countTotalPrice() {
    if (selectValue) {
      const price = Number.parseFloat(product.price);
      const option = selectValue.split(' ')[0];

      product.total = price * (100 - product.discount) / 100 * option * quantity;
      setTotalPrice(product.total);
    }
  }

  useEffect(() => {
    countTotalPrice();
    product.quantity = quantity;
  }, [quantity, selectValue]);

  return (
    <CartContext.Consumer>
      {context => (
        <LoadingOverlay
          active={product.length === 0}
          text={t('overlay.loading')}>
          <Head title={product.name} description={product.description}
            cardTitle={product.name} cardDescription={product.description}
            imgUrl={product.imgSrc} imgUrlSecure={product.imgSrc}
            imgAlt={product.imgDescription} imgType="PNG"
            structuredDataJSON={structuredDataList.product(product.name, product.description, product.imgSrc, product.price)}
          />
          <div className="Product_Page Grid Nunito">
            <section className="B-M Grid">
              <section className="Col-F Flex F-F-C-N">
                <header className={`Playfair ${width < 769 ? 'T-C' : 'T-L'}`}>
                  <h1 className="h2-size">{product.name}</h1>
                </header>
                <div
                  className={`F-W Flex J-C-F-S A-I-F-S ${(width < 769 && width > 481) ? 'F-F-R-N' : 'F-F-C-N'}`}>
                  <img
                    src={`https://res.cloudinary.com/gachi322/image/upload/Bakely/products/${product.type}/${product.imgSrc}`}
                    alt={product.imgDescription} className="Image-P Image-L A-S-C"
                  />
                  <div className={`F-W Flex
                  ${width < 769 && width > 480 ? 'J-C-F-E' : 'J-C-F-S'}
                  ${width < 481 && 'J-C-F-S'} A-S-F-E`}>
                    <div>
                      <p className="T-L F-W">
                        {t('productPage.orders')}
                      </p>
                      <p className="T-L F-W">
                        <Link to={`/${i18n.language}/delivery`}>{t('productPage.deliveryInfo')}</Link>
                      </p>
                      <p className="T-L F-W">
                        <Link to={`/${i18n.language}/contact-us`}>{t('productPage.contactUs')}</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="Col-S Grid">
                <section className="It-Inf Flex A-I-F-S J-C-F-S F-F-C-N">
                  <div className="Product_Description">
                    <p className="font-weight_300 h6-size">{product.description}</p>
                  </div>
                </section>
                <section className="Item-Ingr Grid">
                  <h3>
                    {t('productPage.ingredients')}
                  </h3>
                  <ul className="Ingr-L Flex A-I-F-S J-C-F-S F-F-C-W F-W">
                    {ingredients.map((item, index) => {
                      return (
                        <li key={index} className="Flex J-C-S-B A-I-C F-F-R-N">
                          <div>&#x2022;</div>
                          <div>{item.name}</div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="HR-C Flex J-C-C A-I-C F-W">
                    <hr/>
                  </div>
                </section>
                <section className="Item-D Grid">
                  <div className="Item-O Flex J-C-F-E A-I-C F-F-C-N">
                    <header className="F-W Product_Total Flex J-C-C A-I-C F-F-C-N A-S-C">
                      <h2 className="F-H F-W error-300">{t('productPage.total')} <span
                        className="font-weight_900">{totalPrice}$</span></h2>
                    </header>
                    <div className="Wrapper F-W Flex J-C-F-S A-I-F-E F-F-R-N">
                      <div className="Options">
                        <Dropdown onSelect={(eventKey) => {
                          setSelectValue(eventKey);
                          product.selectedOption = eventKey ? eventKey : product.options[0];
                        }}
                          className="F-W">
                          <Dropdown.Toggle variant={null} id="options-dropdown" className="F-W Btn-S Form-Sel">
                            {product.selectedOption}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="F-W P-M Flex J-C-S-B A-I-C F-F-C-N" flip={false}>
                            {product.options && product.options.map((option) => {
                              return (
                                <Dropdown.Item key={option} eventKey={option} className="T-C">
                                  {option}
                                </Dropdown.Item>
                              );
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="Qu Flex J-C-C A-I-C F-F-R-N">
                        <button onClick={decrement} type="button"
                          className="Btn Btn-P Btn-I">
                          <Animation type="rotate-360" onHover onClick
                            infinite={false} className="Flex J-C-C A-I-C">
                            <img src={minus} className="Icon" alt=""/>
                          </Animation>
                        </button>
                        <p id="qu" className="Flex J-C-C A-I-C T-C">
                          {quantity}
                        </p>
                        <button onClick={increment} type="button"
                          className="Btn Btn-P Btn-I">
                          <Animation type="rotate-360" onHover onClick
                            infinite={false} className="Flex J-C-C A-I-C">
                            <img src={plus} className="Icon" alt=""/>
                          </Animation>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* eslint-disable-next-line max-len */}
                  <div className={`Flex ${width < 481 ? 'J-C-F-S' : ((width > 768 && width < 992) ? 'J-C-F-S' : 'J-C-C')} A-I-F-E F-W F-H`}>
                    <Animation type="bounce" onHover onClick
                      infinite={false}>
                      <button className="Btn Btn-P Btn-Sm"
                        onClick={() => context.addProductToCart(product)}>
                        {t('productPage.addToCart')}
                      </button>
                    </Animation>
                  </div>
                </section>
              </section>
            </section>
            <section className="B-B Grid">
              <header className="T-C">
                <h2>{t('productPage.similar')}</h2>
              </header>
              <ul className={`Items-L Flex ${width > 991 ? 'J-C-S-B' : 'J-C-S-A'} F-F-R-W`}>
                {similarProducts && similarProducts.map((similar) => {
                  const isDiscounted = Number.parseInt(similar.discount, 10) > 0;

                  return (
                    <li key={similar.id}>
                      <Link to={location.pathname.substr(0, location.pathname.lastIndexOf('/')) + '/' + similar.id}>
                        <Card className="Grid Image-S-P F-H" backType="gray">
                          <Overlay cldI imageName={similar.imgSrc} alt={similar.imgDescription}
                            imageType="similarProduct" folders={`products/${product.type}`}>
                            <h3 className="h3-size">{similar.name}</h3>
                          </Overlay>
                          <div className="It-Inf Grid F-H">
                            <h4 className="Product-Name Flex F-F-C-N T-C font-weight_600 F-W">
                              {similar.name}
                            </h4>
                            <div className="Prod-Pr Flex F-F-C-N J-C-F-E T-C F-W">
                              <p className="Price-Discount font-weight_600 h4-size error-300 F-W">
                                {isDiscounted
                                  ? t('productsList.price', { price: product.price * (100 - product.discount) / 100 })
                                  : t('productsList.price', { price: product.price })}
                              </p>
                              {isDiscounted ? (
                                <p
                                  className="Price font-weight_300 helper Crossed F-W">
                                  {isDiscounted ? t('productsList.oldPrice', { price: product.price }) : null}
                                </p>
                                )
                                : null}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </LoadingOverlay>
      )}
    </CartContext.Consumer>
  );
}
