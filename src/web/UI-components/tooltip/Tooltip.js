import React, { useRef, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { timer } from 'rxjs';
import question from '../../../assets/images/icons/question.svg';
import { Animation } from '../animation/Animation';
import { Button } from '../button/Button';

export const InputTooltip = ({ overlayPlacement, tooltipClassName, tooltipId, tooltipText }) => {
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
  const [ t ] = useTranslation();
  const target = useRef(null);
  const ref = useRef(null);

  const PopoverC = React.forwardRef(
    // eslint-disable-next-line react/prop-types
    ({ popper, tooltipId, tooltipText, children, show: _, ...props }, ref) => {
      return (
        <Popover id={tooltipId} ref={ref} content
          {...props}>
          <Popover.Title as="h3">{tooltipId}</Popover.Title>
          <Popover.Content>
            {tooltipText}
            {children}
          </Popover.Content>
        </Popover>
      );
    },
  );

  return (
    <React.Fragment>
      <OverlayTrigger
        trigger="click"
        placement={overlayPlacement}
        className={tooltipClassName}
        overlay={(
          <PopoverC tooltipId={tooltipId} tooltipText={tooltipText}/>
        )} target={target.current} defaultShow={false}
        show={show}>
        <Button ariaLabel={t('button.tooltip')} className="Btn-P I-T Icon-Tooltip" ref={target}
          onClick={() => setShow(!show)}
          onMouseEnter={() => {
                  timer(100).subscribe(() => setSwing(true));
                }}
          onMouseLeave={() => {
                  timer(600).subscribe(() => setSwing(false));
                }}
          type="button">
          <Animation className="Flex J-C-C A-I-C F-W F-H" type="wiggle" onHover
            onClick active={swing}>
            <img src={question} alt=""
              className={`Icon ${(swing ? 'Rotation' : '')}`}
            />
          </Animation>
        </Button>
      </OverlayTrigger>
    </React.Fragment>
  );
};
