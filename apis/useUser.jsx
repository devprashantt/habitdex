const useUser = () => {
  const [userError, setUserError] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const getUser = () => {
    setUserLoading(true);
    setUserError(null);
    const user = getUserFromLocalStorage();
    setUserLoading(false);
    return user;
  };

  return {
    getUser,
  };
};

export default useUser;
