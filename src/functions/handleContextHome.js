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
  if (!savedContext) {
    setStringInput("");
    setDebouncedStringInput("");
    setNbPerPage(12);
    setDebouncedNbPerPage(12);
    setPage(1);
  } else {
    const context = JSON.parse(savedContext);
    setStringInput(context.stringInput);
    setDebouncedStringInput(context.stringInput);
    setNbPerPage(context.nbPerPage || 12);
    setDebouncedNbPerPage(context.nbPerPage || 12);
    setPage(context.page || 1);
  }
};
