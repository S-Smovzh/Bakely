import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { timer } from 'rxjs';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import i18n from 'i18next';

export const LoadingFallback = () => {
  const [loading, setLoading] = useState(true);
  const [ t ] = useTranslation();
  const history = useHistory();

  useEffect(() => {
    timer(5000).subscribe(() => {
      setLoading(false);
      history.push({ pathname: `/${i18n.language}/` });
    });
  }, []);

  return (
    <LoadingOverlay
      active={loading}
      text={t('overlay.loading')}
    />
  );
};
