const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getData = async () => {
  const {results} = await notion.databases.query({
    database_id: process.env.SALES_DATABASE_ID,
    filter: {
      property: '状況',
      select: {
        equals: "新規見込み客",
      },
    },
  });

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

const getTemp = async (plan) => {
  const results = await notion.databases.query({
    database_id: process.env.TEMPLATE_DATABASE_ID,
    filter: {
      property: '推奨プラン',
      select: {
        equals: plan,
      },
    },
  });

  let text = "";

  for (i = 0; i < results.results[0].properties.内容.rich_text.length; i++) {
    text += results.results[0].properties.内容.rich_text[i].text.content;
  }

  const template = {
    title: results.results[0].properties.題名.title[0].plain_text,
    text: text
  }

  return template
};

const updatePage = async (page_id, select) => {
  notion.pages.update({
      page_id: page_id,
      properties: {
          "状況": {
              select: {
                  name: select
              },
          },
      },
  });
};

const updateStage = async (page_id, select) => {
  notion.pages.update({
      page_id: page_id,
      properties: {
          "ステージ": {
              select: {
                  name: select
              },
          },
      },
  });
};

const updateDate = async (page_id, date) => {
  await notion.pages.update({
      page_id: page_id,
      properties: {
          "公開日": {
              "date": {
                  "start": date
              },
          }
      },
  });
};

module.exports = { getData, getTemp, updatePage };
