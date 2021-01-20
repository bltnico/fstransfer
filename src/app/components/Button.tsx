import cx from 'classnames';

import styles from 'app/components/Button.module.css';

interface Props {
  label: string;
  className: string | null;
  gradient: boolean;
  onClick: () => void;
};

const Button = ({
  label,
  gradient,
  className,
  onClick,
}: Props) => {
  const stylesheet = cx(styles.button, {
    [styles.gradient]: gradient,
    [className as string]: !!className,
  });

  return (
    <button
      className={stylesheet}
      onClick={onClick}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  className: null,
  gradient: false,
};

export default Button;