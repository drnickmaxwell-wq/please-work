import styles from './LuxeKeyList.module.css';

export type LuxeKeyListProps = {
  items: string[];
};

const LuxeKeyList = ({ items }: LuxeKeyListProps) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default LuxeKeyList;
