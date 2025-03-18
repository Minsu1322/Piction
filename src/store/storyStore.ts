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
  setWorldSetting: (setting: string) => void;
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
  setWorldSetting: (setting) => set({ worldSetting: setting }),
  setStoryLength: (length) => set({ storyLength: length }),
  setStoryProgress: (progress) => set({ storyProgress: progress }),
  addStoryStep: (step) =>
    set((state) => ({
      story: [...state.story, step],
      currentStep: state.currentStep + 1,
    })),
  resetStory: () => set({ story: [], currentStep: 0, storyProgress: 0 }),
}));
