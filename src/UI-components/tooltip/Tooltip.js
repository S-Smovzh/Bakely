import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import {timer} from "rxjs";
import {Animation} from "../../animation/Animation";
import {Button} from "../button/Button";
import {useTranslation} from "react-i18next";

export const InputTooltip = ({overlayPlacement, tooltipClassName, tooltipId, tooltipText}) => {
  InputTooltip.propTypes = {
    overlayPlacement: PropTypes.string.isRequired,
    tooltipClassName: PropTypes.string,
    tooltipId: PropTypes.string.isRequired,
    tooltipText: PropTypes.string.isRequired
  };

  InputTooltip.defaultProps = {
    overlayPlacement: 'right',
    tooltipClassName: '',
    tooltipId: '',
    tooltipText: 'This is a tooltip'
  };

  const [show, setShow] = useState(false);
  const [swing, setSwing] = useState(false);
  const [t] = useTranslation();
  const target = useRef(null);

  return (
    <React.Fragment>
      <OverlayTrigger
        trigger="click"
        placement={overlayPlacement}
        className={tooltipClassName}
        overlay={
          <Popover id={tooltipId}>
            <Popover.Title as="h3">{tooltipId}</Popover.Title>
            <Popover.Content>
              {tooltipText}
            </Popover.Content>
          </Popover>
        } target={target.current} defaultShow={false} show={show}>
        <Button ariaLabel={t('button.tooltip')} className='button-primary Input-Tooltip Icon-Tooltip' ref={target}
                onClick={() => setShow(!show)}
                onMouseEnter={() => {
                  timer(100).subscribe(() => setSwing(true));
                }}
                onMouseLeave={() => {
                  timer(600).subscribe(() => setSwing(false));
                }}
                type='button'>
          <Animation className='Flex J-C-C A-I-C fill-width fill-height' type='wiggle' onHover={true} onClick={true} active={swing}>
            <img src='http://localhost:3000/img/icons/question.svg' alt=''
                 className={`icon ${(swing ? 'Rotation' : '')}`}/>
          </Animation>
        </Button>
      </OverlayTrigger>
    </React.Fragment>);
};
