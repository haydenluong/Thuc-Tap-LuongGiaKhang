import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Puck, Render, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

import { puckConfig } from "./puck.config";

type PageKey = "home" | "gioi-thieu" | "hoi-vien";

// Mỗi page có key localStorage riêng — sửa trang này không ảnh hưởng trang khác.
const storageKeys: Record<PageKey, string> = {
  home: "puck-data",
  "gioi-thieu": "puck-data-gioi-thieu",
  "hoi-vien": "puck-data-hoi-vien",
};

const homeInitialData: Data = {
  content: [
    {
      type: "Hero",
      props: {
        ...puckConfig.components.Hero.defaultProps,
        id: "Hero-1",
      },
    },
    {
      type: "SponsorBar",
      props: {
        ...puckConfig.components.SponsorBar.defaultProps,
        id: "SponsorBar-1",
      },
    },
    {
      type: "AboutSection",
      props: {
        ...puckConfig.components.AboutSection.defaultProps,
        id: "AboutSection-1",
      },
    },
    {
      type: "TeamsSection",
      props: {
        ...puckConfig.components.TeamsSection.defaultProps,
        id: "TeamsSection-1",
      },
    },
    {
      type: "StatsSection",
      props: {
        ...puckConfig.components.StatsSection.defaultProps,
        id: "StatsSection-1",
      },
    },
    {
      type: "NewsSection",
      props: {
        ...puckConfig.components.NewsSection.defaultProps,
        id: "NewsSection-1",
      },
    },
    {
      type: "ValuesSection",
      props: {
        ...puckConfig.components.ValuesSection.defaultProps,
        id: "ValuesSection-1",
      },
    },
    {
      type: "ContactCta",
      props: {
        ...puckConfig.components.ContactCta.defaultProps,
        id: "ContactCta-1",
      },
    },
  ],
  root: {},
};

const gioiThieuInitialData: Data = {
  content: [
    {
      type: "IntroSection",
      props: {
        ...puckConfig.components.IntroSection.defaultProps,
        id: "IntroSection-1",
      },
    },
  ],
  root: {},
};

const hoiVienInitialData: Data = {
  content: [
    {
      type: "MemberSection",
      props: {
        ...puckConfig.components.MemberSection.defaultProps,
        id: "MemberSection-1",
      },
    },
  ],
  root: {},
};

const initialDataByPage: Record<PageKey, Data> = {
  home: homeInitialData,
  "gioi-thieu": gioiThieuInitialData,
  "hoi-vien": hoiVienInitialData,
};

function loadData(page: PageKey): Data {
  const saved = localStorage.getItem(storageKeys[page]);
  const data: Data = saved ? JSON.parse(saved) : initialDataByPage[page];

  // root.props có thể thiếu field mới (vd: header/footer) — cả với data mặc định
  // (root: {} chưa từng có props) và data cũ lưu trước khi field đó tồn tại.
  // Merge với defaultProps mới nhất để root.render không bao giờ nhận props undefined.
  return {
    ...data,
    root: { ...data.root, props: { ...puckConfig.root?.defaultProps, ...data.root?.props } },
  };
}

function PuckPage({ page, editing }: { page: PageKey; editing: boolean }) {
  const data = loadData(page);

  if (editing) {
    return (
      <Puck
        config={puckConfig}
        data={data}
        onPublish={(d) => {
          localStorage.setItem(storageKeys[page], JSON.stringify(d));
          alert("Saved!");
        }}
      />
    );
  }

  return <Render config={puckConfig} data={data} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PuckPage page="home" editing={false} />} />
        <Route path="/editor" element={<PuckPage page="home" editing={true} />} />
        <Route path="/gioi-thieu" element={<PuckPage page="gioi-thieu" editing={false} />} />
        <Route path="/gioi-thieu/editor" element={<PuckPage page="gioi-thieu" editing={true} />} />
        <Route path="/hoi-vien" element={<PuckPage page="hoi-vien" editing={false} />} />
        <Route path="/hoi-vien/editor" element={<PuckPage page="hoi-vien" editing={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;