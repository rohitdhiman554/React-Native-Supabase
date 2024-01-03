import {create} from 'zustand';

interface StoreStateTypes {
  isLoggedIn: boolean;
}

interface StoreTypes extends StoreStateTypes {
  setIsLoggedIn: (isOpen: boolean) => void;
}

const getInitialState: () => StoreStateTypes = () => {
  return {
    isLoggedIn: false,
  };
};

const useStore = create<StoreTypes>(set => ({
  ...getInitialState(),

  setIsLoggedIn(isOpen) {
    set(() => ({isLoggedIn: isOpen}));
  },
}));

export default useStore;
