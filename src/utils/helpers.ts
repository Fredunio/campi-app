export function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export function capitalizeAllWords(str: string): string {
  return str.split(" ").map(capitalizeFirstLetter).join(" ");
}

export function isErrorInput(isError: boolean | undefined) {
  // https://ionicframework.com/docs/api/input#helper--error-text
  if (isError) {
    return "ion-invalid ion-touched";
  }
}

export function getFileExtension(filename: string) {
  return filename.split(".").pop();
}

export function fileArrayToUrlArray(fArray: File[] | undefined) {
  if (!fArray || fArray.length === 0) {
    return [];
  }

  const urls = [];

  for (let i = 0; i < fArray.length; i++) {
    urls.push(URL.createObjectURL(fArray[i]));
  }
  return urls;
}

export function fileListToUrlArray(fList: FileList | undefined | null) {
  if (!fList || fList.length === 0) {
    return [];
  }

  const urls = [];

  for (let i = 0; i < fList.length; i++) {
    urls.push(URL.createObjectURL(fList[i]));
  }
  return urls;
}
