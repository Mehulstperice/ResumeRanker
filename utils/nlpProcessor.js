export const extractKeywordsAndScore = (jobDesc, resumeText) => {
  const jdWords = jobDesc.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  const resumeWords = resumeText.toLowerCase().split(/\W+/);

  const jdSet = new Set(jdWords);
  const resumeSet = new Set(resumeWords);

  let matched = 0;
  let missing = [];

  jdSet.forEach(word => {
    if (resumeSet.has(word)) matched++;
    else missing.push(word);
  });

  const score = Math.round((matched / jdSet.size) * 100);
  return { score, missing };
};