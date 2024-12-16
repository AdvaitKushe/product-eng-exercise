import { GroupsDataTable } from "./components/GroupsDataTable";
import { useGroupsQuery } from "./hooks";

type Props = {
  filters?: unknown;
};

export function Groups({ filters }: Props) {
  console.log(filters);
  const dataReq = useGroupsQuery({
    _: "Update this object to pass data to the /groups endpoint.",
    filters: [],
  });

  if (dataReq.isLoading || !dataReq.data) {
    console.log(dataReq);
    return <div>Loading...</div>;
  }

  return <GroupsDataTable data={dataReq.data!.data} />;
}
