import { useState } from "react";
import heroList from "./lib/list";
import "./App.css";
import { Space, Input, Table, Card } from "antd";

const columns = [
  {
    title: "英雄",
    key: "hero_name",
    dataIndex: "hero_name",
    width: 200,
    render: (text, record) => (
      <>
        <img alt={text} className="hero-icon" src={record.hero_icon} />
      </>
    ),
  },
  {
    title: "出装",
    key: "equip",
    dataIndex: "equip",
    render: (text, row) => <img className="equip" src={text} onError={e => e.currentTarget.src = row.equipBack} />,
  },
];

function App() {
  const [list, setList] = useState([]);

  const search = (heroName) => {
    const heroItem = heroList.find((item) => item.hero_name.indexOf(heroName) > -1);
    return [
      {
        key: "1",
        hero_name: heroName,
        hero_icon: heroItem && heroItem.hero_icon,
        equip: `https://raw.githubusercontent.com/jichangee/gallery/master/m3guo/${heroName}.png`,
        equipBack: heroItem && heroItem.equip
      },
    ]
  };

  const handleSearch = (keyword) => {
    if (!keyword) {
      setList([])
      return
    }
    const searchList = search(keyword);
    setList(searchList);
  };
  return (
    <div className="App">
      <Space direction="vertical" className="main">
        <Card>
          <Space>
            <Input.Search
              allowClear
              placeholder="输入英雄名"
              onSearch={handleSearch}
            />
          </Space>
        </Card>
        <Card>
          <Table pagination={{
            pageSize: 5
          }} columns={columns} dataSource={list} />
        </Card>
      </Space>
    </div>
  );
}

export default App;
