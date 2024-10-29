import Image from "next/image";
import styles from "./page.module.css";
import Notification from "@/components/notification";
import SendNotification from "@/components/SendNotification";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src='https://nextjs.org/icons/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <Notification />
          <SendNotification />
        </div>
      </main>
    </div>
  );
}
