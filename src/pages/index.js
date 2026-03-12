import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";

export default function Home() {
<<<<<<< HEAD

=======
>>>>>>> 61e4fb17add6fcc31192ac3eeb8059863a9e8c19
  return (
    <Layout
      title="Tài liệu về KYPO Cyber Range"
      description="Tài liệu nền tảng KYPO Cyber Range"
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <h1>Tài liệu về KYPO Cyber Range</h1>
          <p>
            Nền tảng cyber range mã nguồn mở phục vụ đào tạo an ninh mạng, thực
            hành phòng thủ - tấn công và nghiên cứu.
          </p>
<<<<<<< HEAD

=======
>>>>>>> 61e4fb17add6fcc31192ac3eeb8059863a9e8c19
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/overview"
            >
              Bắt đầu
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <h2>Mục đích sử dụng</h2>

          <div className={styles.grid}>
<<<<<<< HEAD

            <div>
              <h3>🎓 Đào tạo đại học</h3>
              <p>
                Các trường đại học có thể xây dựng phòng lab an ninh mạng,
                nơi sinh viên thực hành các kịch bản tấn công và phòng thủ.
=======
            <div>
              <h3>Đào tạo đại học</h3>
              <p>
                Các trường đại học có thể xây dựng phòng lab an ninh mạng, nơi
                sinh viên thực hành các kịch bản tấn công và phòng thủ trong môi
                trường mô phỏng thực tế.
>>>>>>> 61e4fb17add6fcc31192ac3eeb8059863a9e8c19
              </p>
            </div>

            <div>
<<<<<<< HEAD
              <h3>🏢 Đào tạo chuyên nghiệp</h3>
              <p>
                Các tổ chức có thể huấn luyện chuyên gia an ninh mạng thông qua
                các mô phỏng sát với mối đe dọa thực tế.
=======
              <h3>Đào tạo chuyên nghiệp</h3>
              <p>
                Các tổ chức có thể huấn luyện chuyên gia an ninh mạng thông qua
                các mô phỏng sát với các mối đe dọa thực tế.
>>>>>>> 61e4fb17add6fcc31192ac3eeb8059863a9e8c19
              </p>
            </div>

            <div>
<<<<<<< HEAD
              <h3>🌍 Cộng đồng</h3>
              <p>
                Các kịch bản huấn luyện có thể được chia sẻ và tái sử dụng,
                giúp cộng đồng cùng phát triển các bài tập.
              </p>
            </div>

=======
              <h3>Cộng đồng</h3>
              <p>
                Các kịch bản huấn luyện có thể được chia sẻ và tái sử dụng, giúp
                cộng đồng cùng phát triển và cải thiện các bài tập.
              </p>
            </div>
>>>>>>> 61e4fb17add6fcc31192ac3eeb8059863a9e8c19
          </div>
        </section>

        <section className={styles.sectionDark}>
          <h2>KYPO hoạt động như thế nào</h2>

<<<<<<< HEAD
          <div className={styles.flow}>

            <div className={styles.flowItem}>
              <h3>☁️ Nền tảng Cloud</h3>
              <p>
                KYPO là một nền tảng cyber range chạy trên hạ tầng cloud,
                được thiết kế cho đào tạo và nghiên cứu an ninh mạng.
              </p>
            </div>

            <div className={styles.flowItem}>
              <h3>🖥 Môi trường mô phỏng</h3>
              <p>
                Hệ thống tạo ra các môi trường ảo hóa tách biệt để triển khai
                các hệ thống mạng phức tạp mô phỏng các tình huống an ninh thực tế.
              </p>
            </div>

            <div className={styles.flowItem}>
              <h3>🌐 Giao diện Web</h3>
              <p>
                Người dùng truy cập hệ thống thông qua giao diện web,
                trong khi hạ tầng phía dưới được quản lý bằng OpenStack.
              </p>
            </div>

          </div>
=======
          <p className={styles.textCenter}>
            KYPO là một nền tảng cyber range chạy trên nền tảng cloud, được
            thiết kế cho đào tạo và nghiên cứu an ninh mạng.
          </p>

          <p className={styles.textCenter}>
            Nền tảng tạo ra các môi trường ảo hóa tách biệt, nơi có thể triển
            khai các hệ thống mạng phức tạp để mô phỏng các tình huống an ninh
            thực tế.
          </p>

          <p className={styles.textCenter}>
            Người dùng truy cập hệ thống thông qua giao diện web, trong khi hạ
            tầng phía dưới được quản lý bằng OpenStack.
          </p>
>>>>>>> 61e4fb17add6fcc31192ac3eeb8059863a9e8c19
        </section>
      </main>
    </Layout>
  );
}