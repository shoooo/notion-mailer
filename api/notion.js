const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

const getData = async () => {
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
      status: page.properties.状況.select.name,
    };
  });

  return data;
};

const updatePage = async (page_id) => {
  notion.pages.update({
    page_id: page_id,
    properties: {
      "状況": {
        select: {
          name: "連絡済み"
        },
      },
    },
  });
};

// const getTemplate = async () => {
//   const query = {
//     path: `databases/eb82c01ea36b41d7ba31c1a5c4553af8/query`,
//     method: "POST",
//   };

//   const { results } = await notion.request(query);

//   const data = results.map((page) => {
//     return {
//       data: page,
//       id: page.id,
//       title: page.properties.題名.rich_text[0].plain_text,
//       content: page.properties.内容.rich_text
//     };
//   });

//   return data;
// };

module.exports = { getData, updatePage };
