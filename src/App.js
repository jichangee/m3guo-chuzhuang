import { useState } from "react";
import heroList from "./lib/list";
import "./App.css";
import { Space, Input, Button, Table, Card } from "antd";

const columns = [
  {
    title: "英雄",
    key: "hero_name",
    dataIndex: "hero_name",
    width: 200,
    render: (text, record) => (
      <>
        <img className="hero-icon" src={record.hero_icon} />
        <span>{text}</span>
      </>
    ),
  },
  {
    title: "出装",
    key: "equip",
    dataIndex: "equip",
    render: (text) => <img className="equip" src={text} />,
  },
];

function App() {
  const [list, setList] = useState([]);

  const search = (q) => {
    return heroList.filter((item) => item.hero_name.indexOf(q) > -1);
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
