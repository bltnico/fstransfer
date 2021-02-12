import cx from 'classnames';

import styles from 'app/components/Button.module.css';

interface Props {
  label: string;
  className: string | null;
  gradient: boolean;
  cancel: boolean;
  disabled: boolean;
  onClick: () => void;
};

const Button = ({
  label,
  gradient,
  cancel,
  disabled,
  className,
  onClick,
}: Props) => {
  const stylesheet = cx(styles.button, {
    [styles.gradient]: gradient,
    [styles.cancel]: cancel,
    [className as string]: !!className,
  });

  return (
    <button
      className={stylesheet}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  className: null,
  gradient: false,
  cancel: false,
  disabled: false,
};

export default Button;
