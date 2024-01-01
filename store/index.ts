import {create} from 'zustand';

interface StoreStateTypes {
  isLoggedIn: boolean;
}

interface StoreTypes extends StoreStateTypes {
  setIsloggedIn: (isOpen: boolean) => void;
}

const getInitialState: () => StoreStateTypes = () => {
  return {
    isLoggedIn: false,
  };
};

const useStore = create<StoreTypes>(set => ({
  ...getInitialState(),

  setIsloggedIn(isOpen) {
    set(() => ({isLoggedIn: isOpen}));
  },
}));

export default useStore;
