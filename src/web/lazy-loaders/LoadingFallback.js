import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';

export const LoadingFallback = () => {
  const [ t ] = useTranslation();

  return <LoadingOverlay active text={t('overlay.loading')}/>;
};
