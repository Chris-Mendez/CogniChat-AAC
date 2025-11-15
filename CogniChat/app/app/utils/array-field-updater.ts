export function createArrayFieldUpdater<T, K extends keyof T>(
  setter: React.Dispatch<React.SetStateAction<T>>,
  key: K
) {
  return (updater: React.SetStateAction<T[K]>) => {
    setter((prev) => ({
      ...prev,
      [key]:
        typeof updater === "function" ? (updater as any)(prev[key]) : updater,
    }));
  };
}
