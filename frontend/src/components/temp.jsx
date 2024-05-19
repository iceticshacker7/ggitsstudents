// import axios from "axios";
// import cheerio from "cheerio";

// export default async function requestData(username) {
//   const baseUrl = "https://leetcode.com/";
//   const finalUrl = baseUrl + username;
//   const datas = [];

//   try {
//     const response = await axios.get(finalUrl);
//     const htmlText = response.data;
//     const $ = cheerio.load(htmlText);

//     $(".p-4 .gap-2 .flex-none .rounded-sd-sm").each((index, element) => {
//       const type = $(element).find(".text-xs").text().trim();
//       const num = $(element).find(".text-sd-foreground").text().trim();

//       if (type && num) {
//         const data = {
//           type: type,
//           num: num,
//         };
//         datas.push(data);
//       }
//     });

//     const scrapedData = {
//       datas: datas,
//     };

//     const EasyProblem = $(".text-label-3.dark:text-dark-label-3")
//       .eq(0)
//       .text()
//       .trim();
//     const MediumProblem = $(".text-label-3.dark:text-dark-label-3")
//       .eq(1)
//       .text()
//       .trim();
//     const HardProblem = $(".text-label-3.dark:text-dark-label-3")
//       .eq(2)
//       .text()
//       .trim();

//     const ContestRating = $(
//       ".text-label-1.dark:text-dark-label-1.flex.items-center.text-2xl"
//     )
//       .text()
//       .trim();

//     const dataSet = {
//       ContestRating: ContestRating,
//       EasyProblem: EasyProblem,
//       MediumProblem: MediumProblem,
//       HardProblem: HardProblem,
//     };

//     return dataSet;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getContestRating(username) {
//   const dataSet = await requestData(username);
//   console.log(dataSet);
// }

// getContestRating("divyanshrai7");
