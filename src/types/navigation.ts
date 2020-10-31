type ResetOption = {
  index: number;
  routes: Array<{ name: string }>;
};

export type NavigationScreenProps = {
  navigation: {
    navigate: (name: string, params?: Record<string, unknown>) => void;
    replace: (name: string) => void;
    push: (name: string) => void;
    goBack: () => void;
    reset: (resetOption: ResetOption) => void;
  };
  route: {
    params: Record<string, unknown>;
  };
};
