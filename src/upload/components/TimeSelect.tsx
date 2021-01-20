import { useCallback, useMemo, useState } from 'react';

import Button from 'app/components/Button';

import styles from 'upload/components/TimeSelect.module.css';

const TIMES = [
  { label: '1 hour', value: '1h' },
  { label: '1 day', value: '1d' },
  { label: '1 week', value: '1w' },
];

const TimeSelect = () => {
  const [time, setTime] = useState(TIMES[0]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleSelect = useCallback(() => {
    setOpen(prevState => !prevState);
  }, []);

  const handleChoices = useCallback((t) => () => {
    setTime(t);
    setOpen(false);
  }, []);

  const renderChoices = useMemo(() => TIMES.map((t) => (
    <li
      key={t.label}
      onClick={handleChoices(t)}>
      {t.label}
    </li>
  )), [handleChoices]);

  const renderSelect = useMemo(() => (
    <>
      {open && (
        <div
          onClick={toggleSelect}
          className={styles.overlay} />
      )}
      <div className={`${styles.selectContainer} ${open && styles.open}`}>
        <ul className={styles.list}>
          <li>Select duration</li>
          {renderChoices}
        </ul>
      </div>
    </>
  ), [open, renderChoices, toggleSelect]);

  return (
    <>
      <Button
        className={styles.disabled}
        onClick={toggleSelect}
        label={`Expire in ${time.label}`} />
      {renderSelect}
    </>
  );
};

export default TimeSelect;