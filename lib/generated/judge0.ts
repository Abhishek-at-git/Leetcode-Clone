import axios from "axios";

export function getJudge0languageId(language: string) {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
  };

  return languageMap[language.toUpperCase() as keyof typeof languageMap];
}

export function getLanguageName(languageId:number) {
    const LANGUAGE_NAMES = {
      74: "TypeScript",
      63: "JavaScript",
      71: "Python",
      62: "Java",
    };
    return LANGUAGE_NAMES[languageId as keyof typeof LANGUAGE_NAMES] || "Unknown";
  }

export async function submitBatch(submissions: any) {


const options = {
  method: 'POST',
  url: 'https://judge0-extra-ce1.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': 'b7cb09a714msh70c825e69d19a36p1ed10cjsn4a1fb218bc6e',
    'x-rapidapi-host': 'judge0-extra-ce1.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
    data: {
      submissions: submissions,
    },
  };

  const { data } = await axios.request(options);

  return data;
}

export async function pollBatchResults(tokens: string[]) {
  await sleep(1500); // Prevent hitting 1 req/sec limit immediately after submitBatch
  while (true) {
    const options = {
      method: 'GET',
      url: 'https://judge0-extra-ce1.p.rapidapi.com/submissions/batch',
  params: {
    tokens: tokens.join(","),
    fields: '*',
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': 'b7cb09a714msh70c825e69d19a36p1ed10cjsn4a1fb218bc6e',
    'x-rapidapi-host': 'judge0-extra-ce1.p.rapidapi.com'
  }
};
  

    const { data } = await axios.request(options);

    const results = data.submissions;

    const isAllDone = results.every(
        (r:any)=>r.status.id !==1 && r.status.id !==2
    );

    if(isAllDone) return results;

    await sleep(1000)
  }

}

export const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
