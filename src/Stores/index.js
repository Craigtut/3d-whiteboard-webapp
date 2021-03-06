import create from 'zustand';

export const useToolBarStore = create((set) => ({
  selectedTool: 0,
  selectTool: (toolUID) => set({ selectedTool: toolUID }),
}));

export const useWhiteboardStore = create((set) => ({
  selectedObject: undefined,
  newBoardObject: undefined,
  selectObject: (objectUID) => set({ selectedObject: objectUID }),
  setNewBoardObject: (boardObject) => set({ newBoardObject: boardObject }),
}));
