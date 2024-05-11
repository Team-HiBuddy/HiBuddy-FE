function usePreventLeave() {
  const listener = (event: BeforeUnloadEvent) => {
    event.preventDefault();
  };

  const enablePrevent = () => {
    window.addEventListener("beforeunload", listener);
  };

  const disablePrevent = () => {
    window.removeEventListener("beforeunload", listener);
  };

  return { enablePrevent, disablePrevent };
}

export default usePreventLeave;
