import { Suspense } from "react";
import { PerpDataTable } from "~/components/perpDataTable/perpDataTable";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PerpDataTable />
      </Suspense>
    </div>
  );
}
