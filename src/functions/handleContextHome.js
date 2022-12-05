import Cookies from "js-cookie";

export const saveContextHome = async (
  stringInput,
  titleOnly,
  nbPerPage,
  page
) => {
  const context = JSON.stringify({
    stringInput: stringInput,
    titleOnly: titleOnly,
    nbPerPage: nbPerPage,
    page: page,
  });
  await Cookies.set("happyCow-ContextHome", context);
};

export const loadContextHome = async (
  setStringInput,
  setDebouncedStringInput,
  setTitleOnly,
  setNbPerPage,
  setDebouncedNbPerPage,
  setPage
) => {
  const savedContext = await Cookies.get("happyCow-ContextHome");
  if (savedContext) {
    const context = JSON.parse(savedContext);
    await setStringInput(context.stringInput);
    await setDebouncedStringInput(context.stringInput);
    await setTitleOnly(context.titleOnly || false);
    await setNbPerPage(context.nbPerPage || 12);
    await setDebouncedNbPerPage(context.nbPerPage || 12);
    await setPage(context.page || 1);
  }
};
