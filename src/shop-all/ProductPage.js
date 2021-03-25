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

export default function ProductPage(props) {
  const [ingredients, setIngredients] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [maxPerOrder, setMaxPerOrder] = useState(new Map([]));
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const {modal, setModal} = useContext(ModalContext);
  const location = useLocation();
  const [t] = useTranslation();

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
          <div className='Product_Page Nunito'>
            <section className='MiddleBlock'>
              <section className='Col_First'>
                <Picture src={product.imgSrc} alt={product.imgDescription} imgClassName='picture productImage'/>
                <p className='hint fill-width'>
                  {t('productPage.orders')}
                </p>
                <p className='hint fill-width'>
                  <Link to='/delivery'>{t('productPage.deliveryInfo')}</Link>
                </p>
                <p className='hint fill-width'>
                  <Link to='/contact-us'>{t('productPage.contactUs')}</Link>
                </p>
              </section>
              <section className='Col_Second'>
                <section className='Product_Info'>
                  <header className='Product_Name Playfair'>
                    <h1>{product.name}</h1>
                  </header>
                  <div className='Product_Description'>
                    <p className='font-weight_400'>{product.description}</p>
                  </div>
                </section>
                <section className='Product_Ingredients'>
                  <h3>
                    {t('productPage.ingredients')}
                  </h3>
                  <ul className='Ingredients_List fill-width'>
                    {ingredients.map((item, index) => {
                      return (
                        <li key={index}>
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                  <div className='HR-Container fill-width'>
                    <hr/>
                  </div>
                </section>
                <section className='Product_Details'>
                  <div className='Product_Options'>
                    <header className='fill-width Product_Total'>
                      <h2 className='fill-height fill-width error-300'>{t('productPage.total')} <span
                        className='font-weight_900'>{totalPrice}$</span></h2>
                    </header>
                    <div className='Wrapper'>
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
                      <div className='Quantity_Change'>
                        <button onClick={decrement} type='button'
                                className='button button-primary button-icon-footer'>
                          <Animation type='rotate-360' onHover={true} onClick={true} infinite={false}>
                            <FontAwesomeIcon icon={faMinus}/>
                          </Animation>
                        </button>
                        <p id='quantity'>
                          {quantity}
                        </p>
                        <button onClick={increment} type='button'
                                className='button button-primary button-icon-footer'>
                          <Animation type='rotate-360' onHover={true} onClick={true} infinite={false}>
                            <FontAwesomeIcon icon={faPlus}/>
                          </Animation>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='Add_To_Cart_Button fill-width fill-height'>
                    <Animation type='bounce' onHover={true} onClick={true} infinite={false}>
                      <button className='button button-primary button-small-x-wide'
                              onClick={() => context.addProductToCart(product)}>
                        {t('productPage.addToCart')}
                      </button>
                    </Animation>
                  </div>
                </section>
              </section>
            </section>
            <section className='BottomBlock'>
              <div className='Products_Similar'>
                <header>
                  <h2>{t('productPage.similar')}</h2>
                </header>
                <ul className='Products_List'>
                  {similarProducts && similarProducts.map((similar) => {
                    const isDiscounted = Number.parseInt(similar.discount) > 0;
                    return (
                      <li key={similar.id} className='similarProductImageContainer'>
                        <Link to={location.pathname.substr(0, location.pathname.lastIndexOf('/')) + '/' + similar.id}
                              className='product-info'>
                          <Card backType='gray'>
                            <Overlay src={similar.imgSrc} alt={similar.imgDescription} imageType='similarProduct'>
                              <h3 className='h3-size'>{similar.name}</h3>
                            </Overlay>
                            <div className='Product-Info fill-height'>
                              <p className='Product-Name font-weight_700 helper fill-width'>{similar.name}</p>
                              <div className='Product-Price fill-width'>
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
              </div>
            </section>
          </div>
        </LoadingOverlay>}
    </CartContext.Consumer>
  );
}
