const { Client } = require("@notionhq/client");
require("dotenv").config();

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

const getData = async (req, res) => {
  const query = {
    path: `databases/${database_id}/query`,
    method: "POST",
  };

  const { results } = await notion.request(query);

  const data = results.map((page) => {
    return {
      data: page,
      id: page.id,
      name: page.properties.店名.title[0].text.content,
      email: page.properties.メール.email,
      plan: page.properties.推奨プラン.select.name,
      status: page.properties.ステータス.select.name,
    };
  });

  return data;
};

module.exports = { getData };
