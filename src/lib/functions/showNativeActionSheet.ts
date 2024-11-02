import { ActionSheet, ShowActionsOptions } from "@capacitor/action-sheet";

// TODO: implement dismissing on background click

// https://capacitorjs.com/docs/apis/action-sheet
export const showNativeActionSheet = async ({
  title,
  message,
  options,
}: {
  title: string;
  message: string;
  options: ShowActionsOptions;
}) => {
  return await ActionSheet.showActions({
    title: title,
    message: message,
    options: options.options,
  });
};
