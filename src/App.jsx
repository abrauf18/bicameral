import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";

// Your custom components
import SidePanel from "./components/shared/SidePanel";
import DataAnalysis from "./components/modules/Analysis/DataAnalysis";
import DataTable from "./components/modules/Table/DataTable";

// Sample data (JSON)
import results from "../results.json";

function App() {
  // 1) SELECTED SAMPLE & HOVER
  const [currentSample, setCurrentSample] = useState("3185");
  const [hoveredItem, setHoveredItem] = useState(null);

  // 2) MAIN DATA: store entire JSON in state
  const [data, setData] = useState(results);

  // 3) Derive the currently selected sample data
  //    (assuming "invoice" is our top-level test name)
  const currentSampleData = data?.invoice?.[currentSample] || {};

  // 4) Extract images for the current sample
  const sampleImages = currentSampleData.images || {};

  // 5) A function to update a given value in the data
  const handleValueChange = (sampleId, itemId, docId, newValue) => {
    setData((prev) => {
      const newData = structuredClone(prev);
      // e.g. newData.invoice["3185"]["SAMPLE:CUSTOMER_COMPANY"]["INVOICE_value"] = "New val";
      newData.invoice[sampleId][itemId][`${docId}_value`] = newValue;
      return newData;
    });
  };

  // 6) For the table, we'll want all the samples (keys) and itemKeys
  const allInvoiceSamples = data?.invoice || {};
  const allSampleIds = Object.keys(allInvoiceSamples);

  // Gather all unique itemKeys across all samples, ignoring "images"
  const allItemKeys = Array.from(
    new Set(
      allSampleIds.flatMap(sampleId =>
        Object.keys(allInvoiceSamples[sampleId])
      )
    )
  ).filter((k) => k !== "images");

  // 7) A separate function for table edits (same pattern as handleValueChange)
  const onEditValueTable = (sampleId, itemKey, docKey, newVal) => {
    setData((prev) => {
      const newData = structuredClone(prev);
      // e.g. newData.invoice["3185"]["SAMPLE:INVOICE_NUMBER"]["INVOICE_value"] = "1234";
      newData.invoice[sampleId][itemKey][docKey] = newVal;
      return newData;
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-10">Document Analyzer</h1>

      {/* Tabs for Main View vs. Data Table */}
      <Tabs defaultValue="main">
        <TabsList className="mb-4">
          <TabsTrigger value="main">Main View</TabsTrigger>
          <TabsTrigger value="table">Data Table</TabsTrigger>
        </TabsList>

        {/* MAIN VIEW TAB */}
        <TabsContent value="main">
          <div className="flex space-x-4">
            {/* LEFT: SidePanel */}
            <Card className="w-1/3">
              <CardContent>
                <SidePanel
                  // pass entire invoice object for sample switching
                  data={allInvoiceSamples}
                  currentSample={currentSample}
                  setCurrentSample={setCurrentSample}
                  // highlight bounding boxes on hover
                  onHover={setHoveredItem}
                  // update the _value fields
                  onValueChange={(itemId, docId, newVal) =>
                    handleValueChange(currentSample, itemId, docId, newVal)
                  }
                />
              </CardContent>
            </Card>

            {/* RIGHT: DataAnalysis / Document Viewer */}
            <Card className="w-2/3">
              <CardContent>
                <DataAnalysis
                  images={sampleImages}
                  items={currentSampleData}
                  highlightedItemId={hoveredItem}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DATA TABLE TAB */}
        <TabsContent value="table">
          <Card>
            <CardContent>
              <DataTable
                allSamples={allInvoiceSamples}
                itemKeys={allItemKeys}
                onEditValue={onEditValueTable}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;