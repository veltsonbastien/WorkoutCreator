import { Exercise } from "@/types";

export const formatData = (records: any[]): Exercise[] => {
  return records.map((record) => {
    return {
      title: record["Title"],
      desc: (
        record["BodyPart"] +
        " " +
        record["Type"] +
        " " +
        (record["Equipment"] === "Other" ? " " : record["Equipment"]) +
        " " +
        record["Desc"]
      ).substring(0, 512), //max tokens for model
    };
  });
};
