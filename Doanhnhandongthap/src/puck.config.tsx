import type { Config } from "@puckeditor/core";
import Hero, { type HeroProps } from "./blocks/Hero/Hero";
import SponsorBar, { type SponsorBarProps } from "./blocks/SponsorBar/SponsorBar";
import AboutSection, { type AboutSectionProps } from "./blocks/AboutSection/AboutSection";
import TeamsSection, { type TeamsSectionProps } from "./blocks/TeamsSection/TeamsSection";
import StatsSection, { type StatsSectionProps } from "./blocks/StatsSection/StatsSection";
import NewsSection, { type NewsSectionProps } from "./blocks/NewsSection/NewsSection";
import ValuesSection, {type ValuesSectionProps} from "./blocks/ValuesSection/ValuesSection";
import ContactCta, { type ContactCtaProps } from "./blocks/ContactCta/ContactCta";
import { alignmentField } from "./blocks/shared/alignment";
import { buttonStyleField } from "./blocks/shared/buttonStyle";
import { cardStyleField } from "./blocks/shared/cardStyle";
import { spacingField } from "./blocks/shared/spacing";

// Field shared tái sử dụng cho mọi section, đừng hardcode className cho các thứ sau:
// background (màu/gradient/ảnh/gif), alignment (căn chỉnh), buttonStyle (nút), cardStyle (thẻ), spacing (padding).
// Mọi block mới (ValuesSection, ContactCta, ...) nên dùng lại các field này + helper tương ứng trong src/blocks/shared/.
const backgroundField = {
  type: "object" as const,
  label: "Nền",
  objectFields: {
    type: {
      type: "select" as const,
      label: "Loại nền",
      options: [
        { label: "Màu", value: "color" },
        { label: "Gradient", value: "gradient" },
        { label: "Hình ảnh", value: "image" },
        { label: "GIF", value: "gif" },
      ],
    },
    color: { type: "text" as const, label: "Màu nền" },
    gradientFrom: { type: "text" as const, label: "Gradient từ" },
    gradientTo: { type: "text" as const, label: "Gradient đến" },
    gradientDirection: { type: "text" as const, label: "Hướng gradient (vd: to bottom)" },
    imageUrl: { type: "text" as const, label: "URL ảnh nền" },
    gifUrl: { type: "text" as const, label: "URL GIF nền" },
    opacity: { type: "number" as const, label: "Độ mờ", min: 0, max: 1, step: 0.1 },
    overlayUrl: { type: "text" as const, label: "URL ảnh/GIF phủ lên nền" },
    overlayBlendMode: { type: "text" as const, label: "Kiểu trộn màu (vd: screen)" },
  },
};

export type Props = {
  Hero: HeroProps;
  SponsorBar: SponsorBarProps;
  AboutSection: AboutSectionProps;
  TeamsSection: TeamsSectionProps;
  StatsSection: StatsSectionProps;
  NewsSection: NewsSectionProps;
  ValuesSection: ValuesSectionProps;
  ContactCta: ContactCtaProps;
};

// Config — đăng ký components với label + fields + defaultProps + render.
export const puckConfig: Config<Props> = {
  components: {
    Hero: {
      label: "Hero Banner",
      fields: {
        subtitle: { type: "text", label: "Nhãn phụ" },
        title: { type: "text", label: "Tiêu đề" },
        description: { type: "richtext", label: "Mô tả" },
        ctaTargetId: { type: "text", label: "ID khu vực cuộn tới" },
        background: backgroundField,
        card: {
          type: "object",
          label: "Cụm thẻ Sen Hồng",
          objectFields: {
            position: {
              type: "select",
              label: "Vị trí cụm",
              options: [
                { label: "Bên trái", value: "left" },
                { label: "Giữa", value: "center" },
                { label: "Bên phải", value: "right" },
              ],
            },
            radiusTopLeft: { type: "text", label: "Bo góc trên-trái" },
            radiusTopRight: { type: "text", label: "Bo góc trên-phải" },
            radiusBottomRight: { type: "text", label: "Bo góc dưới-phải" },
            radiusBottomLeft: { type: "text", label: "Bo góc dưới-trái" },
            textColor: { type: "text", label: "Màu chữ mô tả" },
            fontSize: { type: "text", label: "Kích thước chữ mô tả" },
          },
        },
        button: buttonStyleField,
      },
      defaultProps: {
        subtitle: "Lan tỏa giá trị Đất",
        title: "Sen Hồng",
        description:
          "CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.",
        ctaTargetId: "lien-he",
        background: {
          type: "gradient",
          gradientFrom: "#a8dfff",
          gradientVia: "#cdeeff",
          gradientTo: "#3399ff",
          gradientDirection: "to top",
          overlayUrl: "https://webdemo.hexagon.xyz/medias/hieuunghero.webp",
          overlayBlendMode: "screen",
        },
        card: {
          position: "left",
          radiusTopLeft: "16px",
          radiusTopRight: "100px",
          radiusBottomRight: "16px",
          radiusBottomLeft: "100px",
          textColor: "rgba(255,255,255,0.8)",
          fontSize: "15px",
        },
        button: {
          label: "Tham gia cộng đồng",
          bgColor: "#0072ff",
          textColor: "#ffffff",
          borderRadius: "0 30px 0 30px",
          fontSize: "15px",
        },
      },
      render: (props) => <Hero {...props} />,
    },

    SponsorBar: {
      label: "Thanh hội viên",
      fields: {
        title: { type: "text", label: "Tiêu đề" },
        logos: {
          type: "array",
          label: "Danh sách logo",
          arrayFields: {
            imageUrl: { type: "text", label: "URL ảnh" },
            alt: { type: "text", label: "Alt text" },
            icon: { type: "textarea", label: "SVG icon (nếu không có URL)" },
            label: { type: "text", label: "Chữ thay ảnh (nếu không có URL)" },
          },
          getItemSummary: (item) => item.alt,
        },
        background: backgroundField,
        titleAlign: alignmentField,
        spacing: spacingField,
      },
      defaultProps: {
        title: "HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
        background: {
          type: "gradient",
          gradientFrom: "#a8dfff",
          gradientVia: "#cdeeff",
          gradientTo: "#e6efff",
          gradientDirection: "to bottom",
        },
        titleAlign: "center",
        spacing: { paddingY: 9 },
        logos: [
          { imageUrl: "https://webdemo.hexagon.xyz/medias/Logo Khoi E.png", alt: "Logo Khối E" },
          { imageUrl: "https://webdemo.hexagon.xyz/medias/Logo Khoi C.png", alt: "Logo Khối C" },
          { imageUrl: "https://webdemo.hexagon.xyz/medias/Logo Khoi D.png", alt: "Logo Khối D" },
          { imageUrl: "https://webdemo.hexagon.xyz/medias/Happy Food.png", alt: "Logo Happy Food" },
          {
            alt: "Logo Ecobook",
            label: "ECOBOOK",
            icon: `<svg viewBox="0 0 80 40" width="80" height="32"><path d="M 15 25 C 25 15, 38 15, 40 20 C 42 15, 55 15, 65 25 C 55 18, 42 18, 40 23 C 38 18, 25 18, 15 25 Z" fill="#22c55e" /><path d="M 18 18 C 26 10, 38 10, 40 15 C 42 10, 54 10, 62 18 C 54 12, 42 12, 40 17 C 38 12, 26 12, 18 18 Z" fill="#eab308" /><path d="M 22 11 C 28 5, 38 5, 40 10 C 42 5, 52 5, 58 11 C 52 7, 42 7, 40 12 C 38 7, 28 7, 22 11 Z" fill="#22c55e" /></svg>`,
          },
          {
            alt: "Logo Comoon",
            label: "COMOON",
            icon: `<svg viewBox="0 0 80 40" width="80" height="32"><path d="M 20 12 C 30 5, 50 5, 60 12 C 55 18, 45 18, 40 18 C 35 18, 25 18, 20 12 Z" fill="#15803d" /><path d="M 22 17 C 30 11, 50 11, 58 17 C 53 23, 47 23, 40 23 C 33 23, 27 23, 22 17 Z" fill="#eab308" /><path d="M 25 22 C 32 17, 48 17, 55 22 C 50 30, 45 32, 40 32 C 35 32, 30 30, 25 22 Z" fill="#15803d" /></svg>`,
          },
          { imageUrl: "https://webdemo.hexagon.xyz/medias/B.png", alt: "Binh Minh" },
          { imageUrl: "https://webdemo.hexagon.xyz/medias/Logo Khoi F.png", alt: "Logo Khối F" },
        ],
      },
      render: (props) => <SponsorBar {...props} />,
    },

    AboutSection: {
      label: "Giới thiệu & Cơ cấu tổ chức",
      fields: {
        leftCard: {
          type: "object",
          label: "Thẻ về CLB",
          objectFields: {
            title: { type: "text", label: "Tiêu đề" },
            text: { type: "textarea", label: "Nội dung" },
            cornerImageUrl: { type: "text", label: "URL ảnh góc" },
            veclbImageUrl: { type: "text", label: "URL ảnh vẽ nền" },
            radius: {
              type: "object",
              label: "Bo góc thẻ",
              objectFields: {
                radiusTopLeft: { type: "text", label: "Bo góc trên-trái" },
                radiusTopRight: { type: "text", label: "Bo góc trên-phải" },
                radiusBottomRight: { type: "text", label: "Bo góc dưới-phải" },
                radiusBottomLeft: { type: "text", label: "Bo góc dưới-trái" },
              },
            },
          },
        },
        rightCard: {
          type: "object",
          label: "Thẻ cơ cấu tổ chức",
          objectFields: {
            title: { type: "text", label: "Tiêu đề" },
            profiles: {
              type: "array",
              label: "Danh sách thành viên",
              arrayFields: {
                avatarUrl: { type: "text", label: "URL ảnh đại diện" },
                name: { type: "text", label: "Họ tên" },
                clbRole: { type: "text", label: "Chức vụ CLB" },
                companyRole: { type: "text", label: "Chức vụ Doanh nghiệp" },
                company: { type: "text", label: "Doanh nghiệp" },
              },
              getItemSummary: (item) => item.name,
            },
            fieldLabels: {
              type: "object",
              label: "Nhãn các trường thông tin",
              objectFields: {
                name: { type: "text", label: "Nhãn 'Họ tên'" },
                clbRole: { type: "text", label: "Nhãn 'Chức vụ CLB'" },
                companyRole: { type: "text", label: "Nhãn 'Chức vụ Doanh nghiệp'" },
                company: { type: "text", label: "Nhãn 'Doanh nghiệp'" },
              },
            },
            radius: {
              type: "object",
              label: "Bo góc thẻ",
              objectFields: {
                radiusTopLeft: { type: "text", label: "Bo góc trên-trái" },
                radiusTopRight: { type: "text", label: "Bo góc trên-phải" },
                radiusBottomRight: { type: "text", label: "Bo góc dưới-phải" },
                radiusBottomLeft: { type: "text", label: "Bo góc dưới-trái" },
              },
            },
          },
        },
        arrowButton: {
          type: "object",
          label: "Nút mũi tên slider",
          objectFields: {
            bgColor: { type: "text", label: "Màu nút" },
            textColor: { type: "text", label: "Màu chữ nút" },
            borderRadius: { type: "text", label: "Bo góc nút" },
          },
        },
        background: backgroundField,
        decorativeImageUrl: { type: "text", label: "URL ảnh hoa văn nền" },
        spacing: spacingField,
      },
      defaultProps: {
        background: {
          type: "gradient",
          gradientFrom: "#e8f4ff",
          gradientVia: "#ece6ff",
          gradientTo: "#f0e0ff",
          gradientDirection: "to bottom",
        },
        decorativeImageUrl: "https://webdemo.hexagon.xyz/medias/hoavanvct.png",
        spacing: { paddingY: 25 },
        arrowButton: {
          bgColor: "#cdeeff",
          textColor: "#0B5077",
          borderRadius: "8px",
        },
        leftCard: {
          title: "VỀ CÂU LẠC BỘ",
          text: "CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối – đồng hành – sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.",
          cornerImageUrl:
            "https://webdemo.hexagon.xyz/medias/business-man-holding-smart-device-pointing-index-finger-screen-with-dot-connection-digital-illustration 1.png",
          veclbImageUrl: "https://webdemo.hexagon.xyz/medias/veclb.png",
          radius: {
            radiusTopLeft: "0",
            radiusTopRight: "20px",
            radiusBottomRight: "20px",
            radiusBottomLeft: "0",
          },
        },
        rightCard: {
          title: "CƠ CẤU TỔ CHỨC",
          fieldLabels: {
            name: "Họ tên:",
            clbRole: "Chức vụ CLB:",
            companyRole: "Chức vụ Doanh nghiệp:",
            company: "Doanh nghiệp:",
          },
          radius: {
            radiusTopLeft: "20px",
            radiusTopRight: "0",
            radiusBottomRight: "0",
            radiusBottomLeft: "20px",
          },
          profiles: [
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2.png",
              name: "Nguyễn Thanh Hà",
              clbRole: "Chủ tịch CLB",
              companyRole: "Tổng Giám Đốc",
              company: "Công ty TNHH ABC Holdings",
            },
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2-1.png",
              name: "Lê Thị Ngọc Anh",
              clbRole: "Trưởng ban Truyền thông",
              companyRole: "Marketing Director",
              company: "Công ty CP Media Plus",
            },
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2-2.png",
              name: "Trần Minh Tuấn",
              clbRole: "Phó Chủ tịch CLB",
              companyRole: "Giám Đốc Điều hành",
              company: "Công ty TNHH XYZ Group",
            },
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2.png",
              name: "Phạm Văn Hùng",
              clbRole: "Phó Chủ tịch CLB",
              companyRole: "Chủ tịch HĐQT",
              company: "Công ty CP Đầu tư Sen Vàng",
            },
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2-1.png",
              name: "Nguyễn Thị Mai",
              clbRole: "Phó Trưởng ban Thường trực",
              companyRole: "Phó Tổng Giám Đốc",
              company: "Công ty TNHH May mặc Đồng Tháp",
            },
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2-2.png",
              name: "Hoàng Minh Đức",
              clbRole: "Ủy viên Ban Chấp hành",
              companyRole: "Giám Đốc Phát triển",
              company: "Tập Đoàn Nông nghiệp Hitech",
            },
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2.png",
              name: "Trần Văn Khang",
              clbRole: "Ủy viên BCH",
              companyRole: "Tổng Giám Đốc",
              company: "Công ty CP Logistics Đồng Tháp",
            },
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2-1.png",
              name: "Đỗ Thu Trang",
              clbRole: "Thủ quỹ CLB",
              companyRole: "Giám Đốc Tài chính",
              company: "Công ty TNHH Sen Việt",
            },
            {
              avatarUrl: "https://webdemo.hexagon.xyz/medias/Ellipse 2-2.png",
              name: "Vũ Hoàng Long",
              clbRole: "Ủy viên BCH",
              companyRole: "Giám Đốc Điều hành",
              company: "Công ty Công nghệ số Mekong",
            },
          ],
        },
      },
      render: (props) => <AboutSection {...props} />,
    },

    TeamsSection: {
      label: "Các ban chuyên môn",
      fields: {
        title: { type: "text", label: "Tiêu đề" },
        subtitle: { type: "text", label: "Tiêu đề phụ" },
        teams: {
          type: "array",
          label: "Danh sách ban",
          arrayFields: {
            iconUrl: { type: "text", label: "URL icon" },
            alt: { type: "text", label: "Alt text" },
            title: { type: "text", label: "Tên ban" },
          },
          getItemSummary: (item) => item.title,
        },
        background: backgroundField,
        titleAlign: alignmentField,
        cardStyle: cardStyleField,
        button: buttonStyleField,
        spacing: spacingField,
      },
      defaultProps: {
        title: "CÁC BAN CHUYÊN MÔN",
        subtitle: "CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
        background: {
          type: "gradient",
          gradientFrom: "#f0e0ff",
          gradientVia: "#dce8ff",
          gradientTo: "#d4e0ff",
          gradientDirection: "to bottom",
        },
        titleAlign: "center",
        spacing: { paddingY: 25 },
        cardStyle: {
          borderRadius: "80px 0",
          textColor: "#ffffff",
          fontSize: "19px",
        },
        button: {
          label: "Xem hoạt động",
          bgColor: "rgba(255,255,255,0.15)",
          textColor: "#ffffff",
          borderRadius: "30px",
          fontSize: "13px",
        },
        teams: [
          {
            iconUrl: "https://webdemo.hexagon.xyz/medias/economy 1-2.png",
            alt: "Kinh tế",
            title: "Ban Kinh tế - Đầu tư",
          },
          {
            iconUrl: "https://webdemo.hexagon.xyz/medias/economy 1.png",
            alt: "Văn hóa",
            title: "Ban Văn hóa - Thể thao",
          },
          {
            iconUrl: "https://webdemo.hexagon.xyz/medias/economy 1-1.png",
            alt: "Xã hội",
            title: "Ban Xã hội - Cộng đồng",
          },
          {
            iconUrl: "https://webdemo.hexagon.xyz/medias/Rectangle 4007.png",
            alt: "Khởi nghiệp",
            title: "Ban Khởi nghiệp",
          },
          {
            iconUrl: "https://webdemo.hexagon.xyz/medias/Rectangle 4008.png",
            alt: "Giao thương",
            title: "Ban Giao thương quốc tế",
          },
        ],
      },
      render: (props) => <TeamsSection {...props} />,
    },

    StatsSection: {
      label: "Hành trình kiến tạo",
      fields: {
        title: { type: "text", label: "Tiêu đề" },
        bgLoopUrl: { type: "text", label: "URL ảnh hoa văn nền" },
        stats: {
          type: "array",
          label: "Danh sách số liệu",
          arrayFields: {
            number: { type: "text", label: "Số liệu" },
            desc: { type: "textarea", label: "Mô tả" },
          },
          getItemSummary: (item) => item.number,
        },
        background: backgroundField,
        titleAlign: alignmentField,
        spacing: spacingField,
      },
      defaultProps: {
        title: "HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ",
        bgLoopUrl: "https://webdemo.hexagon.xyz/medias/hoa.webp",
        background: {
          type: "gradient",
          gradientFrom: "#d4e0ff",
          gradientVia: "#e8d8ff",
          gradientTo: "#f5e0f8",
          gradientDirection: "to bottom",
        },
        titleAlign: "center",
        spacing: { paddingY: 27.5 },
        stats: [
          { number: "500+", desc: "Hội viên là các doanh nghiệp và doanh nhân tiêu biểu tại TP.HCM" },
          { number: "20+", desc: "Năm hình thành và phát triển mạng lưới kết nối đồng hương" },
          { number: "1.000+", desc: "Cơ hội giao thương và kết nối đầu tư được khởi tạo mỗi năm" },
          { number: "100+", desc: "Chương trình thiện nguyện và hoạt động hướng về quê hương" },
        ],
      },
      render: (props) => <StatsSection {...props} />,
    },

    NewsSection: {
      label: "Tin tức & sự kiện",
      fields: {
        title: { type: "text", label: "Tiêu đề" },
        viewMoreLabel: { type: "text", label: "Chữ xem thêm" },
        cards: {
          type: "array",
          label: "Danh sách bài viết",
          arrayFields: {
            imageUrl: { type: "text", label: "URL ảnh" },
            alt: { type: "text", label: "Alt text" },
            badge: { type: "text", label: "Nhãn (vd: Mới nhất)" },
            date: { type: "text", label: "Ngày" },
            title: { type: "text", label: "Tiêu đề bài viết" },
            desc: { type: "textarea", label: "Mô tả" },
            href: { type: "text", label: "Đường dẫn" },
            large: { type: "radio", label: "Card lớn", options: [{ label: "Có", value: true }, { label: "Không", value: false }] },
          },
          getItemSummary: (item) => item.title,
        },
        background: backgroundField,
        titleAlign: alignmentField,
        cardStyle: cardStyleField,
        spacing: spacingField,
      },
      defaultProps: {
        title: "TIN TỨC & SỰ KIỆN",
        viewMoreLabel: "Xem thêm",
        background: {
          type: "gradient",
          gradientFrom: "#f5e0f8",
          gradientVia: "#f8eeff",
          gradientTo: "#f2f4ff",
          gradientDirection: "to bottom",
        },
        titleAlign: "left",
        spacing: { paddingY: 25 },
        cardStyle: {
          borderRadius: "20px",
          textColor: "#0B5077",
          fontSize: "17px",
        },
        cards: [
          {
            imageUrl: "https://webdemo.hexagon.xyz/medias/Frame 1000002842.png",
            alt: "Hội thảo kết nối doanh nghiệp",
            badge: "Mới nhất",
            date: "20/03/2026",
            title: "Hội thảo kết nối doanh nghiệp chia sẻ xu hướng phát triển",
            desc: "Sự kiện quy tụ nhiều chuyên gia và doanh nhân, cùng thảo luận về chiến lược phát triển, chuyển đổi số và cơ hội hợp tác trong thời đại mới.",
            href: "#",
            large: true,
          },
          {
            imageUrl: "https://webdemo.hexagon.xyz/medias/Frame 1000002842-1.png",
            alt: "Kết nối và chia sẻ niềm vui",
            badge: "Mới nhất",
            date: "20/03/2026",
            title: "Kết nối và chia sẻ niềm vui là cách phát triển sự hiệu quả...",
            desc: "Khi chúng ta làm việc với một trái tim mở lòng và tinh thần sẻ chia, áp lực sẽ biến thành động lực, và khó khăn sẽ trở thành trải nghiệm.",
            href: "#",
            large: true,
          },
          {
            imageUrl: "https://webdemo.hexagon.xyz/medias/Frame 1000002842-2.png",
            alt: "Lan tỏa yêu thương thiện nguyện",
            date: "10/03/2026",
            title: "Lan tỏa yêu thương thiện nguyện",
            desc: "Các thành viên đã cùng chung tay tổ chức hoạt động trao tặng...",
            href: "#",
            large: false,
          },
          {
            imageUrl: "https://webdemo.hexagon.xyz/medias/Frame 1000002842-3.png",
            alt: "Hợp tác giữa các doanh nghiệp",
            date: "23/02/2026",
            title: "Hợp tác giữa các doanh nghiệp",
            desc: "Định hướng phát triển tương lai là mở rộng quan hệ hợp tác giữa các ...",
            href: "#",
            large: false,
          },
          {
            imageUrl: "https://webdemo.hexagon.xyz/medias/Frame 1000002842-4.png",
            alt: "Đẩy mạnh chuyển đổi số",
            date: "23/02/2026",
            title: "Đẩy mạnh chuyển đổi số ...",
            desc: "Sự phát triển hệ thống chuyển đổi đồng bộ nhằm tối ưu hóa...",
            href: "#",
            large: false,
          },
        ],
      },
      render: (props) => <NewsSection {...props} />,
    },

    ValuesSection: {
      label: "Giá trị khi tham gia",
      fields: {
        title: { type: "text", label: "Tiêu đề" },
        viewMoreLabel: { type: "text", label: "Chữ xem thêm" },
        viewMoreHref: { type: "text", label: "Đường dẫn xem thêm" },
        cards: {
          type: "array",
          label: "Danh sách giá trị",
          arrayFields: {
            iconUrl: { type: "text", label: "URL icon" },
            alt: { type: "text", label: "Alt text" },
            title: { type: "text", label: "Tiêu đề" },
            desc: { type: "textarea", label: "Mô tả" },
          },
          getItemSummary: (item) => item.title,
        },
        background: { type: "textarea", label: "Nền (CSS background, nhiều lớp)" },
        titleAlign: alignmentField,
        cardStyle: cardStyleField,
      },
      defaultProps: {
        title: "GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG",
        viewMoreLabel: "Xem thêm",
        viewMoreHref: "#",
        background:
          "linear-gradient(180deg, rgba(242,244,255,0.80) 0%, transparent 35%, rgba(240,185,252,0.88) 100%), " +
          "linear-gradient(to right, rgba(200,245,255,0.95) 0%, rgba(216,229,255,0.70) 50%, rgba(247,201,252,0.20) 100%), " +
          "url('https://webdemo.hexagon.xyz/medias/bg-giatri.png') right center / cover no-repeat",
        titleAlign: "left",
        cardStyle: {
          borderRadius: "70px 15px 70px 15px",
          textColor: "#0b4c8c",
          fontSize: "15px",
        },
        cards: [
          {
            iconUrl: "https://webdemo.hexagon.xyz/medias/icon_1 1-2.png",
            alt: "Globe icon",
            title: "Kết nối chất lượng",
            desc: "Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.",
          },
          {
            iconUrl: "https://webdemo.hexagon.xyz/medias/icon_1 1-1.png",
            alt: "Chart icon",
            title: "Phát triển kiến thức",
            desc: "Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.",
          },
          {
            iconUrl: "https://webdemo.hexagon.xyz/medias/icon_1 1.png",
            alt: "Handshake icon",
            title: "Cơ hội hợp tác",
            desc: "Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.",
          },
        ],
      },
      render: (props) => <ValuesSection {...props} />,
    },

    ContactCta: {
      label: "Quan tâm & hợp tác",
      fields: {
        title: { type: "richtext", label: "Tiêu đề" },
        pills: {
          type: "array",
          label: "Thông tin liên hệ",
          arrayFields: {
            icon: { type: "text", label: "Icon (emoji)" },
            label: { type: "text", label: "Nội dung" },
            href: { type: "text", label: "Đường dẫn (mailto:/tel:)" },
          },
          getItemSummary: (item) => item.label,
        },
        registerLabel: { type: "text", label: "Chữ nút đăng ký" },
        background: { type: "textarea", label: "Nền (CSS background, nhiều lớp)" },
      },
      defaultProps: {
        title:
          "QUAN TÂM VÀ HỢP TÁC<br/>VỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG<br/>CỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM",
        pills: [
          { icon: "✉️", label: "info@dte.hunghau.vn", href: "mailto:info@dte.hunghau.vn" },
          { icon: "📞", label: "1800 1568", href: "tel:18001568" },
        ],
        registerLabel: "Đăng ký hội viên",
        background:
          "linear-gradient(180deg, rgba(240,185,252,0.95) 0%, rgba(236,182,250,0.45) 22%, rgba(228,178,248,0.20) 58%, rgba(232,180,248,1.00) 100%), " +
          "url('https://webdemo.hexagon.xyz/medias/bg-lienhe.png') center center / cover no-repeat",
      },
      render: (props) => <ContactCta {...props} />,
    },
  },

  categories: {
    "Trang chủ": {
      title: "Trang chủ",
      components: [
        "Hero",
        "SponsorBar",
        "AboutSection",
        "TeamsSection",
        "StatsSection",
        "NewsSection",
        "ValuesSection",
        "ContactCta",
      ],
    },
  },

  root: {
    render: ({ children }) => <div className="min-h-screen">{children}</div>,
  },
};

export default puckConfig;
