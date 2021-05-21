import React from 'react';
import { withTranslation } from 'react-i18next';
import error from '../../assets/images/svg/internal-error.svg';
import { Animation } from '../UI-components/animation/Animation';
import { logError } from './errorHandler';
import Head from '../head/Head';
import './Error.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.log(JSON.stringify(error), JSON.stringify(errorInfo));
    logError(JSON.stringify({ error, errorInfo }));
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <div className="Error-Page Grid">
          <Head title={t('errorBoundary.seo.title')} description={t('errorBoundary.seo.description')}/>
          <header className="B-T T-C Flex J-C-C A-I-C F-F-C-N">
            <h1>
              {t('errorBoundary.header')}
            </h1>
          </header>
          <div className="B-M Nunito Flex J-C-S-A A-I-C F-F-C-N">
            <img src={error} alt="" className="categoryImageContainer"/>
            <Animation type="rubber" onHover onClick
              infinite={false}>
              {/* eslint-disable-next-line react/prop-types */}
              <button onClick={this.props.handleReturn} type="button" className="Btn-Su Btn-Sm-X-W">
                {t('error.button')}
              </button>
            </Animation>
          </div>
        </div>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
