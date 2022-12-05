import Cookies from "js-cookie";

export const saveContextHome = async (stringInput, nbPerPage, page) => {
  const context = JSON.stringify({
    stringInput: stringInput,
    nbPerPage: nbPerPage,
    page: page,
  });
  await Cookies.set("happyCow-ContextHome", context);
};

export const loadContextHome = async (
  setStringInput,
  setDebouncedStringInput,
  setNbPerPage,
  setDebouncedNbPerPage,
  setPage
) => {
  const savedContext = await Cookies.get("happyCow-ContextHome");
  if (savedContext) {
    const context = JSON.parse(savedContext);
    await setStringInput(context.stringInput);
    await setDebouncedStringInput(context.stringInput);
    await setNbPerPage(context.nbPerPage || 12);
    await setDebouncedNbPerPage(context.nbPerPage || 12);
    await setPage(context.page || 1);
  }
};
