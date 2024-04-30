const axios = require("axios");
const { mainRating } = require("../models/db2.model");
const cheerio = require("cheerio");

async function codeforces(handler) {
  const handle = handler;

  try {
    // Fetch user info
    const userInfoResponse = await CodeForcesAPI.user.info({ handles: handle });
    const userInfo = await CodeForcesAPI.user.rating({ handle: handle });
    let ratingv = 0;

    if (userInfo && userInfo.rating !== undefined) {
      ratingv = userInfo.rating;
    }

    // Fetch user submissions
    const submissionsResponse = await CodeForcesAPI.user.status({
      handle: handle,
      from: 1,
      count: 2000,
    });
    const submissions = submissionsResponse.data.result;

    // Initialize counters
    let count500_1000 = 0;
    let count1000_1200 = 0;
    let count1200_1400 = 0;
    let count1400_1600 = 0;
    let count1600_1900 = 0;
    let countAbove1900 = 0;
    let cnt = 0;

    // Process submissions
    for (let submission of submissions) {
      if (submission.verdict === "OK") {
        if (submission.problem && submission.problem.rating !== undefined) {
          const rating = submission.problem.rating;
          cnt++;
          if (rating >= 500 && rating < 1000) {
            count500_1000++;
          } else if (rating >= 1000 && rating < 1200) {
            count1000_1200++;
          } else if (rating >= 1200 && rating < 1400) {
            count1200_1400++;
          } else if (rating >= 1400 && rating < 1600) {
            count1400_1600++;
          } else if (rating >= 1600 && rating < 1900) {
            count1600_1900++;
          } else if (rating >= 1900) {
            countAbove1900++;
          }
        }
      }
    }

    // Return the result
    return {
      ratingv,
      count500_1000,
      count1000_1200,
      count1200_1400,
      count1400_1600,
      count1600_1900,
      countAbove1900,
      cnt,
    };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}
// console.log(handles);
const Calculate = async (id, Name, Branch, Batch, Score, Rating) => {
  return {
    _id: id,
    Name: Name,
    Branch: Branch,
    Batch: Batch,
    Score: Score,
    Rating: Rating,
  };
};
async function codechef(handler) {
  let sum = 0;
  let rating = 0;

  try {
    const handle = handler;
    const url = `https://www.codechef.com/users/${handle}`;

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract relevant information
    rating = parseFloat($(".rating-number").text().trim()) || 0;

    const ps = $(".rating-data-section h3").text().trim();
    const nums = ps.match(/\((\d+)\)/g).map((x) => parseInt(x.slice(1, -1)));
    let i=0;
    for (let num of nums) {
      sum += num;
      i++;
      if(i==2)break;
    }
  } catch (error) {
    console.error(`Error in codechef for ${handler}: ${error.message}`);
  }

  return { sum, rating };
}

async function leetcode(handler) {
  // Define the endpoint and headers
  const url = "https://leetcode.com/graphql";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0", // Adjust the user agent as needed
  };

  // Define the queries and variables
  const username = handler;
  const data = {
    query: `
      query($username: String!) {
        userProblemsSolved: matchedUser(username: $username) {
          problemsSolvedBeatsStats {
            difficulty
            percentage
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking: userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
        }
      }
    `,
    variables: {
      username: username,
    },
  };

  // Make the POST request
  const response = await axios.post(url, JSON.stringify(data), {
    headers: headers,
  });

  // Extract necessary details
  const totalSolved =
    response.data.data.userProblemsSolved.submitStatsGlobal.acSubmissionNum.find(
      (item) => item.difficulty === "All"
    ).count;
  const easySolved =
    response.data.data.userProblemsSolved.submitStatsGlobal.acSubmissionNum.find(
      (item) => item.difficulty === "Easy"
    ).count;
  const mediumSolved =
    response.data.data.userProblemsSolved.submitStatsGlobal.acSubmissionNum.find(
      (item) => item.difficulty === "Medium"
    ).count;
  const hardSolved =
    response.data.data.userProblemsSolved.submitStatsGlobal.acSubmissionNum.find(
      (item) => item.difficulty === "Hard"
    ).count;
  const globalRating = response.data.data.userContestRanking?.rating;

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    globalRating,
  };
}

// async function codeforces(handler) {
//   const handle = handler;
//   const url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=2000`;
//   const url1 = `https://codeforces.com/api/user.info?handles=${handle}`;

//   try {
//     const [userInfoResponse, submissionsResponse] = await Promise.all([
//       axios.get(url1),
//       axios.get(url),
//     ]);

//     const userInfo = userInfoResponse.data.result[0];
//     let ratingv = 0;

//     if (userInfo && userInfo.rating !== undefined) {
//       ratingv = userInfo.rating;
//     }

//     const submissions = submissionsResponse.data.result;
//     let count500_1000 = 0;
//     let count1000_1200 = 0;
//     let count1200_1400 = 0;
//     let count1400_1600 = 0;
//     let count1600_1900 = 0;
//     let countAbove1900 = 0;
//     let cnt = 0;

//     for (let submission of submissions) {
//       if (submission.verdict === "OK") {
//         if (submission.problem && submission.problem.rating !== undefined) {
//           const rating = submission.problem.rating;
//           cnt++;
//           if (rating >= 500 && rating < 1000) {
//             count500_1000++;
//           } else if (rating >= 1000 && rating < 1200) {
//             count1000_1200++;
//           } else if (rating >= 1200 && rating < 1400) {
//             count1200_1400++;
//           } else if (rating >= 1400 && rating < 1600) {
//             count1400_1600++;
//           } else if (rating >= 1600 && rating < 1900) {
//             count1600_1900++;
//           } else if (rating >= 1900) {
//             countAbove1900++;
//           }
//         }
//       }
//     }

//     return {
//       ratingv,
//       count500_1000,
//       count1000_1200,
//       count1200_1400,
//       count1400_1600,
//       count1600_1900,
//       countAbove1900,
//       cnt,
//     };
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     throw error;
//   }
// }

async function hasSolvedOnCodeforces(profileUrl) {
  try {
    const response = await axios.get(profileUrl);
    return response.data.result.length > 0;
  } catch (error) {
    console.error(`Error checking Codeforces profile: ${error.message}`);
    return false;
  }
}
async function gfgScore(handle) {
  try {
    const url = `https://www.geeksforgeeks.org/user/${handle}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const overallCodingScore = parseInt(
      $(".scoreCard_head_card_left--score__pC6ZA").first().text().trim()
    );
    // console.log(overallCodingScore);
    return overallCodingScore;
  } catch (error) {
    console.error(
      `Error extracting overall coding score for ${handle}: ${error.message}`
    );
    return null;
  }
}
async function runCalculations(handles) {
  const calculations = await Promise.all(
    handles.map(async (handle) => {
      let score = 0;
      let rating = 0;
      let p = 0;
      const links = {
        _id: handle["_id"],
        leetcode: handle["LeetcodeLink"],
        codechef: handle["CodechefLink"],
        codeforces: handle["CodeforcesLink"],
        gfg: handle["GFGLink"],
      };
      //if _id not present add _id update
      if (
        links.codechef != null &&
        links.codechef != "NA" &&
        links.codechef.trim() != "none"
      ) {
        const handler = links.codechef.split("/")[4];

        const codechefScore = await codechef(handler);
        if (codechefScore.rating != 0 && codechefScore.rating != undefined) {
          score += (codechefScore.rating / 500) * codechefScore.sum;
          rating += parseFloat(codechefScore.rating);
          p++;
        }
        if (score === 0) {
          score += codechefScore.sum;
        }
        // console.log(score, codechefScore.rating);
      }
      if (
        links.leetcode != null &&
        links.leetcode != "NA" &&
        links.leetcode.trim() != "none"
      ) {
        const handler = links.leetcode.split("/")[3];
        const leetcodeScore = await leetcode(handler);
        if (
          leetcodeScore.globalRating != 0 &&
          leetcodeScore.globalRating != undefined
        ) {
          p++;
          rating += parseFloat(leetcodeScore.globalRating);
        }
        // console.log(leetcodeScore.totalSolved);
        score +=
          leetcodeScore.easySolved * 1 +
          leetcodeScore.mediumSolved * 4 +
          leetcodeScore.hardSolved * 7;
      }
      // if (
      //   links.codeforces != null &&
      //   links.codeforces != "NA" &&
      //   links.codeforces.trim() != "none" &&
      //   links.codeforces != undefined &&
      //   links.codeforces.match(
      //     /^https?:\/\/(www\.)?codeforces\.com\/profile\/[a-zA-Z0-9_-]+$/
      //   )
      // ) {
      //   const handler = links.codeforces.split("/")[4];

      //   // Check if the user has solved at least one problem
      //   // const codeforcesProfileUrl = `https://codeforces.com/api/user.status?handle=${handler}&from=1&count=1`;
      //   // const hasSolved = await hasSolvedOnCodeforces(codeforcesProfileUrl);

      //   // if (hasSolved && handler!='priyanshu_52') {
      //   const codechefScore = await codeforces(handler);
      //   if (codechefScore.ratingv != 0 && codechefScore.ratingv != undefined) {
      //     p++;
      //     rating += parseFloat(codechefScore.ratingv);
      //   }
      //   // console.log(codechefScore.cnt);
      //   score += codechefScore.count500_1000*2 + codechefScore.count1000_1200*4 + codechefScore.count1200_1400*5 + codechefScore.count1400_1600*9 + codechefScore.count1600_1900*13 + codechefScore.countAbove1900*15;
      //   // console.log(score);
      //   // } else {
      //   //   // console.log(`User ${handler} has not solved any problems on Codeforces`);
      //   // }
      // }
      if (
        links.gfg != null &&
        links.gfg != "NA" &&
        links.gfg.trim() != "none" &&
        links.gfg != undefined
      ) {
        const handler = links.gfg.split("/")[4];
        const gs = await gfgScore(handler);
        score += parseInt(gs) / 1.3;
      }
      // if (p != 0) console.log(rating);
      const calculationResult = Calculate(
        handle["_id"],
        handle["Name"],
        handle.Branch,
        handle.Batch,
        score,
        rating
      );
      console.log(
        `Calculation Result for ${handle["Name"]}:`,
        calculationResult
      );

      return calculationResult;
    })
  );
  // console.log("All calculations:", calculations);

  return calculations;
}
// runCalculations();
module.exports = runCalculations;
