const useToggleState = (initialState) => {
  const [state, setState] = useState(initialState);
  const toggleState = (prev) => setState(!prev);
  return [state, toggleState];
};

export default useToggleState;
