const stopWords = new Set([
  "and", "the", "with", "for", "from", "that", "this", "your", "you", "are", "our", "will", "have", "has", "years", "year", "work", "team", "job", "role", "using", "into", "their", "they", "about", "able", "must", "should",
]);

const getKeywords = (value = "") => value
  .toLowerCase()
  .replace(/[^a-z0-9+#.]/g, " ")
  .split(/\s+/)
  .filter((word) => word.length > 2 && !stopWords.has(word));

const uniqueKeywords = (value) => [...new Set(getKeywords(value))];
const getMatches = (required, available) => required.filter((keyword) => available.has(keyword));

export const calculateAtsScore = (job, applicant) => {
  const titleKeywords = uniqueKeywords(job.title);
  const requirementKeywords = uniqueKeywords((job.requirements || []).join(" "));
  const profileKeywords = new Set(uniqueKeywords([
    ...(applicant.profile?.skills || []),
    applicant.profile?.bio,
    applicant.profile?.resumeOriginalName,
  ].join(" ")));
  const titleMatches = getMatches(titleKeywords, profileKeywords);
  const requirementMatches = getMatches(requirementKeywords, profileKeywords);
  const matchedKeywords = [...new Set([...titleMatches, ...requirementMatches])];
  const missingKeywords = [...new Set([
    ...titleKeywords.filter((keyword) => !profileKeywords.has(keyword)),
    ...requirementKeywords.filter((keyword) => !profileKeywords.has(keyword)),
  ])];
  const titleScore = titleKeywords.length ? Math.round((titleMatches.length / titleKeywords.length) * 100) : 0;
  const requirementScore = requirementKeywords.length ? Math.round((requirementMatches.length / requirementKeywords.length) * 100) : 0;
  const resumeScore = applicant.profile?.resume ? 100 : 0;
  const score = Math.round(titleScore * 0.3 + requirementScore * 0.55 + resumeScore * 0.15);

  return {
    score,
    titleScore,
    requirementScore,
    resumeScore,
    hasResume: Boolean(applicant.profile?.resume),
    matchedKeywords: matchedKeywords.slice(0, 12),
    missingKeywords: missingKeywords.slice(0, 12),
  };
};
