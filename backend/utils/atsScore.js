const stopWords = new Set([
  "and", "the", "with", "for", "from", "that", "this", "your", "you", "are", "our", "will", "have", "has", "years", "year", "work", "team", "job", "role", "using", "into", "their", "they", "about", "able", "must", "should",
]);

const getKeywords = (value = "") => value
  .toLowerCase()
  .replace(/[^a-z0-9+#.]/g, " ")
  .split(/\s+/)
  .filter((word) => word.length > 2 && !stopWords.has(word));

export const calculateAtsScore = (job, applicant) => {
  const requiredText = [job.title, job.description, ...(job.requirements || [])].join(" ");
  const requiredKeywords = [...new Set(getKeywords(requiredText))];
  const applicantText = [
    ...(applicant.profile?.skills || []),
    applicant.profile?.bio,
    applicant.profile?.resumeOriginalName,
  ].join(" ");
  const applicantKeywords = new Set(getKeywords(applicantText));
  const matchedKeywords = requiredKeywords.filter((keyword) => applicantKeywords.has(keyword));
  const missingKeywords = requiredKeywords.filter((keyword) => !applicantKeywords.has(keyword));
  const score = requiredKeywords.length
    ? Math.round((matchedKeywords.length / requiredKeywords.length) * 100)
    : 0;

  return {
    score,
    matchedKeywords: matchedKeywords.slice(0, 12),
    missingKeywords: missingKeywords.slice(0, 12),
  };
};
