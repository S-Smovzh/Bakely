import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timer } from 'rxjs';
import axios from 'axios';
import ConfirmButton from '../../UI-components/button/ConfirmButton';
import { ModalContext } from '../../context/modal/ModalContext';
import { Input } from '../../UI-components/input/Input';
import { userConfig } from '../../utils/restApiConfigs';
import { Form } from '../../UI-components/form/Form';
import errorHandler from '../../utils/errorHandler';
import { logError } from '../../error/errorHandler';
import { userLinks } from '../../utils/restLinks';
import { masks } from '../../utils/inputMasks';

export const TelNumChangeForm = () => {
  const [ t ] = useTranslation();

  const [animateTelNumChange, setAnimateTelNumChange] = useState(false);
  const [telNumChangeSuccess, setTelNumChangeSuccess] = useState(false);
  const [oldTelNum, setOldTelNum] = useState('');
  const [newTelNum, setNewTelNum] = useState('');
  const [oldTelNumError, setOldTelNumError] = useState('');
  const [newTelNumError, setNewTelNumError] = useState('');
  const [oldTelNumPrefix, setOldTelNumPrefix] = useState('+38 ');
  const [newTelNumPrefix, setNewTelNumPrefix] = useState('+38 ');

  const { modal, setModal } = useContext(ModalContext);

  function telNumChange() {
    axios.post(userLinks.changeTelNum,
      {
        oldTelNum: oldTelNumPrefix + oldTelNum,
        newTelNum: newTelNumPrefix + newTelNum
      }, userConfig
    ).then((response) => {
      const { success, errors } = response.data;

      if (!success && errors) {
        setAnimateTelNumChange(true);
        timer(400).subscribe(() => setAnimateTelNumChange(false));
        if (errors.code === 500 || errors.code === 600) {
          setModal({
            ...modal,
            internalError: true,
            errorCode: errors.code
          });
        } else if (errors.code === 10) {
          setOldTelNumError(errorHandler(errors.code));
          setNewTelNumError(errorHandler(errors.code));
        } else {
          if (errors.oldTelNum) {
            setOldTelNumError(errorHandler(errors.oldTelNum));
          } else {
            setOldTelNumError('');
          }
          if (errors.newTelNum) {
            setNewTelNumError(errorHandler(errors.newTelNum));
          } else {
            setNewTelNumError('');
          }
        }
      } else {
        setTelNumChangeSuccess(true);
        setTimeout(() => {
          setTelNumChangeSuccess(false);
        }, 400);
        setOldTelNum('');
        setNewTelNum('');
        setOldTelNumError('');
        setNewTelNumError('');
      }
    }).catch((error) => logError(error));
  }

  return (
    <Form success={telNumChangeSuccess}>
      <div className="Form-R">
        <Input errorIdentifier={oldTelNumError} labelText={t('label.oldTelNum')}
          errorLabelText={oldTelNumError} value={oldTelNum}
          inputId="oldTelNum" inputType="tel" inputName="oldTelNum"
          inputOnBlur={(event) => setOldTelNum(event.target.value)}
          inputOnChange={(event) => setOldTelNum(event.target.value)} inputRequired="required"
          autoComplete="off" selectOnChange={(evKey) => setOldTelNumPrefix(evKey)}
          selectValue={oldTelNumPrefix}
          tooltipId={t('tooltip.header.oldTel')} tooltipText={t('tooltip.oldTel')}
          mask={masks.tel}
        />
      </div>
      <div className="Form-R">
        <Input errorIdentifier={newTelNumError} labelText={t('label.newTelNum')}
          errorLabelText={newTelNumError} value={newTelNum}
          inputId="newTelNum" inputType="tel" inputName="newTelNum"
          inputOnBlur={(event) => setNewTelNum(event.target.value)}
          inputOnChange={(event) => setNewTelNum(event.target.value)}
          selectOnChange={(evKey) => setNewTelNumPrefix(evKey)} selectValue={newTelNumPrefix}
          inputRequired="required" autoComplete="off" tooltipId={t('tooltip.header.tel')}
          tooltipText={t('tooltip.telNumOrHouseOrFlatNum')} mask={masks.tel}
        />
      </div>
      <div className="Form-B">
        <ConfirmButton onClick={() => telNumChange()} disabled={!oldTelNum || !newTelNum}
          error={animateTelNumChange} className="Btn-Sm-X-W" text={t('button.submit')}
        />
      </div>
    </Form>
  );
};
