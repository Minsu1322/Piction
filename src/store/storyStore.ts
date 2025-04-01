import { create } from "zustand";

type StoryStep = {
  text: string;
  choices: string[];
};

type StoryState = {
  worldSetting: string;
  storyLength: number;
  storyProgress: number;
  story: StoryStep[];
  currentStep: number;
  GenreSetting: string;
  setWorldSetting: (setting: string) => void;
  setGenreSetting: (genre: string[]) => void;
  setStoryLength: (length: number) => void;
  setStoryProgress: (progress: number) => void;
  addStoryStep: (step: StoryStep) => void;
  resetStory: () => void;
};

export const useStoryStore = create<StoryState>((set) => ({
  worldSetting: "",
  storyLength: 10,
  storyProgress: 0,
  story: [],
  currentStep: 0,
  GenreSetting: "",
  setWorldSetting: (setting) => set({ worldSetting: setting }),
  setGenreSetting: (genres) => set({ GenreSetting: genres.join(",") }),
  setStoryLength: (length) => set({ storyLength: length }),
  setStoryProgress: (progress) => set({ storyProgress: progress }),
  addStoryStep: (step) =>
    set((state) => ({
      story: [...state.story, step],
      currentStep: state.currentStep + 1,
    })),
  resetStory: () => set({ story: [], currentStep: 0, storyProgress: 0 }),
}));
