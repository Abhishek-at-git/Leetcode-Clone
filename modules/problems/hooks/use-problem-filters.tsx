import { useMemo, useState } from "react";

type ProblemItem = {
  title?: string;
  difficulty?: string;
  tags?: string[];
};

export function useProblemFilters(problems: ProblemItem[] = []) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    problems.forEach((problem) => {
      problem.tags?.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const title = problem.title ?? "";
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty =
        difficulty === "ALL" ? true : problem.difficulty === difficulty;
      const matchesTag =
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag) ?? false;

      return matchesSearch && matchesDifficulty && matchesTag;
    });
  }, [problems, search, difficulty, selectedTag]);

  return {
    search,
    difficulty,
    selectedTag,
    allTags,
    setSearch,
    setDifficulty,
    setSelectedTag,
    filteredProblems,
  };
}
