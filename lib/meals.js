import sql from "better-sqlite3";

// DB 가져오기
const db = sql("meals.db");

// 모든 meals 데이터 가져오는 함수
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // DB객체를 사용해서 sql문 실행준비 및 실행
  // run: 데이터를 주입시킬 때(ex_데이터 변경)
  // all: 데이터 불러올 때(모든 행 가져오기)
  // get: 한가지 열만 찾을 때
  return db.prepare("SELECT * FROM meals").all();
  // promise를 생성하지 않음
}
