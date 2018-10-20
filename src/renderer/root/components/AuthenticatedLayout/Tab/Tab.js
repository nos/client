import React from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { bool, number, string, func, oneOf } from 'prop-types';
import { noop } from 'lodash';

import Icon from 'shared/components/Icon';
import { INTERNAL, EXTERNAL } from 'browser/values/browserValues';

import FavIcon from '../FavIcon';
import styles from './Tab.scss';

// const DRAGGABLE_TYPE_TAB = 'TAB';

export default class Tab extends React.PureComponent {
  static propTypes = {
    className: string,
    sessionId: string.isRequired,
    title: string.isRequired,
    type: oneOf([INTERNAL, EXTERNAL]).isRequired,
    position: number.isRequired,
    active: bool,
    icon: string,
    loading: bool,
    onClick: func,
    onClose: func
  };

  static defaultProps = {
    className: null,
    active: false,
    icon: null,
    loading: false,
    onClick: noop,
    onClose: noop
  };

  render() {
    const { className, sessionId, title, position, active, onClick } = this.props;

    return (
      <Draggable draggableId={sessionId} index={position}>
        {/* type={DRAGGABLE_TYPE_TAB} */}
        {(provided, _snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames(className, styles.tab, { [styles.active]: active })}
            role="button"
            tabIndex={0}
            onClick={onClick}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.renderIcon()}
            <span className={styles.title}>{title}</span>
            <button type="button" className={styles.close} onClick={this.handleClose}>
              <span className={styles.closeContent}>
                <Icon name="close" />
              </span>
            </button>
          </div>
        )}
      </Draggable>
    );
  }

  renderIcon = () => {
    const { loading, icon, title, type } = this.props;

    if (loading) {
      return <Icon className={styles.loading} name="spin" />;
    } else {
      return <FavIcon className={styles.icon} icon={icon} type={type} title={title} />;
    }
  }

  handleClose = (event) => {
    event.stopPropagation();
    this.props.onClose();
  }
}
