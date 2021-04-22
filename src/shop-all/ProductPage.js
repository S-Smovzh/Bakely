import React, {useContext, useEffect, useState} from 'react';
import './ProductPage.css';
import {Picture} from '../UI-components/picture/Picture';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Overlay} from '../UI-components/overlay/Overlay';
import {Link, useLocation} from 'react-router-dom';
import {ModalContext} from '../context/modal/ModalContext';
import {Card} from '../UI-components/card/Card';
import CartContext from '../context/cart/CartContext';
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {useTranslation} from "react-i18next";
import {Animation} from "../animation/Animation";
import {publicLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import i18n from "i18next";
import useWindowDimensions from "../utils/isTouchDevice";

export default function ProductPage(props) {
  const [ingredients, setIngredients] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [maxPerOrder, setMaxPerOrder] = useState(new Map([]));
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  const [item, setItem] = useState({
    product: [],
    selectValue: '',
    maxPerOrder: new Map([]),
    totalPrice: 0.00,
    quantity: 1
  });

  const {modal, setModal} = useContext(ModalContext);
  const location = useLocation();
  const [t] = useTranslation();
  const {width} = useWindowDimensions();
  const id = props.match.params.id;
  const type = props.match.params.type;

  useEffect(() => {
    getProduct();
    getIngredients();
    getSimilar();
  }, [t]);

  useEffect(() => {
    setProduct([]);
    setSelectValue('');
    setMaxPerOrder(new Map([]));
    setTotalPrice(0.00);
    setQuantity(1);
  }, [location]);

  useEffect(() => {
    const maximum = maxPerOrder.get(selectValue);
    if (quantity > maximum) {
      setQuantity(maximum);
    }
  }, [selectValue]);

  async function getProduct() {
    await axios.get(publicLinks.productsById(i18n.language, id))
      .then(response => {
        const {success, data} = response.data;
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
    await axios.get(publicLinks.ingredientsByproductId(i18n.language, id))
      .then(response => {
        const {success, data} = response.data;
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
    await axios.get(publicLinks.similarProducts(i18n.language, type, id))
      .then(response => {
        const {success, data} = response.data;
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
      {context =>
        <LoadingOverlay
          active={product.length === 0}
          text={t('overlay.getting')}>
          <div className='Product_Page Grid Nunito'>
            <section className='MiddleBlock Grid'>
              <section className='Col_First Flex F-F-C-N'>
                <header className={`Playfair ${width < 769 ? 'T-C' : 'T-L'}`}>
                  <h1>{product.name}</h1>
                </header>
                <div
                  className={`fill-width Flex J-C-F-S A-I-F-S ${(width < 769 && width > 481) ? 'F-F-R-N' : 'F-F-C-N'}`}>
                  <img src={product.imgSrc} alt={product.imgDescription} className='productImage A-S-C'/>
                  <div className={`fill-width Flex ${width < 769 && width > 480 ? 'J-C-F-E' : 'J-C-F-S'} ${width < 481 && 'J-C-F-S'} A-S-F-E`}>
                    <div>
                      <p className='T-L fill-width'>
                        {t('productPage.orders')}
                      </p>
                      <p className='T-L fill-width'>
                        <Link to='/delivery'>{t('productPage.deliveryInfo')}</Link>
                      </p>
                      <p className='T-L fill-width'>
                        <Link to='/contact-us'>{t('productPage.contactUs')}</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className='Col_Second Grid'>
                <section className='Product_Info Flex A-I-F-S J-C-F-S F-F-C-N'>
                  <div className='Product_Description'>
                    <p className='font-weight_400 h6-size'>{product.description}</p>
                  </div>
                </section>
                <section className='Product_Ingredients Grid'>
                  <h3>
                    {t('productPage.ingredients')}
                  </h3>
                  <ul className='Ingredients_List Flex A-I-F-S J-C-F-S F-F-C-W fill-width'>
                    {ingredients.map((item, index) => {
                      return (
                        <li key={index} className='Flex J-C-S-B A-I-C F-F-R-N'>
                          <div>&#x2022;</div>
                          <div>{item.name}</div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className='HR-Container Flex J-C-C A-I-C fill-width'>
                    <hr/>
                  </div>
                </section>
                <section className='Product_Details Grid'>
                  <div className='Product_Options Flex J-C-F-E A-I-C F-F-C-N'>
                    <header className='fill-width Product_Total Flex J-C-C A-I-C F-F-C-N A-S-C'>
                      <h2 className='fill-height fill-width error-300'>{t('productPage.total')} <span
                        className='font-weight_900'>{totalPrice}$</span></h2>
                    </header>
                    <div className='Wrapper fill-width Flex J-C-f-S A-I-F-E F-F-R-N'>
                      <div className='Options'>
                        <select value={selectValue}
                                onChange={(e) => {
                                  setSelectValue(e.target.value);
                                  product.selectedOption = e.target.value ? e.target.value : product.options[0];
                                }}
                                onBlur={(e) => {
                                  setSelectValue(e.target.value);
                                  product.selectedOption = e.target.value ? e.target.value : product.options[0];
                                }}>
                          {product.options && product.options.map((option) => {
                            return (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className='Quantity_Change Flex J-C-C A-I-C F-F-R-N'>
                        <button onClick={decrement} type='button'
                                className='button button-primary button-icon'>
                          <Animation type='rotate-360' onHover={true} onClick={true} infinite={false}>
                            <FontAwesomeIcon icon={faMinus}/>
                          </Animation>
                        </button>
                        <p id='quantity' className='Flex J-C-C A-I-C T-C'>
                          {quantity}
                        </p>
                        <button onClick={increment} type='button'
                                className='button button-primary button-icon'>
                          <Animation type='rotate-360' onHover={true} onClick={true} infinite={false}>
                            <FontAwesomeIcon icon={faPlus}/>
                          </Animation>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`Flex ${(768 < width && width < 992) ? 'J-C-F-S' : 'J-C-C'} A-I-F-E fill-width fill-height`}>
                    <Animation type='bounce' onHover={true} onClick={true} infinite={false}>
                      <button className='button button-primary button-small'
                              onClick={() => context.addProductToCart(product)}>
                        {t('productPage.addToCart')}
                      </button>
                    </Animation>
                  </div>
                </section>
              </section>
            </section>
            <section className='BottomBlock Grid'>
              <header className='T-C'>
                <h2>{t('productPage.similar')}</h2>
              </header>
              <ul className={`Products_List Flex ${width > 991 ? 'J-C-S-B' : 'J-C-S-A'} F-F-R-W`}>
                {similarProducts && similarProducts.map((similar) => {
                  const isDiscounted = Number.parseInt(similar.discount) > 0;
                  return (
                    <li key={similar.id} className='similarProductImageContainer'>
                      <Link to={location.pathname.substr(0, location.pathname.lastIndexOf('/')) + '/' + similar.id}>
                        <Card className='Grid' backType='gray'>
                          <Overlay src={similar.imgSrc} alt={similar.imgDescription} imageType='similarProduct'>
                            <h3 className='h3-size'>{similar.name}</h3>
                          </Overlay>
                          <div className='Product-Info Grid fill-height'>
                            <h4 className='Product-Name Flex F-F-C-N T-C font-weight_700 fill-width'>
                              {similar.name}
                            </h4>
                            <div className='Product-Price Flex F-F-C-N J-C-F-E T-C fill-width'>
                              <p className='Price-Discount font-weight_600 h4-size error-300 fill-width'>
                                {isDiscounted ? t('productsList.priceDiscounted', {price: product.price * (100 - product.discount) / 100}) : t('productsList.price', {price: product.price})}
                              </p>
                              {isDiscounted ?
                                <p
                                  className='Price font-weight_200 helper crossed fill-width'>
                                  {isDiscounted ? t('productsList.oldPrice', {price: product.price}) : null}
                                </p>
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
        </LoadingOverlay>}
    </CartContext.Consumer>
  );
}
