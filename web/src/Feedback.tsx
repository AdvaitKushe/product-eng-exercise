import { FeedbackDataTable } from "./components/FeedbackDataTable";
import { useFeedbackQuery } from "./hooks";

type Props = {
  filters?: {} | [string, string[]];
};

export function Feedback({ filters }: Props) {
  const dataReq = useFeedbackQuery({
    _: "Update this object to pass data to the /query endpoint.",
    filters: filters,
  });

  console.log(filters);

  if (dataReq.isLoading) {
    return <div>Loading...</div>;
  }

  return <FeedbackDataTable data={dataReq.data!.data} />;
}
