import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import {timer} from "rxjs";

export const InputTooltip = ({tooltipText, tooltipClassName, tooltipId}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [swing, setSwing] = useState(false);

  InputTooltip.propTypes = {
    tooltipText: PropTypes.string.isRequired,
    tooltipId: PropTypes.string.isRequired
  };

  InputTooltip.defaultProps = {
    tooltipClassName: '',
    tooltipText: 'This is a tooltip'
  };

  return (
    <React.Fragment>
      <OverlayTrigger
        trigger="click"
        placement='right'
        className={'Input-Tooltip ' + tooltipClassName}
        overlay={
          <Popover id={tooltipId}>
            <Popover.Title as="h3">{tooltipId}</Popover.Title>
            <Popover.Content>
              {tooltipText}
            </Popover.Content>
          </Popover>
        } target={target.current}>
        <button className='button-primary Input-TooltipButton Icon-Tooltip' ref={target}
                onClick={() => setShow(!show)}
                onMouseEnter={() => {
                  timer(100).subscribe(() => setSwing(true));
                }}
                onMouseLeave={() => {
                  timer(600).subscribe(() => setSwing(false));
                }}
                type='button'>
          <img src='http://localhost:3000/img/icons/question.svg' alt='Question mark'
               className={'icon ' + (swing ? 'Rotation' : '')}/>
        </button>
      </OverlayTrigger>
    </React.Fragment>);
};
