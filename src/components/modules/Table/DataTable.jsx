import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../ui/table";

const DataTable = ({ allSamples, itemKeys, onEditValue }) => {
  return (
    <Table className="w-full my-4 whitespace-nowrap">
      <TableHeader className="bg-gray-200">
        <TableRow className="hover:bg-transparent">
          {/* First column: Sample ID */}
          <TableHead>Sample ID</TableHead>
          {/* Additional columns for each itemKey */}
          {itemKeys.map((key) => (
            <TableHead key={key}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {Object.entries(allSamples).map(([sampleId, sampleData]) => (
          <TableRow key={sampleId}>
            {/* First cell: the sample ID */}
            <TableCell className="font-semibold">{sampleId}</TableCell>

            {/* For each itemKey, display/edit its "_value" fields */}
            {itemKeys.map((key) => {
              const itemData = sampleData[key];
              if (!itemData || typeof itemData !== "object") {
                // If there's no data for this itemKey, show a placeholder
                return (
                  <TableCell key={key} className="text-muted-foreground">
                    —
                  </TableCell>
                );
              }

              // Find all properties ending in "_value"
              const docValues = Object.entries(itemData).filter(([k]) =>
                k.endsWith("_value")
              );

              // If there are multiple docValues, we display them all
              return (
                <TableCell key={key}>
                  {docValues.map(([docKey, docVal]) => (
                    <div key={docKey} className="mb-2">
                      <label className="mr-2 font-bold">{docKey}:</label>
                      <input
                        type="text"
                        value={docVal}
                        onChange={(e) =>
                          onEditValue(sampleId, key, docKey, e.target.value)
                        }
                        className="border p-1 text-sm"
                      />
                    </div>
                  ))}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
