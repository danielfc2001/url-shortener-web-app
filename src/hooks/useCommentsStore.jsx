import { create } from "zustand";

const useCommentStorage = create((set) => ({
  comments: [],
  setAllComments: (latestComments) => set(() => ({ comments: latestComments })),
  createNewComment: (comment) =>
    set((state) => ({
      comments: [comment, ...state.comments.filter((el, index) => index != 9)],
    })),
}));

export default useCommentStorage;
