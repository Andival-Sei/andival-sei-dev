import Link from 'next/link';
import ModeToggle from './mode-toggle';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Andival Sei Dev</div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Главная
        </Link>
        <Link href="/" className={styles.navLink}>
          Проекты
        </Link>
        <Link href="/" className={styles.navLink}>
          Контакты
        </Link>
      </nav>
      <ModeToggle />
    </header>
  );
}
