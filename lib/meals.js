import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

// DB 가져오기
const db = sql("meals.db");

// 모든 meals 데이터 가져오는 함수
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // DB객체를 사용해서 sql문 실행준비 및 실행
  // run: 데이터를 주입시킬 때(ex_데이터 변경)
  // all: 데이터 불러올 때(모든 행 가져오기)
  // get: 한가지 열만 찾을 때
  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
  // promise를 생성하지 않음
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }

    meal.image = `/images/${fileName}`;

    db.prepare(
      `
      INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug)
      `
    ).run(meal);
  });
}
